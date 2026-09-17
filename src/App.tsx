import { useMemo, useState } from 'react';
import { MODULES, type LearningModule } from './app/registry';
import { LevelProvider, useLevel } from './app/LevelContext';
import { NavigationProvider } from './app/NavigationContext';
import { GlobalSearch } from './app/GlobalSearch';
import { LEVELS, LEVEL_LABELS } from './app/levels';
import './App.css';

function LevelSelector() {
  const { level, setLevel } = useLevel();
  return (
    <div className="level-selector">
      <label htmlFor="level-select">Meine Qualifikation</label>
      <select id="level-select" value={level} onChange={(e) => setLevel(e.target.value as typeof level)}>
        <option value="all">Alle anzeigen</option>
        {LEVELS.map((l) => (
          <option key={l} value={l}>
            {LEVEL_LABELS[l]}
          </option>
        ))}
      </select>
    </div>
  );
}

function AppShell() {
  const [activeId, setActiveId] = useState(MODULES.find((m) => m.status === 'available')?.id ?? MODULES[0].id);
  const activeModule = MODULES.find((m) => m.id === activeId) ?? MODULES[0];
  const ActiveComponent = activeModule.component;

  const groups = useMemo(() => {
    const map = new Map<string, LearningModule[]>();
    for (const level of LEVELS) map.set(level, []);
    for (const m of MODULES) map.get(m.minLevel)!.push(m);
    return LEVELS.map((level) => ({ level, modules: map.get(level)! })).filter((g) => g.modules.length > 0);
  }, []);

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-brand">
          <span className="app-brand-icon">🚑</span>
          <span>SanWissen</span>
        </div>

        <GlobalSearch onNavigate={setActiveId} />

        <nav className="app-nav">
          {groups.map((g) => (
            <div key={g.level} className="app-nav-group">
              <h4>{LEVEL_LABELS[g.level]}</h4>
              {g.modules.map((m) => (
                <button
                  key={m.id}
                  className={`app-nav-item ${m.id === activeId ? 'active' : ''} ${
                    m.status === 'coming-soon' ? 'disabled' : ''
                  }`}
                  onClick={() => m.status === 'available' && setActiveId(m.id)}
                  disabled={m.status === 'coming-soon'}
                >
                  <span className="app-nav-icon">{m.icon}</span>
                  <span>{m.title}</span>
                  {m.status === 'coming-soon' && <span className="badge">bald</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="app-sidebar-footer">
          <LevelSelector />
          <p className="level-selector-hint">
            Module sind hier nach Einstiegsstufe sortiert. Inhalte über deiner gewählten Stufe werden innerhalb
            der Module nicht versteckt, nur markiert — praktisch zum Nachschlagen.
          </p>
        </div>
      </aside>

      <main className="app-content">
        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <div className="coming-soon">Dieses Modul ist noch nicht verfügbar.</div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <LevelProvider>
      <NavigationProvider>
        <AppShell />
      </NavigationProvider>
    </LevelProvider>
  );
}

export default App;
