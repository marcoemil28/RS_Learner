import type { QualificationLevel } from '../../app/levels';

export type AnatomieCategory = 'Herz-Kreislauf' | 'Atmung' | 'Skelett & Muskulatur' | 'Nervensystem' | 'Vitalparameter';

export interface AnatomieFact {
  text: string;
  minLevel?: QualificationLevel;
}

export interface AnatomieSection {
  heading?: string;
  facts: AnatomieFact[];
}

export interface AnatomieTopic {
  id: string;
  title: string;
  category: AnatomieCategory;
  minLevel: QualificationLevel;
  summary: string;
  sections: AnatomieSection[];
  notes?: string[];
  sourceNote?: string;
}
