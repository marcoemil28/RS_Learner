import type { QualificationLevel } from '../../app/levels';

export type PsychiatrieNotfaelleCategory =
  | 'Psychiatrische Notfälle'
  | 'Kommunikation'
  | 'Sterben & Todesfeststellung'
  | 'Großschadenslagen';

export interface PsychiatrieNotfaelleFact {
  text: string;
  minLevel?: QualificationLevel;
}

export interface PsychiatrieNotfaelleSection {
  heading?: string;
  facts: PsychiatrieNotfaelleFact[];
}

export interface PsychiatrieNotfaelleTopic {
  id: string;
  title: string;
  category: PsychiatrieNotfaelleCategory;
  minLevel: QualificationLevel;
  summary: string;
  sections: PsychiatrieNotfaelleSection[];
  notes?: string[];
  sourceNote?: string;
}
