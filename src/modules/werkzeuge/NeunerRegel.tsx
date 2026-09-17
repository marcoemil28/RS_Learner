import { useState } from 'react';

type AgeMode = 'erwachsen' | 'kind';

const REGIONS: Record<AgeMode, { key: string; label: string; percent: number }[]> = {
  erwachsen: [
    { key: 'kopf', label: 'Kopf/Hals', percent: 9 },
    { key: 'armLinks', label: 'Arm links (ganz)', percent: 9 },
    { key: 'armRechts', label: 'Arm rechts (ganz)', percent: 9 },
    { key: 'rumpfVorne', label: 'Rumpf vorne', percent: 18 },
    { key: 'rumpfHinten', label: 'Rumpf hinten', percent: 18 },
    { key: 'beinLinks', label: 'Bein links (ganz)', percent: 18 },
    { key: 'beinRechts', label: 'Bein rechts (ganz)', percent: 18 },
    { key: 'genital', label: 'Genitalregion', percent: 1 },
  ],
  kind: [
    { key: 'kopf', label: 'Kopf/Hals (bei Kindern anteilig größer)', percent: 18 },
    { key: 'armLinks', label: 'Arm links (ganz)', percent: 9 },
    { key: 'armRechts', label: 'Arm rechts (ganz)', percent: 9 },
    { key: 'rumpfVorne', label: 'Rumpf vorne', percent: 18 },
    { key: 'rumpfHinten', label: 'Rumpf hinten', percent: 18 },
    { key: 'beinLinks', label: 'Bein links (ganz, bei Kindern anteilig kleiner)', percent: 14 },
    { key: 'beinRechts', label: 'Bein rechts (ganz, bei Kindern anteilig kleiner)', percent: 14 },
  ],
};

export function NeunerRegel() {
  const [mode, setMode] = useState<AgeMode>('erwachsen');
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [handflaechen, setHandflaechen] = useState(0);

  const regions = REGIONS[mode];
  const regionTotal = regions.filter((r) => checked[r.key]).reduce((sum, r) => sum + r.percent, 0);
  const total = regionTotal + handflaechen;

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function switchMode(newMode: AgeMode) {
    setMode(newMode);
    setChecked({});
  }

  return (
    <div className="tool-calculator">
      <p className="tool-intro">
        Neuner-Regel (Wallace) zur groben Schätzung der verbrannten Körperoberfläche (VKOF). Bei Kindern sind die
        Anteile anders verteilt (größerer Kopf, kleinere Beine) — hier vereinfacht dargestellt. Für genaue
        pädiatrische Einschätzung gelten altersadaptierte Schemata (z. B. Lund-Browder).
      </p>

      <div className="electrode-set-switch">
        <button className={mode === 'erwachsen' ? 'active' : ''} onClick={() => switchMode('erwachsen')}>
          Erwachsene
        </button>
        <button className={mode === 'kind' ? 'active' : ''} onClick={() => switchMode('kind')}>
          Kind (vereinfacht)
        </button>
      </div>

      <div className="score-group">
        <h4>Betroffene Körperregionen (ganz)</h4>
        <div className="score-options">
          {regions.map((r) => (
            <button key={r.key} className={checked[r.key] ? 'active' : ''} onClick={() => toggle(r.key)}>
              {r.label} <strong>({r.percent} %)</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="score-group">
        <h4>Handflächenregel (für kleine/verstreute Areale)</h4>
        <p className="tool-intro">Die Handfläche inkl. Finger der/des Patient:in entspricht ca. 1 % KOF.</p>
        <div className="handflaechen-input">
          <button className="secondary" onClick={() => setHandflaechen((h) => Math.max(0, h - 1))}>
            −
          </button>
          <span>{handflaechen} Handflächen (~{handflaechen} %)</span>
          <button className="secondary" onClick={() => setHandflaechen((h) => h + 1)}>
            +
          </button>
        </div>
      </div>

      <div className="tool-result">
        <div className="tool-result-score">Geschätzte VKOF: {total} %</div>
        <button
          className="secondary"
          onClick={() => {
            setChecked({});
            setHandflaechen(0);
          }}
        >
          Zurücksetzen
        </button>
      </div>
    </div>
  );
}
