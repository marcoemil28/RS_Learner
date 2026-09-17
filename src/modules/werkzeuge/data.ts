import type { ComponentType } from 'react';
import type { QualificationLevel } from '../../app/levels';
import { GcsCalculator } from './GcsCalculator';
import { NacaScore } from './NacaScore';
import { SchmerzSkala } from './SchmerzSkala';
import { ApgarCalculator } from './ApgarCalculator';
import { NeunerRegel } from './NeunerRegel';

export interface Tool {
  id: string;
  title: string;
  category: string;
  minLevel: QualificationLevel;
  description: string;
  component: ComponentType;
}

export const TOOLS: Tool[] = [
  {
    id: 'gcs',
    title: 'Glasgow Coma Scale (GCS)',
    category: 'Bewusstsein',
    minLevel: 'RS',
    description: 'Interaktiver Rechner zur Beurteilung der Bewusstseinslage.',
    component: GcsCalculator,
  },
  {
    id: 'schmerzskala',
    title: 'Schmerzskala (NRS/VAS)',
    category: 'Schmerz',
    minLevel: 'SanH',
    description: 'Numerische Ratingskala 0–10 zur Schmerzeinschätzung.',
    component: SchmerzSkala,
  },
  {
    id: 'apgar',
    title: 'APGAR-Score',
    category: 'Neugeborene',
    minLevel: 'RS',
    description: 'Beurteilung von Neugeborenen nach 1/5/10 Minuten.',
    component: ApgarCalculator,
  },
  {
    id: 'neuner-regel',
    title: 'Neuner-Regel (Verbrennungsfläche)',
    category: 'Verbrennung',
    minLevel: 'RS',
    description: 'Schätzung der verbrannten Körperoberfläche (VKOF).',
    component: NeunerRegel,
  },
  {
    id: 'naca',
    title: 'NACA-Score',
    category: 'Einsatzschwere',
    minLevel: 'RS',
    description: 'Einteilung der Einsatzschwere für Dokumentation.',
    component: NacaScore,
  },
];

export function getToolById(id: string): Tool | undefined {
  return TOOLS.find((t) => t.id === id);
}
