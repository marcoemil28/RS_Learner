import { useState } from 'react';

const PRESETS = [
  { label: 'Epinephrin bei instabiler Bradykardie (SAA)', c1: '1', c2: '0.01', v2: '100' },
  { label: 'Naloxon-Verdünnung (Notfallkarte Opioid-Überdosierung)', c1: '0.4', c2: '0.1', v2: '4' },
];

function parseNum(s: string): number {
  return parseFloat(s.replace(',', '.'));
}

export function VerduennungsRechner() {
  const [c1, setC1] = useState('');
  const [c2, setC2] = useState('');
  const [v2, setV2] = useState('');

  const c1n = parseNum(c1);
  const c2n = parseNum(c2);
  const v2n = parseNum(v2);

  const valid = [c1n, c2n, v2n].every((n) => !Number.isNaN(n) && n > 0);
  const possible = valid && c2n <= c1n;
  const v1 = possible ? (c2n * v2n) / c1n : null;
  const diluent = possible && v1 !== null ? v2n - v1 : null;

  function applyPreset(p: (typeof PRESETS)[number]) {
    setC1(p.c1);
    setC2(p.c2);
    setV2(p.v2);
  }

  function reset() {
    setC1('');
    setC2('');
    setV2('');
  }

  return (
    <div className="tool-calculator">
      <p className="tool-intro">
        Berechnet, wie viel Ausgangslösung und wie viel Verdünnungsmittel (z. B. NaCl 0,9 %) du brauchst, um aus
        einer bekannten Ausgangskonzentration eine vorgegebene Zielkonzentration in einem bestimmten
        Gesamtvolumen herzustellen. Ausgangs- und Zielkonzentration müssen in derselben Einheit angegeben werden
        (z. B. beide in mg/ml).
      </p>

      <div className="score-group">
        <h4>Beispiele zum Ausprobieren</h4>
        <div className="score-options">
          {PRESETS.map((p) => (
            <button key={p.label} className="secondary" onClick={() => applyPreset(p)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="dilution-inputs">
        <label>
          Ausgangskonzentration
          <input inputMode="decimal" value={c1} onChange={(e) => setC1(e.target.value)} placeholder="z. B. 1" />
        </label>
        <label>
          Zielkonzentration
          <input inputMode="decimal" value={c2} onChange={(e) => setC2(e.target.value)} placeholder="z. B. 0,01" />
        </label>
        <label>
          Zielgesamtvolumen (ml)
          <input inputMode="decimal" value={v2} onChange={(e) => setV2(e.target.value)} placeholder="z. B. 100" />
        </label>
      </div>

      <div className="tool-result">
        {!valid && <p className="tool-result-hint">Bitte alle drei Werte als Zahl größer 0 eingeben.</p>}
        {valid && !possible && (
          <p className="tool-result-score bad">
            Zielkonzentration höher als Ausgangskonzentration — so nicht durch Verdünnung erreichbar.
          </p>
        )}
        {possible && v1 !== null && diluent !== null && (
          <>
            <div className="tool-result-score good">{v1.toFixed(2)} ml Ausgangslösung</div>
            <div className="tool-result-label">
              + {diluent.toFixed(2)} ml Verdünnungsmittel (z. B. NaCl 0,9 %) = {v2n} ml gesamt
            </div>
          </>
        )}
        <button className="secondary" onClick={reset}>
          Zurücksetzen
        </button>
      </div>

      <p className="tool-cross-hint">
        Diese Rechenhilfe ersetzt nicht die Vorgabe deines Protokolls (SAA/BPR) — sie hilft nur, eine bereits
        vorgegebene Zielkonzentration korrekt anzumischen. Ergebnis immer gegenprüfen (Doppelkontrolle,
        4-Augen-Prinzip, 6-R-Regel — siehe „Medikamente vorbereiten & sicher verabreichen").
      </p>
    </div>
  );
}
