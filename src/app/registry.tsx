import type { ComponentType } from 'react';
import { EkgModule } from '../modules/ekg/EkgModule';

export interface LearningModule {
  id: string;
  title: string;
  icon: string;
  status: 'available' | 'coming-soon';
  component?: ComponentType;
}

/**
 * Zentrale Modul-Registry.
 *
 * Um ein neues Lernmodul hinzuzufügen (z. B. SAA/BPR-Fragenkatalog,
 * Medikamente, Algorithmen):
 * 1. Neuen Ordner unter src/modules/<name>/ anlegen.
 * 2. Eine Hauptkomponente exportieren (siehe modules/ekg/EkgModule.tsx als Vorlage).
 * 3. Hier einen Eintrag mit status: 'available' und component hinzufügen.
 */
export const MODULES: LearningModule[] = [
  { id: 'ekg', title: 'EKG-Trainer', icon: '📈', status: 'available', component: EkgModule },
  { id: 'saa-bpr', title: 'SAA / BPR Fragenkatalog', icon: '📋', status: 'coming-soon' },
  { id: 'algorithmen', title: 'Algorithmen (ABCDE, ALS/BLS)', icon: '🧭', status: 'coming-soon' },
  { id: 'medikamente', title: 'Medikamente', icon: '💊', status: 'coming-soon' },
  { id: 'anatomie', title: 'Anatomie & Physiologie', icon: '🫀', status: 'coming-soon' },
];
