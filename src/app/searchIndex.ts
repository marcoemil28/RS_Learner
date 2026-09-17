import { RHYTHMS } from '../modules/ekg/rhythms';
import { MEDIKAMENTE } from '../modules/medikamente/data';
import { ALGORITHMEN } from '../modules/algorithmen/data';
import { ANATOMIE_THEMEN } from '../modules/anatomie/data';
import type { QualificationLevel } from './levels';

export interface SearchItem {
  key: string;
  title: string;
  moduleId: string;
  moduleTitle: string;
  icon: string;
  itemId: string;
  minLevel: QualificationLevel;
  haystack: string;
}

const INDEX: SearchItem[] = [
  ...RHYTHMS.map(
    (r): SearchItem => ({
      key: `ekg:${r.id}`,
      title: r.nameDe,
      moduleId: 'ekg',
      moduleTitle: 'EKG-Trainer',
      icon: '📈',
      itemId: r.id,
      minLevel: r.minLevel,
      haystack: [r.nameDe, r.nameEn, ...r.keyFeatures].join(' ').toLowerCase(),
    })
  ),
  ...MEDIKAMENTE.map(
    (m): SearchItem => ({
      key: `medikamente:${m.id}`,
      title: m.name,
      moduleId: 'medikamente',
      moduleTitle: 'Medikamente (SAA/BPR)',
      icon: '💊',
      itemId: m.id,
      minLevel: m.minLevel,
      haystack: [m.name, m.wirkstoff, m.arzneimittelgruppe, m.indikationen].filter(Boolean).join(' ').toLowerCase(),
    })
  ),
  ...ALGORITHMEN.map(
    (a): SearchItem => ({
      key: `algorithmen:${a.id}`,
      title: a.title,
      moduleId: 'algorithmen',
      moduleTitle: 'Algorithmen',
      icon: '🧭',
      itemId: a.id,
      minLevel: a.minLevel,
      haystack: [a.title, a.summary, ...a.sections.flatMap((s) => s.steps.map((step) => step.text))]
        .join(' ')
        .toLowerCase(),
    })
  ),
  ...ANATOMIE_THEMEN.map(
    (t): SearchItem => ({
      key: `anatomie:${t.id}`,
      title: t.title,
      moduleId: 'anatomie',
      moduleTitle: 'Anatomie & Physiologie',
      icon: '🫀',
      itemId: t.id,
      minLevel: t.minLevel,
      haystack: [t.title, t.summary, ...t.sections.flatMap((s) => s.facts.map((f) => f.text))].join(' ').toLowerCase(),
    })
  ),
];

export function searchAll(query: string, limit = 12): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return INDEX.filter((item) => item.haystack.includes(q)).slice(0, limit);
}
