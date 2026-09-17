import { useEffect, useMemo, useState } from 'react';
import { TOOLS } from './data';
import { LevelBadge, aboveLevelClass } from '../../components/LevelBadge';
import { useLevel } from '../../app/LevelContext';
import { useNavigation } from '../../app/NavigationContext';

export function WerkzeugeModule() {
  const [selectedId, setSelectedId] = useState(TOOLS[0].id);
  const { level } = useLevel();
  const { pending, clearPending } = useNavigation();

  useEffect(() => {
    if (pending?.moduleId === 'werkzeuge' && TOOLS.some((t) => t.id === pending.itemId)) {
      setSelectedId(pending.itemId);
      clearPending();
    }
  }, [pending, clearPending]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof TOOLS>();
    for (const t of TOOLS) {
      const list = map.get(t.category) ?? [];
      list.push(t);
      map.set(t.category, list);
    }
    return map;
  }, []);

  const selected = TOOLS.find((t) => t.id === selectedId) ?? TOOLS[0];
  const SelectedComponent = selected.component;

  return (
    <div className="module werkzeuge-module">
      <header className="module-header">
        <h1>Werkzeuge & Scores</h1>
      </header>

      <div className="med-disclaimer">
        ℹ️ Interaktive Rechner für standardisierte Scores — allgemein gebräuchliche Skalen, keine SAA/BPR-Quelle.
        Ergebnisse sind eine Einschätzungshilfe, keine automatische Diagnose oder Handlungsanweisung.
      </div>

      <div className="med-layout">
        <aside className="med-list">
          {[...grouped.entries()].map(([cat, items]) => (
            <div key={cat} className="med-group">
              <h4>{cat}</h4>
              <ul>
                {items.map((t) => (
                  <li key={t.id}>
                    <button
                      className={`${t.id === selectedId ? 'active' : ''} ${aboveLevelClass(t.minLevel, level)}`}
                      onClick={() => setSelectedId(t.id)}
                    >
                      {t.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <div className="algo-detail">
          <div className="algo-detail-header">
            <div>
              <h2>
                {selected.title} <LevelBadge minLevel={selected.minLevel} />
              </h2>
              <p className="algo-summary">{selected.description}</p>
            </div>
          </div>
          <SelectedComponent />
        </div>
      </div>
    </div>
  );
}
