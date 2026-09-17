import { MED_VORBEREITUNG } from './data';
import { LevelBadge, aboveLevelClass } from '../../components/LevelBadge';
import { useLevel } from '../../app/LevelContext';

export function MedikamentenvorbereitungModule() {
  const { level } = useLevel();
  const entry = MED_VORBEREITUNG[0];

  return (
    <div className="module medikamentenvorbereitung-module">
      <header className="module-header">
        <h1>Medikamente vorbereiten & sicher verabreichen</h1>
      </header>

      <div className="med-disclaimer">
        ℹ️ Die 6-R-Regel, Sicherheitsprinzipien und das Standardvorgehen bei Medikamentengabe aus den
        Standard-Arbeitsanweisungen und Behandlungspfaden (SAA/BPR) 2025 — ergänzt um die allgemeine
        Verdünnungsformel (siehe Quellenhinweis). Die Stufen-Badges sind eine Orientierung, keine
        rechtsverbindliche Kompetenzzuordnung — es gilt immer deine eigene Ausbildungs-/Dienstordnung.
      </div>

      <div className="algo-detail">
        <div className="algo-detail-header">
          <div>
            <h2>
              {entry.title} <LevelBadge minLevel={entry.minLevel} />
            </h2>
            <p className="algo-summary">{entry.summary}</p>
          </div>
          {entry.page && <span className="med-page-ref">SAA und BPR 2025, S. {entry.page}</span>}
        </div>

        {entry.sections.map((section, i) => (
          <div key={i} className="algo-section">
            {section.heading && <h4>{section.heading}</h4>}
            <ul>
              {section.steps.map((step, j) => (
                <li key={j} className={aboveLevelClass(step.minLevel ?? entry.minLevel, level)}>
                  {step.text}
                  <LevelBadge minLevel={step.minLevel ?? entry.minLevel} />
                </li>
              ))}
            </ul>
          </div>
        ))}

        {entry.notes && entry.notes.length > 0 && (
          <div className="algo-notes">
            <h4>Erläuterungen</h4>
            <ul>
              {entry.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        )}

        {entry.sourceNote && <p className="algo-source-note">ℹ️ {entry.sourceNote}</p>}
      </div>
    </div>
  );
}
