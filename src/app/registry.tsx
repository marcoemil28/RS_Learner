import type { ComponentType } from 'react';
import { EkgModule } from '../modules/ekg/EkgModule';
import { MedikamenteModule } from '../modules/medikamente/MedikamenteModule';
import { AlgorithmenModule } from '../modules/algorithmen/AlgorithmenModule';
import { AnatomieModule } from '../modules/anatomie/AnatomieModule';
import { WerkzeugeModule } from '../modules/werkzeuge/WerkzeugeModule';
import { TraumatologieModule } from '../modules/traumatologie/TraumatologieModule';
import { MedikamentenvorbereitungModule } from '../modules/medikamentenvorbereitung/MedikamentenvorbereitungModule';
import { SanitaetsdienstModule } from '../modules/sanitaetsdienst/SanitaetsdienstModule';
import { InternistischeNotfaelleModule } from '../modules/internistischenotfaelle/InternistischeNotfaelleModule';
import { PaediatrieModule } from '../modules/paediatrie/PaediatrieModule';
import { PsychiatrieNotfaelleModule } from '../modules/psychiatrienotfaelle/PsychiatrieNotfaelleModule';

/**
 * Thematische Kategorien für die Sidebar-Gruppierung. Ersetzt die frühere
 * Gruppierung nach Qualifikationsstufe (SanH/RS/NotSan) — die Inhalte
 * bleiben für alle einsehbar, die Navigation richtet sich jetzt nach Thema
 * statt nach Kompetenzstufe.
 */
export type ModuleCategory =
  | 'Grundlagenwissen'
  | 'Krankheitsbilder & Algorithmen'
  | 'Medikamente'
  | 'Diagnostik & Training'
  | 'Einsatz & Organisation';

export const MODULE_CATEGORIES: ModuleCategory[] = [
  'Grundlagenwissen',
  'Krankheitsbilder & Algorithmen',
  'Medikamente',
  'Diagnostik & Training',
  'Einsatz & Organisation',
];

export interface LearningModule {
  id: string;
  title: string;
  icon: string;
  status: 'available' | 'coming-soon';
  component?: ComponentType;
  /** Thematische Kategorie für die Sidebar-Gruppierung. Wird bei `pinned: true` ignoriert. */
  category: ModuleCategory;
  /**
   * Erscheint fest oben in der Sidebar (direkt unter der Startseite) statt
   * in einer Themen-Gruppe — für Module, die kategorieübergreifend gleich
   * relevant sind (z. B. Werkzeuge & Scores).
   */
  pinned?: boolean;
}

/**
 * Zentrale Modul-Registry.
 *
 * Um ein neues Lernmodul hinzuzufügen:
 * 1. Neuen Ordner unter src/modules/<name>/ anlegen.
 * 2. Eine Hauptkomponente exportieren (siehe modules/ekg/EkgModule.tsx als Vorlage).
 * 3. Hier einen Eintrag mit status: 'available' und component hinzufügen.
 */
export const MODULES: LearningModule[] = [
  {
    id: 'ekg',
    title: 'EKG-Trainer',
    icon: '📈',
    status: 'available',
    component: EkgModule,
    category: 'Diagnostik & Training',
  },
  {
    id: 'algorithmen',
    title: 'Algorithmen (ABCDE, BLS/ALS)',
    icon: '🧭',
    status: 'available',
    component: AlgorithmenModule,
    category: 'Krankheitsbilder & Algorithmen',
  },
  {
    id: 'medikamente',
    title: 'Medikamente (SAA/BPR)',
    icon: '💊',
    status: 'available',
    component: MedikamenteModule,
    category: 'Medikamente',
  },
  {
    id: 'anatomie',
    title: 'Anatomie & Physiologie',
    icon: '🫀',
    status: 'available',
    component: AnatomieModule,
    category: 'Grundlagenwissen',
  },
  {
    id: 'werkzeuge',
    title: 'Werkzeuge & Scores',
    icon: '🧮',
    status: 'available',
    component: WerkzeugeModule,
    category: 'Diagnostik & Training',
    pinned: true,
  },
  {
    id: 'traumatologie',
    title: 'Traumatologie & Verbandslehre',
    icon: '🩹',
    status: 'available',
    component: TraumatologieModule,
    category: 'Krankheitsbilder & Algorithmen',
  },
  {
    id: 'medikamentenvorbereitung',
    title: 'Medikamente vorbereiten & verabreichen',
    icon: '💉',
    status: 'available',
    component: MedikamentenvorbereitungModule,
    category: 'Medikamente',
  },
  {
    id: 'sanitaetsdienst',
    title: 'Sanitätsdienst (Veranstaltungsdienst)',
    icon: '🎪',
    status: 'available',
    component: SanitaetsdienstModule,
    category: 'Einsatz & Organisation',
  },
  {
    id: 'internistischenotfaelle',
    title: 'Internistische Notfälle',
    icon: '🩺',
    status: 'available',
    component: InternistischeNotfaelleModule,
    category: 'Krankheitsbilder & Algorithmen',
  },
  {
    id: 'paediatrie',
    title: 'Pädiatrie & Geburtshilfe',
    icon: '🍼',
    status: 'available',
    component: PaediatrieModule,
    category: 'Krankheitsbilder & Algorithmen',
  },
  {
    id: 'psychiatrienotfaelle',
    title: 'Psychiatrische Notfälle & Kommunikation',
    icon: '🧠',
    status: 'available',
    component: PsychiatrieNotfaelleModule,
    category: 'Krankheitsbilder & Algorithmen',
  },
];
