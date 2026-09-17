/**
 * Qualifikationsstufen im Sanitäts-/Rettungsdienst, als Cross-cutting-
 * Metadatum auf Inhalten (nicht als getrennte Module) — siehe
 * docs/vorgaben_und_inhalte.txt Abschnitt 5.
 *
 * Rettungshelfer (RH) und Rettungssanitäter (RS) werden hier bewusst NICHT
 * getrennt (sehr ähnlicher Kompetenzumfang) — "RS" deckt beide ab.
 *
 * Die Stufen bauen (grob) aufeinander auf: SanH < RS < NotSan. `minLevel`
 * an einem Inhalt bedeutet "ab dieser Stufe technisch/rechtlich relevant"
 * und dient nur der Sidebar-/Fahrplan-Gruppierung — Inhalte werden für
 * niedrigere Stufen nicht versteckt (Nachschlage-Charakter).
 */
export type QualificationLevel = 'SanH' | 'RS' | 'NotSan';

export const LEVELS: QualificationLevel[] = ['SanH', 'RS', 'NotSan'];

export const LEVEL_LABELS: Record<QualificationLevel, string> = {
  SanH: 'Sanitätshelfer',
  RS: 'Rettungssanitäter',
  NotSan: 'Notfallsanitäter',
};
