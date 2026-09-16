import { useMemo, useState } from 'react';
import { RHYTHMS } from './rhythms';
import { generateTrace } from './waveform';
import { EkgTrace } from './EkgTrace';
import { CATEGORY_LABELS, type RhythmCategory } from './types';

export function StudyMode() {
  const [selectedId, setSelectedId] = useState(RHYTHMS[0].id);
  const [seed, setSeed] = useState(0);

  const rhythm = RHYTHMS.find((r) => r.id === selectedId) ?? RHYTHMS[0];
  const trace = useMemo(() => generateTrace(rhythm.gen), [rhythm, seed]);

  const grouped = useMemo(() => {
    const map = new Map<RhythmCategory, typeof RHYTHMS>();
    RHYTHMS.forEach((r) => {
      const list = map.get(r.category) ?? [];
      list.push(r);
      map.set(r.category, list as typeof RHYTHMS);
    });
    return map;
  }, []);

  return (
    <div className="study-mode">
      <aside className="rhythm-list">
        {[...grouped.entries()].map(([cat, items]) => (
          <div key={cat} className="rhythm-group">
            <h4>{CATEGORY_LABELS[cat]}</h4>
            <ul>
              {items.map((r) => (
                <li key={r.id}>
                  <button
                    className={r.id === selectedId ? 'active' : ''}
                    onClick={() => setSelectedId(r.id)}
                  >
                    {r.nameDe}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      <section className="rhythm-detail">
        <div className="rhythm-detail-header">
          <div>
            <h2>{rhythm.nameDe}</h2>
            <p className="rhythm-en">{rhythm.nameEn}</p>
          </div>
          <button className="secondary" onClick={() => setSeed((s) => s + 1)}>
            Neue Kurve generieren
          </button>
        </div>

        <EkgTrace trace={trace} />

        <div className="rhythm-info">
          <div>
            <h4>Merkmale</h4>
            <ul>
              {rhythm.keyFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Klinische Relevanz / Vorgehen</h4>
            <p>{rhythm.clinicalNote}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
