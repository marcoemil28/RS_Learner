import type { RhythmGenSpec } from './types';

/**
 * Synthetischer EKG-Kurvengenerator.
 *
 * Die erzeugten Kurven sind stilisierte, parametrische Annäherungen an reale
 * EKG-Morphologien (Summe von Gauß-Kurven für P/Q/R/S/T). Sie sind gedacht,
 * um Rhythmus-Muster (Regelmäßigkeit, Frequenz, P-Wellen-Beziehung, QRS-Breite)
 * zuverlässig erkennbar zu machen — sie sind KEINE kalibrierten, klinisch
 * exakten Reproduktionen einzelner Patienten-EKGs.
 */

export interface EcgTrace {
  values: number[]; // mV
  sampleRateHz: number;
  durationMs: number;
}

interface BeatMorphology {
  hasP: boolean;
  pAmp: number;
  pWidth: number;
  pOffset: number; // ms relative to R peak (negative = before R)
  qAmp: number;
  qWidth: number;
  qOffset: number;
  rAmp: number;
  rWidth: number;
  sAmp: number;
  sWidth: number;
  sOffset: number;
  tAmp: number;
  tWidth: number;
  tOffset: number;
  stShiftMv: number; // additive plateau shift between S and T (ST-Hebung/-Senkung)
}

const NORMAL_NARROW: BeatMorphology = {
  hasP: true,
  pAmp: 0.15,
  pWidth: 18,
  pOffset: -160,
  qAmp: -0.12,
  qWidth: 8,
  qOffset: -25,
  rAmp: 1.2,
  rWidth: 9,
  sAmp: -0.28,
  sWidth: 12,
  sOffset: 28,
  tAmp: 0.32,
  tWidth: 45,
  tOffset: 195,
  stShiftMv: 0,
};

const WIDE_BIZARRE: BeatMorphology = {
  hasP: false,
  pAmp: 0,
  pWidth: 1,
  pOffset: 0,
  qAmp: -0.05,
  qWidth: 10,
  qOffset: -60,
  rAmp: 1.4,
  rWidth: 45,
  sAmp: -0.9,
  sWidth: 35,
  sOffset: 55,
  tAmp: -0.45,
  tWidth: 90,
  tOffset: 220,
  stShiftMv: 0,
};

function gaussian(t: number, amp: number, center: number, width: number): number {
  return amp * Math.exp(-((t - center) ** 2) / (2 * width * width));
}

function stPlateau(tRel: number, shiftMv: number, startMs: number, endMs: number): number {
  if (shiftMv === 0) return 0;
  const edge = 8; // ms Übergangsweichzeichnung
  const rise = 1 / (1 + Math.exp(-(tRel - startMs) / edge));
  const fall = 1 / (1 + Math.exp((tRel - endMs) / edge));
  return shiftMv * rise * fall;
}

function beatValue(tRel: number, m: BeatMorphology): number {
  let v = 0;
  if (m.hasP) v += gaussian(tRel, m.pAmp, m.pOffset, m.pWidth);
  v += gaussian(tRel, m.qAmp, m.qOffset, m.qWidth);
  v += gaussian(tRel, m.rAmp, 0, m.rWidth);
  v += gaussian(tRel, m.sAmp, m.sOffset, m.sWidth);
  v += gaussian(tRel, m.tAmp, m.tOffset, m.tWidth);
  v += stPlateau(tRel, m.stShiftMv, m.sOffset + 15, m.tOffset - 30);
  return v;
}

function qtScaleFor(cycleMs: number): number {
  return Math.min(1.3, Math.max(0.65, cycleMs / 800));
}

