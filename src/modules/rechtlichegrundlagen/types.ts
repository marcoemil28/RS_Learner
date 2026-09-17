import type { QualificationLevel } from '../../app/levels';

export type RechtlicheGrundlagenCategory = 'Grundrechte & Pflichten' | 'Delegation & Kompetenz' | 'Dokumentation';

export interface RechtlicheGrundlagenFact {
  text: string;
  minLevel?: QualificationLevel;
}

export interface RechtlicheGrundlagenSection {
  heading?: string;
  facts: RechtlicheGrundlagenFact[];
}

export interface RechtlicheGrundlagenTopic {
  id: string;
  title: string;
  category: RechtlicheGrundlagenCategory;
  minLevel: QualificationLevel;
  summary: string;
  sections: RechtlicheGrundlagenSection[];
  notes?: string[];
  sourceNote?: string;
}
