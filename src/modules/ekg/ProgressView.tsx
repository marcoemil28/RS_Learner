import { useState } from 'react';
import { RHYTHMS } from './rhythms';
import { getProgress, resetProgress } from './progress';

export function ProgressView() {
  const [progress, setProgress] = useState(getProgress());
  const quizRhythms = RHYTHMS.filter((r) => r.quizEligible);

  const rows = quizRhythms
    .map((r) => {
      const stat = progress[r.id];
      const accuracy = stat && stat.attempts > 0 ? Math.round((stat.correct / stat.attempts) * 100) : null;
      return { rhythm: r, stat, accuracy };
    })
    .sort((a, b) => (a.accuracy ?? 101) - (b.accuracy ?? 101));

  const totalAttempts = Object.values(progress).reduce((sum, s) => sum + s.attempts, 0);
  const totalCorrect = Object.values(progress).reduce((sum, s) => sum + s.correct, 0);

  function handleReset() {
    if (confirm('Gesamten EKG-Fortschritt wirklich zurücksetzen?')) {
      setProgress(resetProgress());
    }
  }

  return (
    <div className="progress-view">
      <div className="progress-summary">
        <div>
          <strong>{totalAttempts}</strong>
          <span>Versuche gesamt</span>
        </div>
        <div>
          <strong>{totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : '–'}%</strong>
          <span>Trefferquote gesamt</span>
        </div>
        <button className="secondary" onClick={handleReset}>
          Zurücksetzen
        </button>
      </div>

      <table className="progress-table">
        <thead>
          <tr>
            <th>Rhythmus</th>
            <th>Versuche</th>
            <th>Richtig</th>
            <th>Quote</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ rhythm, stat, accuracy }) => (
            <tr key={rhythm.id} className={accuracy !== null && accuracy < 60 ? 'weak' : ''}>
              <td>{rhythm.nameDe}</td>
              <td>{stat?.attempts ?? 0}</td>
              <td>{stat?.correct ?? 0}</td>
              <td>{accuracy !== null ? `${accuracy}%` : '– noch nicht geübt –'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
