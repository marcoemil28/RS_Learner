import type { QualificationLevel } from './levels';

export interface RoadmapEntry {
  moduleId: string;
  itemId?: string;
  label: string;
}

/**
 * Kuratierter "Fahrplan" je Qualifikationsstufe — kein eigenes Modul mit
 * eigenen Inhalten, sondern reine Verlinkung in bestehende Themenmodule
 * (siehe docs/vorgaben_und_inhalte.txt Abschnitt 5, "UI-Idee"). Jede Stufe
 * listet nur, was zusätzlich zur vorherigen Stufe dazukommt.
 */
export const ROADMAP: Record<QualificationLevel, RoadmapEntry[]> = {
  SanH: [
    { moduleId: 'anatomie', itemId: 'herz-kreislauf', label: 'Herz-Kreislauf-System' },
    { moduleId: 'anatomie', itemId: 'atmungssystem', label: 'Atmungssystem' },
    { moduleId: 'anatomie', itemId: 'skelett-muskulatur', label: 'Skelett & Muskulatur' },
    { moduleId: 'anatomie', itemId: 'nervensystem', label: 'Nervensystem' },
    { moduleId: 'algorithmen', itemId: 'abcde-herangehensweise', label: 'ABCDE – Herangehensweise' },
    { moduleId: 'algorithmen', itemId: 'wasb-gcs', label: 'Beurteilung der Bewusstseinslage (WASB & GCS)' },
    { moduleId: 'algorithmen', itemId: 'reanimation-erwachsene', label: 'Reanimation Erwachsene (Basismaßnahmen)' },
    { moduleId: 'algorithmen', itemId: 'reanimation-kinder', label: 'Reanimation Kinder (Basismaßnahmen)' },
    { moduleId: 'werkzeuge', itemId: 'schmerzskala', label: 'Schmerzskala (NRS/VAS)' },
    { moduleId: 'traumatologie', itemId: 'frakturlehre', label: 'Frakturlehre' },
    { moduleId: 'traumatologie', itemId: 'wundversorgung', label: 'Wundversorgung' },
    { moduleId: 'traumatologie', itemId: 'verbandslehre', label: 'Verbandslehre (Druckverband, Dreiecktuch)' },
    { moduleId: 'traumatologie', itemId: 'verbrennungen', label: 'Verbrennungen' },
  ],
  RS: [
    { moduleId: 'ekg', itemId: 'sinus-normal', label: 'EKG-Rhythmuserkennung' },
    { moduleId: 'ekg', label: 'Elektroden legen üben' },
    { moduleId: 'algorithmen', itemId: 'abcde-instabilitaeten', label: 'ABCDE – Instabilitäten' },
    { moduleId: 'algorithmen', itemId: 'sampler', label: 'SAMPLER-Schema' },
    { moduleId: 'algorithmen', itemId: 'opqrst', label: 'OPQRST-Schema' },
    { moduleId: 'algorithmen', itemId: 'patientenanmeldung', label: 'Patientenanmeldung (ZOABCDE)' },
    { moduleId: 'algorithmen', itemId: 'sinnhaft', label: 'Übergabe (SINNHAFT)' },
    { moduleId: 'werkzeuge', itemId: 'gcs', label: 'GCS-Rechner' },
    { moduleId: 'werkzeuge', itemId: 'naca', label: 'NACA-Score' },
    { moduleId: 'werkzeuge', itemId: 'apgar', label: 'APGAR-Score' },
    { moduleId: 'werkzeuge', itemId: 'neuner-regel', label: 'Neuner-Regel' },
    { moduleId: 'traumatologie', itemId: 'wirbelsaeulentrauma', label: 'Wirbelsäulentrauma & Immobilisation' },
    { moduleId: 'traumatologie', itemId: 'thorax-abdominaltrauma', label: 'Thorax- und Abdominaltrauma' },
    { moduleId: 'traumatologie', itemId: 'polytrauma-blutstillung', label: 'Polytrauma & kritische Blutungen (Tourniquet)' },
  ],
  NotSan: [
    { moduleId: 'algorithmen', itemId: 'atemwegsmanagement', label: 'Atemwegsmanagement (erweiterte Maßnahmen)' },
    { moduleId: 'medikamente', itemId: 'epinephrin-adrenalin', label: 'Medikamente (SAA/BPR)' },
  ],
};