function scaledMorphology(base: BeatMorphology, cycleMs: number): BeatMorphology {
  const s = qtScaleFor(cycleMs);
  return {
    ...base,
    tOffset: base.tOffset * s,
    tWidth: base.tWidth * s,
  };
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function gaussianNoise(amp: number): number {
  const u1 = Math.random() || 1e-9;
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z * amp;
}

/** Rendert eine Liste von (Zeit, Morphologie)-Schlägen in ein Sample-Array. */
function renderBeats(
  beats: { tMs: number; morph: BeatMorphology }[],
  pOnlyBeats: { tMs: number; morph: BeatMorphology }[] | null,
  durationMs: number,
  sampleRateHz: number,
  baselineNoise = 0.012
): number[] {
  const dt = 1000 / sampleRateHz;
  const n = Math.floor(durationMs / dt);
  const out = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const t = i * dt;
    let nearest = beats[0];
    let bestDist = Infinity;
    for (const b of beats) {
      const d = Math.abs(t - b.tMs);
      if (d < bestDist) {
        bestDist = d;
        nearest = b;
      }
    }
    let v = nearest ? beatValue(t - nearest.tMs, nearest.morph) : 0;
    if (pOnlyBeats) {
      let nearestP = pOnlyBeats[0];
      let bestPDist = Infinity;
      for (const b of pOnlyBeats) {
        const d = Math.abs(t - b.tMs);
        if (d < bestPDist) {
          bestPDist = d;
          nearestP = b;
        }
      }
      if (nearestP) {
        v += gaussian(t - nearestP.tMs, nearestP.morph.pAmp, nearestP.morph.pOffset, nearestP.morph.pWidth);
      }
    }
    out[i] = v + gaussianNoise(baselineNoise);
  }
  return out;
}

function regularRPeaks(hr: [number, number], durationMs: number, jitterPct = 0.02): number[] {
  const peaks: number[] = [];
  let t = rand(50, 200);
  const targetHr = rand(hr[0], hr[1]);
  const baseRr = 60000 / targetHr;
  while (t < durationMs) {
    peaks.push(t);
    const rr = baseRr * (1 + rand(-jitterPct, jitterPct));
    t += rr;
  }
  return peaks;
}

function genRegularNarrow(spec: Extract<RhythmGenSpec, { kind: 'regular-narrow' }>, durationMs: number, sr: number) {
  const peaks = regularRPeaks(spec.hr, durationMs);
  let prevT: number | null = null;
  const beats = peaks.map((tMs) => {
    const cycle = prevT === null ? 800 : tMs - prevT;
    prevT = tMs;
    const morph = scaledMorphology(NORMAL_NARROW, cycle);
    if (spec.prMs) morph.pOffset = -spec.prMs;
    return { tMs, morph };
  });
  return renderBeats(beats, null, durationMs, sr);
}

function genSinusArrhythmia(spec: Extract<RhythmGenSpec, { kind: 'sinus-arrhythmia' }>, durationMs: number, sr: number) {
  const peaks: number[] = [];
  let t = rand(50, 200);
  const midHr = (spec.hr[0] + spec.hr[1]) / 2;
  const baseRr = 60000 / midHr;
  const swing = ((60000 / spec.hr[0] - 60000 / spec.hr[1]) / 2) * 0.7;
  let phase = 0;
  while (t < durationMs) {
    peaks.push(t);
    phase += 0.9;
    const rr = baseRr + Math.sin(phase) * swing;
    t += rr;
  }
  let prevT: number | null = null;
  const beats = peaks.map((tMs) => {
    const cycle = prevT === null ? baseRr : tMs - prevT;
    prevT = tMs;
    return { tMs, morph: scaledMorphology(NORMAL_NARROW, cycle) };
  });
  return renderBeats(beats, null, durationMs, sr);
}

