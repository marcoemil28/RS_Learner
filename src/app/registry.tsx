import type { ComponentType } from 'react';
import { EkgModule } from '../modules/ekg/EkgModule';
import { MedikamenteModule } from '../modules/medikamente/MedikamenteModule';
import { AlgorithmenModule } from '../modules/algorithmen/AlgorithmenModule';
import { AnatomieModule } from '../modules/anatomie/AnatomieModule';
import { WerkzeugeModule } from '../modules/werkzeuge/WerkzeugeModule';
import { TraumatologieModule } from '../modules/traumatologie/TraumatologieModule';
import { MedikamentenvorbereitungModule } from '../modules/medikamentenvorbereitung/MedikamentenvorbereitungModule';
import type { QualificationLevel } from './levels';

export interface LearningModule {
  id: string;
  title: string;
  icon: string;
  status: 'available' | 'coming-soon';
  component?: ComponentType;
  /**
   * Ab welcher Stufe dieses Modul überhaupt relevant wird (niedrigster
   * Einstiegspunkt) — dient nur der Sidebar-Gruppierung. Enthält ein Modul
   * intern Inhalte für mehrere Stufen, zählt hier die niedrigste. Wird bei
   * `pinned: true` ignoriert.
   */
  minLevel: QualificationLevel;
  /**
   * Erscheint fest oben in der Sidebar (direkt unter der Startseite) statt
   * in einer Stufen-Gruppe — für Module, die stufenübergreifend gleich
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
  { id: 'ekg', title: 'EKG-Trainer', icon: '📈', status: 'available', component: EkgModule, minLevel: 'RS' },
  {
    id: 'algorithmen',
    title: 'Algorithmen (ABCDE, BLS/ALS)',
    icon: '🧭',
    status: 'available',
    component: AlgorithmenModule,
    minLevel: 'SanH',
  },
  {
    id: 'medikamente',
    title: 'Medikamente (SAA/BPR)',
    icon: '💊',
    status: 'available',
    component: MedikamenteModule,
    minLevel: 'NotSan',
  },
  {
    id: 'anatomie',
    title: 'Anatomie & Physiologie',
    icon: '🫀',
    status: 'available',
    component: AnatomieModule,
    minLevel: 'SanH',
  },
  {
    id: 'werkzeuge',
    title: 'Werkzeuge & Scores',
    icon: '🧮',
    status: 'available',
    component: WerkzeugeModule,
    minLevel: 'SanH',
    pinned: true,
  },
  {
    id: 'traumatologie',
    title: 'Traumatologie & Verbandslehre',
    icon: '🩹',
    status: 'available',
    component: TraumatologieModule,
    minLevel: 'SanH',
  },
  {
    id: 'medikamentenvorbereitung',
    title: 'Medikamente vorbereiten & verabreichen',
    icon: '💉',
    status: 'available',
    component: MedikamentenvorbereitungModule,
    minLevel: 'RS',
  },
];
