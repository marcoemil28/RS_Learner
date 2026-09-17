import { isAboveSelected, LEVEL_LABELS, type LevelFilter, type QualificationLevel } from '../app/levels';
import { useLevel } from '../app/LevelContext';

/** Zeigt "ab <Stufe>", wenn `minLevel` über der aktuell gewählten Qualifikationsstufe liegt, sonst nichts. */
export function LevelBadge({ minLevel }: { minLevel: QualificationLevel }) {
  const { level } = useLevel();
  if (!isAboveSelected(minLevel, level)) return null;
  return <span className="level-badge">ab {LEVEL_LABELS[minLevel]}</span>;
}

/** CSS-Klasse für Listeneinträge, die über der aktuell gewählten Stufe liegen (Abblendung, nicht Verstecken). */
export function aboveLevelClass(minLevel: QualificationLevel, level: LevelFilter): string {
  return isAboveSelected(minLevel, level) ? 'above-level' : '';
}
