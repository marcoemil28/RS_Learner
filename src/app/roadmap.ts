import type { ModuleCategory } from './registry';

export interface RoadmapEntry {
  moduleId: string;
  itemId?: string;
  label: string;
}

/**
 * Kuratierter "Fahrplan" je Themenkategorie — kein eigenes Modul mit
 * eigenen Inhalten, sondern reine Verlinkung in bestehende Themenmodule
 * (siehe docs/vorgaben_und_inhalte.txt Abschnitt 5, "UI-Idee"). Gruppierung
 * folgt denselben Kategorien wie die Sidebar (siehe `registry.ts`), nicht
 * mehr der Qualifikationsstufe.
 */
export const ROADMAP: Record<ModuleCategory, RoadmapEntry[]> = {
  Grundlagenwissen: [
    { moduleId: 'anatomie', itemId: 'herz-kreislauf', label: 'Herz-Kreislauf-System' },
    { moduleId: 'anatomie', itemId: 'atmungssystem', label: 'Atmungssystem' },
    { moduleId: 'anatomie', itemId: 'skelett-muskulatur', label: 'Skelett & Muskulatur' },
    { moduleId: 'anatomie', itemId: 'nervensystem', label: 'Nervensystem' },
  ],
  'Krankheitsbilder & Algorithmen': [
    { moduleId: 'algorithmen', itemId: 'abcde-herangehensweise', label: 'ABCDE – Herangehensweise' },
    { moduleId: 'algorithmen', itemId: 'wasb-gcs', label: 'Beurteilung der Bewusstseinslage (WASB & GCS)' },
    { moduleId: 'algorithmen', itemId: 'reanimation-erwachsene', label: 'Reanimation Erwachsene (Basismaßnahmen)' },
    { moduleId: 'algorithmen', itemId: 'reanimation-kinder', label: 'Reanimation Kinder (Basismaßnahmen)' },
    { moduleId: 'algorithmen', itemId: 'abcde-instabilitaeten', label: 'ABCDE – Instabilitäten' },
    { moduleId: 'algorithmen', itemId: 'sampler', label: 'SAMPLER-Schema' },
    { moduleId: 'algorithmen', itemId: 'opqrst', label: 'OPQRST-Schema' },
    { moduleId: 'algorithmen', itemId: 'patientenanmeldung', label: 'Patientenanmeldung (ZOABCDE)' },
    { moduleId: 'algorithmen', itemId: 'sinnhaft', label: 'Übergabe (SINNHAFT)' },
    { moduleId: 'algorithmen', itemId: 'atemwegsmanagement', label: 'Atemwegsmanagement (erweiterte Maßnahmen)' },
    { moduleId: 'traumatologie', itemId: 'frakturlehre', label: 'Frakturlehre' },
    { moduleId: 'traumatologie', itemId: 'wundversorgung', label: 'Wundversorgung' },
    { moduleId: 'traumatologie', itemId: 'verbandslehre', label: 'Verbandslehre (Druckverband, Dreiecktuch)' },
    { moduleId: 'traumatologie', itemId: 'verbrennungen', label: 'Verbrennungen' },
    { moduleId: 'traumatologie', itemId: 'wirbelsaeulentrauma', label: 'Wirbelsäulentrauma & Immobilisation' },
    { moduleId: 'traumatologie', itemId: 'thorax-abdominaltrauma', label: 'Thorax- und Abdominaltrauma' },
    { moduleId: 'traumatologie', itemId: 'polytrauma-blutstillung', label: 'Polytrauma & kritische Blutungen (Tourniquet)' },
    { moduleId: 'internistischenotfaelle', itemId: 'herzinfarkt-acs', label: 'Herzinfarkt (ACS)' },
    { moduleId: 'internistischenotfaelle', itemId: 'lungenoedem', label: 'Lungenödem' },
    { moduleId: 'internistischenotfaelle', itemId: 'schlaganfall-fast', label: 'Schlaganfall (FAST-Test)' },
    { moduleId: 'internistischenotfaelle', itemId: 'krampfanfall-epilepsie', label: 'Krampfanfall / Epilepsie' },
    { moduleId: 'internistischenotfaelle', itemId: 'diabetische-notfaelle', label: 'Diabetische Notfälle' },
    { moduleId: 'internistischenotfaelle', itemId: 'anaphylaxie', label: 'Allergie / Anaphylaxie' },
    { moduleId: 'internistischenotfaelle', itemId: 'akutes-abdomen', label: 'Akutes Abdomen' },
    { moduleId: 'internistischenotfaelle', itemId: 'intoxikationen', label: 'Intoxikationen' },
    { moduleId: 'internistischenotfaelle', itemId: 'hitzenotfaelle', label: 'Hitzenotfälle' },
    { moduleId: 'internistischenotfaelle', itemId: 'unterkuehlung-erfrierung', label: 'Unterkühlung & Erfrierung' },
    { moduleId: 'paediatrie', itemId: 'kindernotfaelle-besonderheiten', label: 'Besonderheiten pädiatrischer Notfälle' },
    { moduleId: 'paediatrie', itemId: 'normale-geburt', label: 'Normale Geburt' },
    { moduleId: 'paediatrie', itemId: 'notgeburt-ablauf', label: 'Notgeburt — Ablauf für den Sanitätsdienst' },
    { moduleId: 'paediatrie', itemId: 'neugeborenen-erstversorgung-apgar', label: 'Erstversorgung Neugeborenes & APGAR-Score' },
  ],
  Medikamente: [
    { moduleId: 'medikamentenvorbereitung', label: 'Medikamente vorbereiten & sicher verabreichen' },
    { moduleId: 'medikamente', itemId: 'epinephrin-adrenalin', label: 'Medikamente (SAA/BPR)' },
  ],
  'Diagnostik & Training': [
    { moduleId: 'ekg', itemId: 'sinus-normal', label: 'EKG-Rhythmuserkennung' },
    { moduleId: 'ekg', label: 'Elektroden legen üben' },
    { moduleId: 'werkzeuge', itemId: 'schmerzskala', label: 'Schmerzskala (NRS/VAS)' },
    { moduleId: 'werkzeuge', itemId: 'gcs', label: 'GCS-Rechner' },
    { moduleId: 'werkzeuge', itemId: 'naca', label: 'NACA-Score' },
    { moduleId: 'werkzeuge', itemId: 'apgar', label: 'APGAR-Score' },
    { moduleId: 'werkzeuge', itemId: 'neuner-regel', label: 'Neuner-Regel' },
    { moduleId: 'werkzeuge', itemId: 'verduennung', label: 'Verdünnungsrechner' },
  ],
  'Einsatz & Organisation': [
    { moduleId: 'sanitaetsdienst', itemId: 'wachdienst-organisation', label: 'Sanitätswachdienst-Organisation' },
    { moduleId: 'sanitaetsdienst', itemId: 'manv-sichtung', label: 'MANV & Sichtung (Triage)' },
    { moduleId: 'sanitaetsdienst', itemId: 'funkalphabet', label: 'Funkalphabet & Funkdisziplin' },
    { moduleId: 'sanitaetsdienst', itemId: 'veranstaltungs-verletzungsmuster', label: 'Veranstaltungs-Verletzungsmuster' },
    { moduleId: 'sanitaetsdienst', itemId: 'hygiene-infektionsschutz', label: 'Hygiene & Infektionsschutz' },
  ],
};