function genIrregularNarrowNoP(spec: Extract<RhythmGenSpec, { kind: 'irregular-narrow-no-p' }>, durationMs: number, sr: number) {
  const peaks: number[] = [];
  let t = rand(50, 200);
  while (t < durationMs) {
    peaks.push(t);
    const hr = rand(spec.hr[0], spec.hr[1]);
    t += 60000 / hr;
  }
  let prevT: number | null = null;
  const beats = peaks.map((tMs) => {
    const cycle = prevT === null ? 800 : tMs - prevT;
    prevT = tMs;
    const morph = scaledMorphology(NORMAL_NARROW, cycle);
    morph.hasP = false;
    return { tMs, morph };
  });
  const base = renderBeats(beats, null, durationMs, sr, 0.008);
  // Flimmerwellen: Summe schneller, unregelmäßiger Mini-Oszillationen statt P-Welle
  const dt = 1000 / sr;
  return base.map((v, i) => {
    const t = i * dt;
    let fib = 0;
    for (let h = 0; h < 4; h++) {
      fib += Math.sin((2 * Math.PI * (7 + h * 2.3) * t) / 1000 + h) * 0.03;
    }
    return v + fib;
  });
}

function genFlutter(spec: Extract<RhythmGenSpec, { kind: 'flutter' }>, durationMs: number, sr: number) {
  const dt = 1000 / sr;
  const n = Math.floor(durationMs / dt);
  const out = new Array(n).fill(0);
  const atrialRr = 60000 / spec.atrialRate;
  const qrsPeaks: number[] = [];
  for (let t = atrialRr * spec.conduction; t < durationMs; t += atrialRr * spec.conduction) {
    qrsPeaks.push(t);
  }
  let prevT: number | null = null;
  const beats = qrsPeaks.map((tMs) => {
    const cycle = prevT === null ? atrialRr * spec.conduction : tMs - prevT;
    prevT = tMs;
    const m = { ...scaledMorphology(NORMAL_NARROW, cycle), hasP: false };
    return { tMs, morph: m };
  });
  const qrsTrace = renderBeats(beats.length ? beats : [{ tMs: -9999, morph: NORMAL_NARROW }], null, durationMs, sr, 0);
  for (let i = 0; i < n; i++) {
    const t = i * dt;
    // Sägezahn-Flatterwellen
    const phase = ((t % atrialRr) / atrialRr) * 2 * Math.PI;
    const saw = 0.18 * (Math.sin(phase) + 0.4 * Math.sin(2 * phase));
    out[i] = saw + qrsTrace[i] + gaussianNoise(0.01);
  }
  return out;
}

function genRegularWide(spec: Extract<RhythmGenSpec, { kind: 'regular-wide' }>, durationMs: number, sr: number) {
  const peaks = regularRPeaks(spec.hr, durationMs, 0.015);
  const beats = peaks.map((tMs) => ({ tMs, morph: WIDE_BIZARRE }));
  return renderBeats(beats, null, durationMs, sr, 0.01);
}

function genVentricularFlutter(spec: Extract<RhythmGenSpec, { kind: 'ventricular-flutter' }>, durationMs: number, sr: number) {
  const dt = 1000 / sr;
  const n = Math.floor(durationMs / dt);
  const out = new Array(n).fill(0);
  const f = spec.rate / 60; // Hz
  for (let i = 0; i < n; i++) {
    const t = i * dt;
    out[i] = 1.1 * Math.sin(2 * Math.PI * f * (t / 1000)) + gaussianNoise(0.03);
  }
  return out;
}

function genFibrillation(spec: Extract<RhythmGenSpec, { kind: 'fibrillation' }>, durationMs: number, sr: number) {
  const dt = 1000 / sr;
  const n = Math.floor(durationMs / dt);
  const out = new Array(n).fill(0);
  const amp = spec.coarse ? 0.55 : 0.18;
  const freqs = [3.4, 4.7, 5.9, 7.1, 8.3, 9.6].map((f) => f + rand(-0.4, 0.4));
  const phases = freqs.map(() => rand(0, Math.PI * 2));
  let drift = 0;
  for (let i = 0; i < n; i++) {
    const t = i * dt;
    let v = 0;
    freqs.forEach((f, idx) => {
      v += Math.sin(2 * Math.PI * f * (t / 1000) + phases[idx]) / freqs.length;
    });
    drift += gaussianNoise(0.02);
    drift *= 0.98;
    out[i] = v * amp + drift;
  }
  return out;
}

