import { useState } from 'react';

const CRITERIA: { key: string; title: string; options: { score: number; label: string }[] }[] = [
  {
    key: 'herzfrequenz',
    title: 'Herzfrequenz (Herzaktion)',
    options: [
      { score: 0, label: 'Keine' },
      { score: 1, label: '< 100/min' },
      { score: 2, label: '≥ 100/min' },
    ],
  },
  {
    key: 'atmung',
    title: 'Atmung',
    options: [
      { score: 0, label: 'Keine' },
      { score: 1, label: 'Unregelmäßig, schwach, Schnappatmung' },
      { score: 2, label: 'Regelmäßig, kräftig, Schreien' },
    ],
  },
  {
    key: 'grundtonus',
    title: 'Grundtonus (Muskeltonus)',
    options: [
      { score: 0, label: 'Schlaff' },
      { score: 1, label: 'Leichte Beugung der Extremitäten' },
      { score: 2, label: 'Aktive Bewegung' },
    ],
  },
  {
    key: 'aussehen',
    title: 'Aussehen (Hautkolorit)',
    options: [
      { score: 0, label: 'Blau oder blass' },
      { score: 1, label: 'Stamm rosig, Extremitäten blau' },
      { score: 2, label: 'Komplett rosig' },
    ],
  },
  {
    key: 'reflexe',
    title: 'Reflexe (z. B. beim Absaugen)',
    options: [
      { score: 0, label: 'Keine Reaktion' },
      { score: 1, label: 'Grimassieren' },
      { score: 2, label: 'Schreien, Husten, Niesen, Abwehr' },
    ],
  },
];

function interpretation(total: number): { label: string; className: string } {
  if (total >= 8) return { label: 'Guter Zustand', className: 'good' };
  if (total >= 4) return { label: 'Mäßig depremiert — engmaschig beobachten', className: 'warn' };
  return { label: 'Kritisch — sofortige Erstversorgung/Reanimationsbereitschaft', className: 'bad' };
}

export function ApgarCalculator() {
  const [scores, setScores] = useState<Record<string, number | null>>(
    Object.fromEntries(CRITERIA.map((c) => [c.key, null]))
  );

  const complete = CRITERIA.every((c) => scores[c.key] !== null);
  const total = CRITERIA.reduce((sum, c) => sum + (scores[c.key] ?? 0), 0);

  function setScore(key: string, score: number) {
    setScores((prev) => ({ ...prev, [key]: score }));
  }

  function reset() {
    setScores(Object.fromEntries(CRITERIA.map((c) => [c.key, null])));
  }

  return (
    <div className="tool-calculator">
      <p className="tool-intro">
        APGAR-Score zur Beurteilung von Neugeborenen — üblich zu den Zeitpunkten 1, 5 und 10 Minuten nach der Geburt
        (jeweils neu erheben).
      </p>

      {CRITERIA.map((c) => (
        <div key={c.key} className="score-group">
          <h4>{c.title}</h4>
          <div className="score-options">
            {c.options.map((o) => (
              <button
                key={o.score}
                className={scores[c.key] === o.score ? 'active' : ''}
                onClick={() => setScore(c.key, o.score)}
              >
                <strong>{o.score}</strong> {o.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="tool-result">
        {complete ? (
          <>
            <div className={`tool-result-score ${interpretation(total).className}`}>APGAR: {total} / 10</div>
            <div className="tool-result-label">{interpretation(total).label}</div>
          </>
        ) : (
          <p className="tool-result-hint">Bitte alle fünf Kategorien auswählen.</p>
        )}
        <button className="secondary" onClick={reset}>
          Zurücksetzen
        </button>
      </div>
    </div>
  );
}
