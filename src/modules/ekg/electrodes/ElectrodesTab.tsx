import { useState } from 'react';
import { ELECTRODE_SETS } from './data';
import { ElectrodeStudy } from './ElectrodeStudy';
import { ElectrodePlacement } from './ElectrodePlacement';
import { LevelBadge } from '../../../components/LevelBadge';

type Mode = 'lernen' | 'ueben';

export function ElectrodesTab() {
  const [setId, setSetId] = useState(ELECTRODE_SETS[0].id);
  const [mode, setMode] = useState<Mode>('lernen');
  const set = ELECTRODE_SETS.find((s) => s.id === setId) ?? ELECTRODE_SETS[0];

  return (
    <div>
      <div className="electrode-set-switch">
        {ELECTRODE_SETS.map((s) => (
          <button key={s.id} className={s.id === setId ? 'active' : ''} onClick={() => setSetId(s.id)}>
            {s.title} <LevelBadge minLevel={s.minLevel} />
          </button>
        ))}
        <div className="electrode-mode-switch">
          <button className={mode === 'lernen' ? 'active' : ''} onClick={() => setMode('lernen')}>
            Lernen
          </button>
          <button className={mode === 'ueben' ? 'active' : ''} onClick={() => setMode('ueben')}>
            Üben
          </button>
        </div>
      </div>

      {mode === 'lernen' ? <ElectrodeStudy set={set} key={`study-${set.id}`} /> : <ElectrodePlacement set={set} key={`practice-${set.id}`} />}
    </div>
  );
}
