import { useEffect, useState } from 'react';
import { CHECKLISTEN } from './data';
import { getChecked, resetChecklist, toggleChecked } from './state';
import { useNavigation } from '../../app/NavigationContext';
import { ConfirmButton } from '../../components/ConfirmButton';

export function ChecklistenModule() {
  const [selectedId, setSelectedId] = useState(CHECKLISTEN[0].id);
  const [checked, setChecked] = useState<Set<string>>(() => getChecked(selectedId));
  const { pending, clearPending } = useNavigation();

  useEffect(() => {
    if (pending?.moduleId === 'checklisten' && pending.itemId && CHECKLISTEN.some((c) => c.id === pending.itemId)) {
      setSelectedId(pending.itemId);
      clearPending();
    }
  }, [pending, clearPending]);

  useEffect(() => {
    setChecked(getChecked(selectedId));
  }, [selectedId]);

  const selected = CHECKLISTEN.find((c) => c.id === selectedId) ?? CHECKLISTEN[0];

  function handleToggle(itemId: string) {
    setChecked(new Set(toggleChecked(selected.id, itemId)));
  }

  function handleReset() {
    setChecked(resetChecklist(selected.id));
  }

  return (
    <div className="module checklisten-module">
      <header className="module-header">
        <h1>Checklisten</h1>
      </header>

      <div className="med-disclaimer">
        ℹ️ Abhakbare Checklisten für den echten Dienst — abgeleitet aus den jeweiligen Themenmodulen, kein Ersatz
        für die ausführliche Handlungsanweisung dort. Haken werden lokal gespeichert und bleiben bis zum
        manuellen Zurücksetzen erhalten.
      </div>

      <div className="med-layout">
        <aside className="med-list">
          <ul>
            {CHECKLISTEN.map((c) => (
              <li key={c.id}>
                <button className={c.id === selectedId ? 'active' : ''} onClick={() => setSelectedId(c.id)}>
                  {c.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="algo-detail">
          <div className="algo-detail-header">
            <div>
              <h2>{selected.title}</h2>
              <p className="algo-summary">{selected.description}</p>
            </div>
            <span className="checklist-progress">
              {checked.size}/{selected.items.length} erledigt
            </span>
          </div>

          <ul className="checklist-items">
            {selected.items.map((item) => (
              <li key={item.id}>
                <label className={checked.has(item.id) ? 'checked' : ''}>
                  <input type="checkbox" checked={checked.has(item.id)} onChange={() => handleToggle(item.id)} />
                  {item.text}
                </label>
              </li>
            ))}
          </ul>

          <ConfirmButton label="Checkliste zurücksetzen" className="secondary" onConfirm={handleReset} />

          {selected.sourceNote && <p className="algo-source-note">ℹ️ {selected.sourceNote}</p>}
        </div>
      </div>
    </div>
  );
}