function genFlatline(durationMs: number, sr: number) {
  const dt = 1000 / sr;
  const n = Math.floor(durationMs / dt);
  let drift = 0;
  return new Array(n).fill(0).map(() => {
    drift += gaussianNoise(0.004);
    drift *= 0.9;
    return drift;
  });
}

function genAvBlock1(spec: Extract<RhythmGenSpec, { kind: 'av-block-1' }>, durationMs: number, sr: number) {
  const peaks = regularRPeaks(spec.hr, durationMs);
  let prevT: number | null = null;
  const beats = peaks.map((tMs) => {
    const cycle = prevT === null ? 800 : tMs - prevT;
    prevT = tMs;
    const m = scaledMorphology(NORMAL_NARROW, cycle);
    m.pOffset = -spec.prMs;
    return { tMs, morph: m };
  });
  return renderBeats(beats, null, durationMs, sr);
}

function genWenckebach(spec: Extract<RhythmGenSpec, { kind: 'av-block-2-wenckebach' }>, durationMs: number, sr: number) {
  const atrialRr = 60000 / spec.atrialRate;
  const pPeaks: number[] = [];
  for (let t = rand(50, 150); t < durationMs; t += atrialRr) pPeaks.push(t);

  const qrsBeats: { tMs: number; morph: BeatMorphology }[] = [];
  const pOnlyBeats: { tMs: number; morph: BeatMorphology }[] = [];
  let groupIdx = 0;
  pPeaks.forEach((pT) => {
    const isDropped = groupIdx === spec.groupSize - 1;
    const pr = spec.prStartMs + groupIdx * spec.prIncrementMs;
    if (isDropped) {
      pOnlyBeats.push({ tMs: pT, morph: { ...NORMAL_NARROW, pOffset: 0 } });
      groupIdx = 0;
    } else {
      const m = scaledMorphology(NORMAL_NARROW, atrialRr);
      m.pOffset = -pr;
      qrsBeats.push({ tMs: pT + pr, morph: m });
      pOnlyBeats.push({ tMs: pT, morph: { ...NORMAL_NARROW, pOffset: 0, pAmp: 0 } });
      groupIdx++;
    }
  });
  if (qrsBeats.length === 0) qrsBeats.push({ tMs: -9999, morph: NORMAL_NARROW });
  return renderBeats(qrsBeats, pOnlyBeats.map((b) => ({ tMs: b.tMs, morph: { ...NORMAL_NARROW, pOffset: 0 } })), durationMs, sr);
}

function genMobitzII(spec: Extract<RhythmGenSpec, { kind: 'av-block-2-mobitz2' }>, durationMs: number, sr: number) {
  const atrialRr = 60000 / spec.atrialRate;
  const pPeaks: number[] = [];
  for (let t = rand(50, 150); t < durationMs; t += atrialRr) pPeaks.push(t);
  const qrsBeats: { tMs: number; morph: BeatMorphology }[] = [];
  const pOnlyBeats: { tMs: number; morph: BeatMorphology }[] = [];
  pPeaks.forEach((pT, idx) => {
    const conducted = idx % spec.conduction === spec.conduction - 1;
    pOnlyBeats.push({ tMs: pT, morph: { ...NORMAL_NARROW, pOffset: 0 } });
    if (conducted) {
      const m = scaledMorphology(NORMAL_NARROW, atrialRr * spec.conduction);
      m.pOffset = -spec.prMs;
      qrsBeats.push({ tMs: pT + spec.prMs, morph: m });
    }
  });
  if (qrsBeats.length === 0) qrsBeats.push({ tMs: -9999, morph: NORMAL_NARROW });
  return renderBeats(qrsBeats, pOnlyBeats, durationMs, sr);
}

