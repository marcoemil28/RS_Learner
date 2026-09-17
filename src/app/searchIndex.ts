import { RHYTHMS } from '../modules/ekg/rhythms';
import { MEDIKAMENTE } from '../modules/medikamente/data';
import { ALGORITHMEN } from '../modules/algorithmen/data';
import { ANATOMIE_THEMEN } from '../modules/anatomie/data';
import { TOOLS } from '../modules/werkzeuge/data';
import { TRAUMA_THEMEN } from '../modules/traumatologie/data';
import { MED_VORBEREITUNG } from '../modules/medikamentenvorbereitung/data';
import { SANITAETSDIENST_THEMEN } from '../modules/sanitaetsdienst/data';
import { INTERNISTISCHE_NOTFAELLE_THEMEN } from '../modules/internistischenotfaelle/data';
import { PAEDIATRIE_THEMEN } from '../modules/paediatrie/data';
import { PSYCHIATRIENOTFAELLE_THEMEN } from '../modules/psychiatrienotfaelle/data';
import { MODULES } from './registry';

export interface SearchItem {
  key: string;
  title: string;
  moduleId: string;
  moduleTitle: string;
  icon: string;
  itemId: string;
  category: string;
  haystack: string;
}

type RawSearchItem = Omit<SearchItem, 'category'>;

const CATEGORY_BY_MODULE_ID = new Map(MODULES.map((m) => [m.id, m.category]));

const RAW_INDEX: RawSearchItem[] = [
  ...RHYTHMS.map(
    (r): RawSearchItem => ({
      key: `ekg:${r.id}`,
      title: r.nameDe,
      moduleId: 'ekg',
      moduleTitle: 'EKG-Trainer',
      icon: '📈',
      itemId: r.id,
      haystack: [r.nameDe, r.nameEn, ...r.keyFeatures].join(' ').toLowerCase(),
    })
  ),
  ...MEDIKAMENTE.map(
    (m): RawSearchItem => ({
      key: `medikamente:${m.id}`,
      title: m.name,
      moduleId: 'medikamente',
      moduleTitle: 'Medikamente (SAA/BPR)',
      icon: '💊',
      itemId: m.id,
      haystack: [m.name, m.wirkstoff, m.arzneimittelgruppe, m.indikationen].filter(Boolean).join(' ').toLowerCase(),
    })
  ),
  ...ALGORITHMEN.map(
    (a): RawSearchItem => ({
      key: `algorithmen:${a.id}`,
      title: a.title,
      moduleId: 'algorithmen',
      moduleTitle: 'Algorithmen',
      icon: '🧭',
      itemId: a.id,
      haystack: [a.title, a.summary, ...a.sections.flatMap((s) => s.steps.map((step) => step.text))]
        .join(' ')
        .toLowerCase(),
    })
  ),
  ...ANATOMIE_THEMEN.map(
    (t): RawSearchItem => ({
      key: `anatomie:${t.id}`,
      title: t.title,
      moduleId: 'anatomie',
      moduleTitle: 'Anatomie & Physiologie',
      icon: '🫀',
      itemId: t.id,
      haystack: [t.title, t.summary, ...t.sections.flatMap((s) => s.facts.map((f) => f.text))].join(' ').toLowerCase(),
    })
  ),
  ...TOOLS.map(
    (t): RawSearchItem => ({
      key: `werkzeuge:${t.id}`,
      title: t.title,
      moduleId: 'werkzeuge',
      moduleTitle: 'Werkzeuge & Scores',
      icon: '🧮',
      itemId: t.id,
      haystack: [t.title, t.description, t.category].join(' ').toLowerCase(),
    })
  ),
  ...TRAUMA_THEMEN.map(
    (t): RawSearchItem => ({
      key: `traumatologie:${t.id}`,
      title: t.title,
      moduleId: 'traumatologie',
      moduleTitle: 'Traumatologie & Verbandslehre',
      icon: '🩹',
      itemId: t.id,
      haystack: [t.title, t.summary, ...t.sections.flatMap((s) => s.facts.map((f) => f.text))].join(' ').toLowerCase(),
    })
  ),
  ...MED_VORBEREITUNG.map(
    (e): RawSearchItem => ({
      key: `medikamentenvorbereitung:${e.id}`,
      title: e.title,
      moduleId: 'medikamentenvorbereitung',
      moduleTitle: 'Medikamente vorbereiten & verabreichen',
      icon: '💉',
      itemId: e.id,
      haystack: [e.title, e.summary, ...e.sections.flatMap((s) => s.steps.map((step) => step.text))]
        .join(' ')
        .toLowerCase(),
    })
  ),
  ...SANITAETSDIENST_THEMEN.map(
    (t): RawSearchItem => ({
      key: `sanitaetsdienst:${t.id}`,
      title: t.title,
      moduleId: 'sanitaetsdienst',
      moduleTitle: 'Sanitätsdienst (Veranstaltungsdienst)',
      icon: '🎪',
      itemId: t.id,
      haystack: [t.title, t.summary, ...t.sections.flatMap((s) => s.facts.map((f) => f.text))].join(' ').toLowerCase(),
    })
  ),
  ...INTERNISTISCHE_NOTFAELLE_THEMEN.map(
    (t): RawSearchItem => ({
      key: `internistischenotfaelle:${t.id}`,
      title: t.title,
      moduleId: 'internistischenotfaelle',
      moduleTitle: 'Internistische Notfälle',
      icon: '🩺',
      itemId: t.id,
      haystack: [t.title, t.summary, ...t.sections.flatMap((s) => s.facts.map((f) => f.text))].join(' ').toLowerCase(),
    })
  ),
  ...PAEDIATRIE_THEMEN.map(
    (t): RawSearchItem => ({
      key: `paediatrie:${t.id}`,
      title: t.title,
      moduleId: 'paediatrie',
      moduleTitle: 'Pädiatrie & Geburtshilfe',
      icon: '🍼',
      itemId: t.id,
      haystack: [t.title, t.summary, ...t.sections.flatMap((s) => s.facts.map((f) => f.text))].join(' ').toLowerCase(),
    })
  ),
  ...PSYCHIATRIENOTFAELLE_THEMEN.map(
    (t): RawSearchItem => ({
      key: `psychiatrienotfaelle:${t.id}`,
      title: t.title,
      moduleId: 'psychiatrienotfaelle',
      moduleTitle: 'Psychiatrische Notfälle & Kommunikation',
      icon: '🧠',
      itemId: t.id,
      haystack: [t.title, t.summary, ...t.sections.flatMap((s) => s.facts.map((f) => f.text))].join(' ').toLowerCase(),
    })
  ),
];

const INDEX: SearchItem[] = RAW_INDEX.map((item) => ({ ...item, category: CATEGORY_BY_MODULE_ID.get(item.moduleId)! }));

export function searchAll(query: string, limit = 12): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return INDEX.filter((item) => item.haystack.includes(q)).slice(0, limit);
}
