/**
 * Qualifikationsstufen im Sanitäts-/Rettungsdienst — als internes
 * Metadatum auf einzelnen Inhalten (nicht als getrennte Module), rein zur
 * Dokumentation, ab welcher Stufe ein Inhalt technisch/rechtlich relevant
 * wird. Steuert keine Anzeige/Gruppierung mehr (siehe CHANGELOG) — die
 * Sidebar/der Fahrplan gruppieren stattdessen nach Thema, siehe
 * `ModuleCategory` in `registry.tsx`.
 *
 * Rettungshelfer (RH) und Rettungssanitäter (RS) werden hier bewusst NICHT
 * getrennt (sehr ähnlicher Kompetenzumfang) — "RS" deckt beide ab.
 */
export type QualificationLevel = 'SanH' | 'RS' | 'NotSan';
