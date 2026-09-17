/**
 * Qualifikationsstufen im Sanitäts-/Rettungsdienst, als Cross-cutting-
 * Metadatum auf Inhalten (nicht als getrennte Module) — siehe
 * docs/vorgaben_und_inhalte.txt Abschnitt 5.
 *
 * Die Stufen bauen (grob) aufeinander auf: SanH < RH < RS < NotSan.
 * `minLevel` an einem Inhalt bedeutet "ab dieser Stufe technisch/rechtlich
 * relevant" — er wird für niedrigere Stufen NICHT versteckt (Nachschlage-
 * Charakter bleibt erhalten), nur mit Badge markiert/abgeblendet.
 */
export type QualificationLevel = 'SanH' | 'RH' | 'RS' | 'NotSan';

export const LEVELS: QualificationLevel[] = ['SanH', 'RH', 'RS', 'NotSan'];

export const LEVEL_LABELS: Record<QualificationLevel, string> = {
  SanH: 'Sanitätshelfer',
  RH: 'Rettungshelfer',
  RS: 'Rettungssanitäter',
  NotSan: 'Notfallsanitäter',
};

export type LevelFilter = QualificationLevel | 'all';

export function levelIndex(level: QualificationLevel): number {
  return LEVELS.indexOf(level);
}

/** true, wenn ein Inhalt mit `minLevel` über der aktuell gewählten Stufe liegt (→ Badge/Abblendung). */
export function isAboveSelected(minLevel: QualificationLevel, selected: LevelFilter): boolean {
  if (selected === 'all') return false;
  return levelIndex(minLevel) > levelIndex(selected);
}
