import { useMemo, useState } from 'react';
import { ALGORITHMEN } from './data';
import type { AlgorithmCategory, AlgorithmEntry } from './types';
import { LevelBadge, aboveLevelClass } from '../../components/LevelBadge';
import { useLevel } from '../../app/LevelContext';

const CATEGORY_ORDER: AlgorithmCategory[] = [
  'Herangehensweise & Einschätzung',
  'Atemweg',
  'Kommunikation & Übergabe',
  'Kreislaufstillstand',
];

function AlgorithmDetail({ entry }: { entry: AlgorithmEntry }) {
  const { level } = useLevel();
  return (
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
  );
}

export function AlgorithmenModule() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(ALGORITHMEN[0].id);
  const { level } = useLevel();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALGORITHMEN;
    return ALGORITHMEN.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.sections.some((s) => s.steps.some((step) => step.text.toLowerCase().includes(q)))
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<AlgorithmCategory, AlgorithmEntry[]>();
    for (const a of filtered) {
      const list = map.get(a.category) ?? [];
      list.push(a);
      map.set(a.category, list);
    }
    return map;
  }, [filtered]);

  const selected = ALGORITHMEN.find((a) => a.id === selectedId) ?? ALGORITHMEN[0];

  return (
    <div className="module algorithmen-module">
      <header className="module-header">
        <h1>Algorithmen</h1>
      </header>

      <div className="med-disclaimer">
        ℹ️ Diese Algorithmen fassen die <strong>Herangehensweise- und Kreislaufstillstand-Behandlungspfade</strong>{' '}
        aus den Standard-Arbeitsanweisungen und Behandlungspfaden (SAA/BPR) 2025 zusammen — ergänzt um allgemeines
        Basiswissen (z. B. Laien-Basismaßnahmen bei der Reanimation), das nicht aus dem PDF stammt (siehe
        Quellenhinweis je Eintrag). Die Stufen-Badges sind eine Orientierung, keine rechtsverbindliche
        Kompetenzzuordnung — es gilt immer deine eigene Ausbildungs-/Dienstordnung.
      </div>

      <div className="med-layout">
        <aside className="med-list">
          <input
            className="med-search"
            type="text"
            placeholder="Suchen…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {CATEGORY_ORDER.filter((c) => grouped.has(c)).map((cat) => (
            <div key={cat} className="med-group">
              <h4>{cat}</h4>
              <ul>
                {grouped.get(cat)!.map((a) => (
                  <li key={a.id}>
                    <button
                      className={`${a.id === selectedId ? 'active' : ''} ${aboveLevelClass(a.minLevel, level)}`}
                      onClick={() => setSelectedId(a.id)}
                    >
                      {a.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {filtered.length === 0 && <p className="med-no-results">Keine Treffer.</p>}
        </aside>

        <AlgorithmDetail entry={selected} />
      </div>
    </div>
  );
}
