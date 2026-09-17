import type { QualificationLevel } from '../../app/levels';

export type TraumaCategory =
  | 'Frakturen & Wunden'
  | 'Verbandslehre'
  | 'Schwere Verletzungen'
  | 'Verbrennungen'
  | 'Polytrauma & Blutstillung';

export interface TraumaFact {
  text: string;
  minLevel?: QualificationLevel;
}

export interface TraumaSection {
  heading?: string;
  facts: TraumaFact[];
}

export interface TraumaTopic {
  id: string;
  title: string;
  category: TraumaCategory;
  minLevel: QualificationLevel;
  summary: string;
  sections: TraumaSection[];
  notes?: string[];
  sourceNote?: string;
}