function genAvBlock3(spec: Extract<RhythmGenSpec, { kind: 'av-block-3' }>, durationMs: number, sr: number) {
  const atrialRr = 60000 / spec.atrialRate;
  const ventRr = 60000 / spec.ventricularRate;
  const pPeaks: number[] = [];
  for (let t = rand(50, 150); t < durationMs; t += atrialRr) pPeaks.push(t);
  const qrsPeaks: number[] = [];
  for (let t = rand(150, 350); t < durationMs; t += ventRr) qrsPeaks.push(t);
  const morph = spec.wideEscape ? WIDE_BIZARRE : NORMAL_NARROW;
  const qrsBeats = qrsPeaks.map((tMs) => ({ tMs, morph }));
  const pOnlyBeats = pPeaks.map((tMs) => ({ tMs, morph: { ...NORMAL_NARROW, pOffset: 0 } }));
  return renderBeats(qrsBeats, pOnlyBeats, durationMs, sr);
}

function genEctopicBeat(spec: Extract<RhythmGenSpec, { kind: 'ectopic-beat' }>, durationMs: number, sr: number) {
  const peaks = regularRPeaks(spec.hr, durationMs);
  let prevT: number | null = null;
  const beats: { tMs: number; morph: BeatMorphology }[] = [];
  peaks.forEach((tMs, idx) => {
    const cycle = prevT === null ? 800 : tMs - prevT;
    prevT = tMs;
    if ((idx + 1) % spec.every === 0) {
      // Vorzeitiger, bizarrer ventrikulärer Schlag + kompensatorische Pause
      beats.push({ tMs: tMs - 120, morph: WIDE_BIZARRE });
    } else {
      beats.push({ tMs, morph: scaledMorphology(NORMAL_NARROW, cycle) });
    }
  });
  return renderBeats(beats, null, durationMs, sr);
}

function genStShift(
  spec: { hr: [number, number] },
  shiftMv: number,
  durationMs: number,
  sr: number
) {
  const peaks = regularRPeaks(spec.hr, durationMs);
  let prevT: number | null = null;
  const beats = peaks.map((tMs) => {
    const cycle = prevT === null ? 800 : tMs - prevT;
    prevT = tMs;
    const m = scaledMorphology(NORMAL_NARROW, cycle);
    m.stShiftMv = shiftMv;
    return { tMs, morph: m };
  });
  return renderBeats(beats, null, durationMs, sr);
}

export function generateTrace(spec: RhythmGenSpec, durationMs = 8000, sampleRateHz = 250): EcgTrace {
  let values: number[];
  switch (spec.kind) {
    case 'regular-narrow':
      values = genRegularNarrow(spec, durationMs, sampleRateHz);
      break;
    case 'sinus-arrhythmia':
      values = genSinusArrhythmia(spec, durationMs, sampleRateHz);
      break;
    case 'irregular-narrow-no-p':
      values = genIrregularNarrowNoP(spec, durationMs, sampleRateHz);
      break;
    case 'flutter':
      values = genFlutter(spec, durationMs, sampleRateHz);
      break;
    case 'regular-wide':
      values = genRegularWide(spec, durationMs, sampleRateHz);
      break;
    case 'ventricular-flutter':
      values = genVentricularFlutter(spec, durationMs, sampleRateHz);
      break;
    case 'fibrillation':
      values = genFibrillation(spec, durationMs, sampleRateHz);
      break;
    case 'flatline':
      values = genFlatline(durationMs, sampleRateHz);
      break;
    case 'av-block-1':
      values = genAvBlock1(spec, durationMs, sampleRateHz);
      break;
    case 'av-block-2-wenckebach':
      values = genWenckebach(spec, durationMs, sampleRateHz);
      break;
    case 'av-block-2-mobitz2':
      values = genMobitzII(spec, durationMs, sampleRateHz);
      break;
    case 'av-block-3':
      values = genAvBlock3(spec, durationMs, sampleRateHz);
      break;
    case 'ectopic-beat':
      values = genEctopicBeat(spec, durationMs, sampleRateHz);
      break;
    case 'st-elevation':
      values = genStShift(spec, spec.elevationMv, durationMs, sampleRateHz);
      break;
    case 'st-depression':
      values = genStShift(spec, -spec.depressionMv, durationMs, sampleRateHz);
      break;
    default:
      values = [];
  }
  return { values, sampleRateHz, durationMs };
}
