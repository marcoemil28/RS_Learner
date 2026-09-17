import { useMemo } from 'react';
import { MODULES, MODULE_CATEGORIES, type ModuleCategory } from './registry';
import { ROADMAP } from './roadmap';
import { useNavigation } from './NavigationContext';
import { getProgress } from '../modules/ekg/progress';

export function HomePage({ onNavigateModule }: { onNavigateModule: (moduleId: string) => void }) {
  const { goTo } = useNavigation();

  const ekgStats = useMemo(() => {
    const progress = getProgress();
    const stats = Object.values(progress);
    const attempts = stats.reduce((sum, s) => sum + s.attempts, 0);
    const correct = stats.reduce((sum, s) => sum + s.correct, 0);
    return { attempts, accuracy: attempts > 0 ? Math.round((correct / attempts) * 100) : null };
  }, []);

  function handleRoadmapClick(moduleId: string, itemId?: string) {
    if (itemId) goTo({ moduleId, itemId });
    onNavigateModule(moduleId);
  }

  return (
    <div className="module home-page">
      <header className="module-header">
        <h1>Willkommen bei SanWissen</h1>
      </header>

      <p className="home-intro">
        Deine lokale Lern- und Nachschlage-App für den Sanitäts- und Rettungsdienst — von Sanitätshelfer bis
        Notfallsanitäter. Durchsuche oben in der Sidebar alle Inhalte auf einmal oder folge unten dem Fahrplan.
      </p>

      {ekgStats.attempts > 0 && (
        <div className="home-progress-card">
          <div>
            <strong>{ekgStats.attempts}</strong>
            <span>EKG-Quiz-Versuche</span>
          </div>
          <div>
            <strong>{ekgStats.accuracy}%</strong>
            <span>Trefferquote</span>
          </div>
          <button className="secondary" onClick={() => onNavigateModule('ekg')}>
            Weiter üben
          </button>
        </div>
      )}

      <h2 className="home-section-title">Module</h2>
      <div className="home-module-grid">
        {MODULES.map((m) => (
          <button key={m.id} className="home-module-card" onClick={() => onNavigateModule(m.id)}>
            <span className="home-module-icon">{m.icon}</span>
            <span className="home-module-title">{m.title}</span>
          </button>
        ))}
      </div>

      <h2 className="home-section-title">Dein Fahrplan</h2>
      <p className="home-intro">
        Kein eigenes Modul, sondern eine Verlinkung in ausgewählte Abschnitte, gruppiert nach Thema.
      </p>

      {MODULE_CATEGORIES.map((category: ModuleCategory) => (
        <div key={category} className="home-roadmap-group">
          <h4>{category}</h4>
          <ul>
            {ROADMAP[category].map((entry, i) => (
              <li key={i}>
                <button onClick={() => handleRoadmapClick(entry.moduleId, entry.itemId)}>{entry.label}</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
