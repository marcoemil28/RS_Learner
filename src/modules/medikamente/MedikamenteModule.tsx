import { useEffect, useMemo, useState } from 'react';
import { MEDIKAMENTE } from './data';
import type { Medikament, MedikamentKategorie } from './types';
import { useNavigation } from '../../app/NavigationContext';
import { FavoriteButton } from '../../components/FavoriteButton';

const CATEGORY_ORDER: MedikamentKategorie[] = [
  'Analgesie & Sedierung',
  'Herz-Kreislauf',
  'Atemwege & Allergie',
  'Gerinnung & Volumen',
  'Magen-Darm & Stoffwechsel',
  'Antidot & Ausleitung',
];

function Field({ label, value, emphasize }: { label: string; value: string | null; emphasize?: boolean }) {
  if (!value) return null;
  return (
    <div className={`med-field ${emphasize ? 'med-field-emphasis' : ''}`}>
      <h4>{label}</h4>
      <p>{value}</p>
    </div>
  );
}

function MedikamentDetail({ med }: { med: Medikament }) {
  return (
    <div className="med-detail">
      <div className="med-detail-header">
        <div>
          <h2>
            {med.name}{' '}
            <FavoriteButton moduleId="medikamente" itemId={med.id} title={med.name} moduleTitle="Medikamente (SAA/BPR)" icon="💊" />
          </h2>
          {med.arzneimittelgruppe && <p className="med-subtitle">{med.arzneimittelgruppe}</p>}
        </div>
        <span className="med-page-ref">SAA und BPR 2025, S. {med.page}</span>
      </div>

      <div className="med-grid">
        <Field label="Wirkstoff" value={med.wirkstoff} />
        <Field label="Konzentration" value={med.konzentration} />
      </div>

      <Field label="Wirkung – was macht es im Körper?" value={med.wirkung} emphasize />
      <Field label="Indikationen – wann wird es angewendet?" value={med.indikationen} />
      <Field label="Durchführung / Dosierung" value={med.dosierung} emphasize />
      <div className="med-grid">
        <Field label="Keine Anwendung, wenn (Kontraindikationen)" value={med.kontraindikationen} />
        <Field label="Anwendung nach Nutzen-/Risiko-Abwägung, wenn" value={med.relativeKontraindikationen} />
      </div>
      <Field label="Altersbegrenzung" value={med.altersbegrenzung} />
      <Field label="Unerwünschte Arzneimittelwirkungen (UAW) / Risiken" value={med.uaw} />
      <Field label="Überdosierung / Gegenmaßnahmen" value={med.ueberdosierung} />
      <Field label="Besonderheiten" value={med.besonderheiten} />
      <Field label="Besondere Hinweise zur Anwendung" value={med.besondereHinweise} />
    </div>
  );
}

export function MedikamenteModule() {
  const [selectedId, setSelectedId] = useState(MEDIKAMENTE[0].id);
  const { pending, clearPending } = useNavigation();

  useEffect(() => {
    if (pending?.moduleId === 'medikamente' && pending.itemId && MEDIKAMENTE.some((m) => m.id === pending.itemId)) {
      setSelectedId(pending.itemId);
      clearPending();
    }
  }, [pending, clearPending]);

  const grouped = useMemo(() => {
    const map = new Map<MedikamentKategorie, Medikament[]>();
    for (const m of MEDIKAMENTE) {
      const list = map.get(m.category) ?? [];
      list.push(m);
      map.set(m.category, list);
    }
    return map;
  }, []);

  const selected = MEDIKAMENTE.find((m) => m.id === selectedId) ?? MEDIKAMENTE[0];

  return (
    <div className="module medikamente-module">
      <header className="module-header">
        <h1>Medikamente (SAA/BPR)</h1>
      </header>

      <div className="med-disclaimer">
        ⚠️ Diese Inhalte stammen aus den <strong>Standard-Arbeitsanweisungen und Behandlungspfaden (SAA/BPR) 2025</strong>{' '}
        der Ärztlichen Leitungen Rettungsdienst (BW, BB, MV, NRW, SN, ST) und richten sich an{' '}
        <strong>Notfallsanitäter:innen (NotSan)</strong> mit ärztlicher Delegation — nicht an Rettungssanitäter:innen
        (RS). Als RS gibst du diese Medikamente nicht eigenständig. Nutze diesen Bereich als{' '}
        <strong>Nachschlagewerk/Kontextwissen</strong>, nicht als RS-Prüfungsstoff. Es gilt immer deine aktuelle,
        lokale Dienstanweisung. Der Abschnitt „Wirkung“ ist zusätzliches, allgemeines Pharmakologie-Wissen und steht
        <em> nicht</em> im Original-PDF.
      </div>

      <div className="med-layout">
        <aside className="med-list">
          {CATEGORY_ORDER.filter((c) => grouped.has(c)).map((cat) => (
            <div key={cat} className="med-group">
              <h4>{cat}</h4>
              <ul>
                {grouped.get(cat)!.map((m) => (
                  <li key={m.id}>
                    <button className={m.id === selectedId ? 'active' : ''} onClick={() => setSelectedId(m.id)}>
                      {m.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <MedikamentDetail med={selected} />
      </div>
    </div>
  );
}
