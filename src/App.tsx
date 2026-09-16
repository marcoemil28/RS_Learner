import { useState } from 'react';
import { MODULES } from './app/registry';
import './App.css';

function App() {
  const [activeId, setActiveId] = useState(MODULES.find((m) => m.status === 'available')?.id ?? MODULES[0].id);
  const activeModule = MODULES.find((m) => m.id === activeId) ?? MODULES[0];
  const ActiveComponent = activeModule.component;

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-brand">
          <span className="app-brand-icon">🚑</span>
          <span>RS Learner</span>
        </div>
        <nav className="app-nav">
          {MODULES.map((m) => (
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
        </nav>
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

export default App;
