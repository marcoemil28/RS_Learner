import { useMemo, useState } from 'react';
import { searchAll } from './searchIndex';
import { useNavigation } from './NavigationContext';
import { LEVEL_LABELS } from './levels';

export function GlobalSearch({ onNavigate }: { onNavigate: (moduleId: string) => void }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const { goTo } = useNavigation();

  const results = useMemo(() => searchAll(query), [query]);

  function handleSelect(moduleId: string, itemId: string) {
    goTo({ moduleId, itemId });
    onNavigate(moduleId);
    setQuery('');
    setOpen(false);
  }

  return (
    <div className="global-search">
      <input
        type="text"
        placeholder="Alles durchsuchen…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
      />
      {open && query.trim() && (
        <div className="global-search-results">
          {results.length === 0 && <p className="global-search-empty">Keine Treffer.</p>}
          {results.map((r) => (
            <button key={r.key} className="global-search-result" onMouseDown={() => handleSelect(r.moduleId, r.itemId)}>
              <span className="global-search-icon">{r.icon}</span>
              <span className="global-search-text">
                <span className="global-search-title">{r.title}</span>
                <span className="global-search-module">
                  {r.moduleTitle} · {LEVEL_LABELS[r.minLevel]}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
