import { useState } from 'react';

const EYE_OPTIONS = [
  { score: 4, label: 'Spontan' },
  { score: 3, label: 'Auf Ansprache' },
  { score: 2, label: 'Auf Schmerzreiz' },
  { score: 1, label: 'Keine Reaktion' },
];

const VERBAL_OPTIONS = [
  { score: 5, label: 'Orientiert' },
  { score: 4, label: 'Verwirrt' },
  { score: 3, label: 'Unzusammenhängende Worte' },
  { score: 2, label: 'Unverständliche Laute' },
  { score: 1, label: 'Keine Reaktion' },
];

const MOTOR_OPTIONS = [
  { score: 6, label: 'Befolgt Aufforderungen' },
  { score: 5, label: 'Gezielte Schmerzabwehr' },
  { score: 4, label: 'Ungezielte Schmerzabwehr (normale Beugung)' },
  { score: 3, label: 'Abnorme Beugung (Dekortikationshaltung)' },
  { score: 2, label: 'Streckung (Dezerebrationshaltung)' },
  { score: 1, label: 'Keine Reaktion' },
];

function ScoreGroup({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: { score: number; label: string }[];
  value: number | null;
  onChange: (score: number) => void;
}) {
  return (
    <div className="score-group">
      <h4>{title}</h4>
      <div className="score-options">
        {options.map((o) => (
          <button key={o.score} className={value === o.score ? 'active' : ''} onClick={() => onChange(o.score)}>
            <strong>{o.score}</strong> {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function severity(total: number): { label: string; className: string } {
  if (total >= 13) return { label: 'Leichtes Schädel-Hirn-Trauma (SHT)', className: 'good' };
  if (total >= 9) return { label: 'Mittelschweres SHT', className: 'warn' };
  return { label: 'Schweres SHT', className: 'bad' };
}

export function GcsCalculator() {
  const [eye, setEye] = useState<number | null>(null);
  const [verbal, setVerbal] = useState<number | null>(null);
  const [motor, setMotor] = useState<number | null>(null);

  const complete = eye !== null && verbal !== null && motor !== null;
  const total = (eye ?? 0) + (verbal ?? 0) + (motor ?? 0);

  function reset() {
    setEye(null);
    setVerbal(null);
    setMotor(null);
  }

  return (
    <div className="tool-calculator">
      <p className="tool-intro">
        Glasgow Coma Scale — wähle für jede Kategorie die zutreffende Reaktion. Siehe auch Algorithmen:
        „Beurteilung der Bewusstseinslage (WASB & GCS)".
      </p>

      <ScoreGroup title="Augenöffnung (E)" options={EYE_OPTIONS} value={eye} onChange={setEye} />
      <ScoreGroup title="Verbale Reaktion (V)" options={VERBAL_OPTIONS} value={verbal} onChange={setVerbal} />
      <ScoreGroup title="Motorische Reaktion (M)" options={MOTOR_OPTIONS} value={motor} onChange={setMotor} />

      <div className="tool-result">
        {complete ? (
          <>
            <div className={`tool-result-score ${severity(total).className}`}>
              GCS: {total} / 15 ({eye}+{verbal}+{motor})
            </div>
            <div className="tool-result-label">{severity(total).label}</div>
          </>
        ) : (
          <p className="tool-result-hint">Bitte alle drei Kategorien auswählen.</p>
        )}
        <button className="secondary" onClick={reset}>
          Zurücksetzen
        </button>
      </div>
    </div>
  );
}
