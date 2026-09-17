import type { AlgorithmEntry } from './types';

/**
 * Quelle (soweit nicht anders vermerkt): "Standard-Arbeitsanweisungen und
 * Behandlungspfade im Rettungsdienst (SAA und BPR) 2025", Ärztliche
 * Leitungen Rettungsdienst Baden-Württemberg, Brandenburg, Mecklenburg-
 * Vorpommern, Nordrhein-Westfalen, Sachsen und Sachsen-Anhalt,
 * Stand: 30.04.2025 — Abschnitte "Herangehensweise" und "Kreislaufstillstand".
 *
 * Die `minLevel`-Werte pro Schritt sind eine Einordnung nach bestem Wissen
 * (siehe docs/vorgaben_und_inhalte.txt Abschnitt 5) und keine rechtsverbindliche
 * Kompetenzzuordnung — es gilt immer deine eigene, aktuell gültige
 * Ausbildungs-/Dienstordnung.
 */

/** Zuletzt inhaltlich geprüft/aktualisiert (App-Stand, nicht das Datum der Quelle oben). */
export const CONTENT_STAND = '2026-09-17';

export const ALGORITHMEN: AlgorithmEntry[] = [
  {
    id: 'abcde-herangehensweise',
    title: 'ABCDE – Herangehensweise',
    category: 'Herangehensweise & Einschätzung',
    minLevel: 'RS',
    summary:
      'Strukturierte Erstuntersuchung und Prioritätensetzung bei jedem Notfallpatienten — immer in derselben ' +
      'Reihenfolge, lebensbedrohliche Probleme werden sofort bei Entdeckung behandelt statt nur dokumentiert.',
    sections: [
      {
        heading: 'A – Airway (Atemweg)',
        steps: [
          { text: 'Atemweg frei? (Inspektion, ggf. Freimachen bei Verlegung)', minLevel: 'SanH' },
          { text: 'Bei Kreislaufstillstand: Reanimation nach passendem BPR', minLevel: 'RS' },
        ],
      },
      {
        heading: 'B – Breathing (Atmung)',
        steps: [
          {
            text: 'Atmung suffizient? Frequenz, Hautkolorit, Tidalvolumen/Thoraxexkursionen, Auskultation/Seitenvergleich, SpO2',
            minLevel: 'RS',
          },
          { text: 'Sauerstoffgabe', minLevel: 'RS' },
          { text: 'ggf. Atemweg sichern und beatmen', minLevel: 'NotSan' },
          { text: 'ggf. Entlastung eines Spannungspneumothorax (Thoraxentlastungspunktion)', minLevel: 'NotSan' },
        ],
      },
      {
        heading: 'C – Circulation (Kreislauf)',
        steps: [
          {
            text: 'Puls (Frequenz, Qualität, Rhythmus), Hauttemperatur/-kolorit, Rekapillarisierungszeit (kürzer/länger als 2 Sek.)',
            minLevel: 'RS',
          },
          {
            text: 'Blutungszeichen prüfen: äußere Blutung, Brust/Bauch, Becken ("Open-Book-Fraktur"), Arme/Beine',
            minLevel: 'RS',
          },
          { text: 'Kritische Blutung stoppen (Kompression, ggf. Tourniquet an Extremitäten)', minLevel: 'RS' },
          { text: 'ggf. i.v.-Zugang bei Kreislaufinstabilität', minLevel: 'NotSan' },
          { text: 'ggf. "Load-and-go"-Entscheidung', minLevel: 'RS' },
        ],
      },
      {
        heading: 'D – Disability (neurologische Defizite)',
        steps: [
          { text: 'Bewusstsein (WASB/GCS), Sensorik und Motorik', minLevel: 'RS' },
          { text: 'Pupillenreaktion, Blutzuckerkontrolle', minLevel: 'RS' },
        ],
      },
      {
        heading: 'E – Exposure / Environment (weitere Untersuchung)',
        steps: [
          {
            text: 'Patient entkleiden, Ganzkörperuntersuchung, ggf. Log-Roll-Manöver (achsengerechte 90°-en-bloc-Drehung)',
            minLevel: 'RS',
          },
          { text: 'Temperatur erfassen, vor Auskühlung schützen', minLevel: 'SanH' },
        ],
      },
    ],
    notes: [
      'Versorgungsstrategie nach Leitsymptomen priorisieren und passenden Behandlungspfad (BPR) wählen.',
      'Regelmäßige Re-Evaluierung des Patienten durchführen.',
      'Invasive Maßnahmen nach SAA durchführen (NotSan mit ärztlicher Delegation).',
    ],
    page: 75,
  },
  {
    id: 'abcde-instabilitaeten',
    title: 'ABCDE – Instabilitäten',
    category: 'Herangehensweise & Einschätzung',
    minLevel: 'RS',
    summary:
      'Warnzeichen, die auf ein instabiles A-, B-, C-, D- oder E-Problem hinweisen — bei Vorliegen sofort ' +
      'behandeln statt nur zu dokumentieren.',
    sections: [
      {
        heading: 'A – Atemweg',
        steps: [
          {
            text: 'Gefährdeter Atemweg, pathologisches Atemgeräusch (Schnarchen, Gurgeln, Stridor), Obstruktion durch Erbrochenes/Blut/Flüssigkeit/Fremdkörper',
          },
        ],
      },
      {
        heading: 'B – Atmung',
        steps: [
          {
            text: 'Frequenz < 8 oder > 30/min oder Atemstillstand, SpO2 < 90 %, Hypoxiezeichen, pathologisches Atemmuster/thorakale Einziehungen, pathologische Auskultationsbefunde',
          },
        ],
      },
      {
        heading: 'C – Kreislauf',
        steps: [
          {
            text: 'Schwache/fehlende periphere Pulse, RR < 80 oder > 200 mmHg systolisch, HF < 40 oder > 130/min, arrhythmischer Puls, Zyanose/Blässe, feuchte/kühle Haut, Rekap.-Zeit > 2 Sek., starkes Durstgefühl',
          },
          { text: 'Kritische Blutung: anhaltend „spritzende" Blutung, ausgeprägte Hautblässe' },
        ],
      },
      {
        heading: 'D – Disability',
        steps: [
          { text: 'Bewusstlosigkeit, eingeschränkte Bewusstseinslage, Lähmungen, Sensibilitätsstörungen, Blutzuckerentgleisung' },
        ],
      },
      {
        heading: 'E – Exposure',
        steps: [{ text: 'Hypo- oder Hyperthermie sowie sonstige Eindrücke, die auf einen kritischen Zustand hinweisen' }],
      },
    ],
    page: 76,
  },
  {
    id: 'wasb-gcs',
    title: 'Beurteilung der Bewusstseinslage (WASB & GCS)',
    category: 'Herangehensweise & Einschätzung',
    minLevel: 'SanH',
    summary:
      'Schnelleinschätzung der Bewusstseinslage (WASB) sowie die differenziertere Glasgow Coma Scale (GCS), ' +
      'z. B. zur Beurteilung eines Schädel-Hirn-Traumas.',
    sections: [
      {
        heading: 'WASB (Schnelltest)',
        steps: [
          { text: 'W – wach?', minLevel: 'SanH' },
          { text: 'A – Reaktion auf Ansprache?', minLevel: 'SanH' },
          { text: 'S – Reaktion auf Schmerzreiz?', minLevel: 'SanH' },
          {
            text: 'B – Bewusstlosigkeit? (keine Reaktion; je nach Reaktionsgrad Somnolenz/Sopor/Koma, Schutzreflexe prüfen)',
            minLevel: 'RS',
          },
        ],
      },
      {
        heading: 'GCS – Augenöffnung (E, max. 4 Punkte)',
        steps: [
          { text: '4 – spontan', minLevel: 'RS' },
          { text: '3 – auf Ansprache', minLevel: 'RS' },
          { text: '2 – auf Schmerzreiz', minLevel: 'RS' },
          { text: '1 – keine Reaktion', minLevel: 'RS' },
        ],
      },
      {
        heading: 'GCS – Verbale Reaktion (V, max. 5 Punkte)',
        steps: [
          { text: '5 – orientiert', minLevel: 'RS' },
          { text: '4 – verwirrt', minLevel: 'RS' },
          { text: '3 – unzusammenhängende Worte', minLevel: 'RS' },
          { text: '2 – unverständliche Laute', minLevel: 'RS' },
          { text: '1 – keine Reaktion', minLevel: 'RS' },
        ],
      },
      {
        heading: 'GCS – Motorische Reaktion (M, max. 6 Punkte)',
        steps: [
          { text: '6 – befolgt Aufforderungen', minLevel: 'RS' },
          { text: '5 – gezielte Schmerzabwehr', minLevel: 'RS' },
          { text: '4 – ungezielte Schmerzabwehr (normale Beugung)', minLevel: 'RS' },
          { text: '3 – abnorme Beugung (Beugesynergismen, Dekortikationshaltung)', minLevel: 'RS' },
          { text: '2 – Streckung (Strecksynergismen, Dezerebrationshaltung)', minLevel: 'RS' },
          { text: '1 – keine Reaktion', minLevel: 'RS' },
        ],
      },
      {
        heading: 'GCS – Schweregrad (Summe aus E + V + M, 3–15 Punkte)',
        steps: [
          { text: '15–13 Punkte: leichtes Schädel-Hirn-Trauma (SHT)', minLevel: 'RS' },
          { text: '12–9 Punkte: mittelschweres SHT', minLevel: 'RS' },
          { text: '8–3 Punkte: schweres SHT', minLevel: 'RS' },
        ],
      },
    ],
    notes: [
      'Die detaillierte Punktetabelle (Augenöffnung/verbale/motorische Reaktion) ist die allgemein gebräuchliche ' +
        'Originalskala nach Teasdale & Jennett (1974) und steht so nicht im SAA/BPR-PDF — dort wird nur die grobe ' +
        'Schweregrad-Einteilung (15–13/12–9/8–3) genannt.',
    ],
    page: 77,
  },
  {
    id: 'sampler',
    title: 'SAMPLER-Schema',
    category: 'Herangehensweise & Einschätzung',
    minLevel: 'RS',
    summary: 'Strukturiertes Abfrageschema zur Erfassung der akuten Situation und Vorgeschichte.',
    sections: [
      {
        steps: [
          { text: 'S – Symptome/Schmerzen: aktuelle Beschwerden (zur Vertiefung: OPQRST-Schema)' },
          { text: 'A – Allergien: bekannte Allergien' },
          {
            text: 'M – Medikamente: Dauer-/Bedarfsmedikation, planmäßig eingenommen?, gerinnungsaktive Medikamente (Pradaxa®, Xarelto®, Eliquis®, Heparin, ASS, Marcumar® etc.)',
          },
          { text: 'P – Patientengeschichte: aktuelle/frühere Erkrankungen, Operationen, Schwangerschaft, chronische Erkrankungen' },
          {
            text: 'L – Letzte …: letzte Mahlzeit (Zeitpunkt/Art), Stuhlgang/Miktion, Krankenhausaufenthalt, bei Frauen: letzte Regelblutung',
          },
          { text: 'E – Ereignis: Was hat zum Notruf geführt? Wie hat sich die Situation entwickelt?' },
          { text: 'R – Risikofaktoren: z. B. Rauchen, Alkohol, Drogen, Schwangerschaft' },
        ],
      },
    ],
    page: 78,
  },
  {
    id: 'opqrst',
    title: 'OPQRST-Schema',
    category: 'Herangehensweise & Einschätzung',
    minLevel: 'SanH',
    summary: 'Strukturiertes Schema zur genaueren Erfassung von Schmerzen/Symptomen.',
    sections: [
      {
        steps: [
          { text: 'O – Onset (Beginn): Wann begann das Symptom? Akut oder schleichend? Was wurde gerade gemacht?' },
          { text: 'P – Provocation/Palliation: Was verstärkt oder lindert das Symptom?' },
          {
            text: 'Q – Quality (Qualität): hell (z. B. stechend, brennend), dumpf (z. B. drückend, klopfend), wechselnd (z. B. kolikartig)',
          },
          { text: 'R – Radiation (Lokalisation/Ausstrahlung): Wo genau? Strahlt der Schmerz aus?' },
          { text: 'S – Severity (Schwere): Stärke auf NRS 0–10, wie belastend?' },
          { text: 'T – Time (Zeit): zeitlicher Verlauf' },
        ],
      },
    ],
    page: 79,
  },
  {
    id: 'atemwegsmanagement',
    title: 'Atemwegsmanagement',
    category: 'Atemweg',
    minLevel: 'RS',
    summary:
      'Eskalierendes Vorgehen bei insuffizienter Atmung/Bewusstlosigkeit: erst einfache Maßnahmen, dann ' +
      'Eskalation, mit regelmäßiger Reevaluation.',
    sections: [
      {
        heading: 'Einfache Maßnahmen (zuerst)',
        steps: [
          { text: 'Atemweg freimachen: Reklination des Kopfes (Cave: V. a. HWS-Trauma), Esmarch-Handgriff', minLevel: 'SanH' },
          { text: 'ggf. oral absaugen / Fremdkörper ausräumen', minLevel: 'RS' },
          { text: 'ggf. nasopharyngealer Tubus', minLevel: 'RS' },
          { text: 'Sauerstoffgabe; bei Stridor Epinephrin vernebeln (SAA Epinephrin)', minLevel: 'RS' },
        ],
      },
      {
        heading: 'Wenn Ventilation/Oxygenierung weiter unzureichend',
        steps: [
          { text: 'Optimierung der (Kopf-)Lagerung, 2-Hand-Technik/doppelter C-Griff, Ausschluss technischer Fehler', minLevel: 'RS' },
          { text: 'Beutel-Masken-Beatmung', minLevel: 'RS' },
          { text: 'Bei V. a. Atemwegsverlegung durch Fremdkörper: BPR „A-Problem bei Fremdkörperaspiration"', minLevel: 'RS' },
        ],
      },
      {
        heading: 'Bei weiterhin insuffizienter Atmung / fehlenden Schutzreflexen',
        steps: [
          { text: 'Anlage extraglottischer Atemweg (EGA)', minLevel: 'NotSan' },
          {
            text: 'Erfolgskontrolle: Thorax hebt/senkt sich seitengleich, typisches Kapnografie-Signal, niedriger Beatmungsdruck, adäquater SpO2-Anstieg',
            minLevel: 'NotSan',
          },
        ],
      },
    ],
    notes: [
      'Weiterführende invasive Maßnahmen (endotracheale Intubation, Koniotomie) liegen laut S1-Leitlinie ' +
        '„Prähospitales Atemwegsmanagement" grundsätzlich NICHT im Kompetenzbereich des nichtärztlichen ' +
        'Rettungsdienstpersonals; die Koniotomie steht als Ultima Ratio bei „can\'t intubate/can\'t oxygenate/' +
        'can\'t ventilate" am Ende des Algorithmus.',
    ],
    page: 80,
  },
  {
    id: 'patientenanmeldung',
    title: 'Patientenanmeldung (ZOABCDE)',
    category: 'Kommunikation & Übergabe',
    minLevel: 'RS',
    summary: 'Strukturierte telefonische Voranmeldung in der Zielklinik.',
    sections: [
      {
        steps: [
          { text: 'Z – Zeiten: Anmeldezeit, Ankunftszeit' },
          {
            text: 'O – Opening: Name, Alter, Geschlecht, Symptome seit wann, „Was ist passiert?" in einem Satz, Trauma oder Erkrankung, Verdachtsdiagnose, Dringlichkeit',
          },
          { text: 'A – Airway: spontan frei / gesichert (intubiert, supraglottisch) / gefährdet / Tracheostoma' },
          { text: 'B – Breathing: O2-pflichtig, V. a. Pneumothorax (Entlastung?), nicht-invasiv beatmet/CPAP, invasiv beatmet' },
          { text: 'C – Circulation: stabil/instabil, Reanimation (ROSC, laufend?), Schock, HRST, katecholaminpflichtig, Blutung' },
          {
            text: 'D – Disability: wach/orientiert, neurologisches Defizit (BE-FAST), erweckbar (Ansprache/Schmerzreiz), Koma',
          },
          {
            text: 'E – Extras: Verletzungsmuster, Infektion/Isolation, Antikoagulation, Schwangerschaft, Demenz, Eigen-/Fremdgefährdung, Erbrechen/Durchfall, sonstige Besonderheiten',
          },
        ],
      },
    ],
    page: 82,
  },
  {
    id: 'sinnhaft',
    title: 'Übergabe – SINNHAFT',
    category: 'Kommunikation & Übergabe',
    minLevel: 'RS',
    summary: 'Strukturierte mündliche Übergabe am Zielort, Schritt für Schritt.',
    sections: [
      {
        steps: [
          {
            text: 'S – Start: Ruhe, bereit für die Übergabe? Face-to-Face-Kommunikation, Manipulationen am Patienten möglichst vermeiden',
          },
          { text: 'I – Identifikation: Geschlecht, Nachname, Alter (pädiatrisch zusätzlich Gewicht)' },
          {
            text: 'N – Notfallereignis: Was? (Leitsymptom/Verdachtsdiagnose), Wie? (Ursache), Wann? (Zeitpunkt), optional Wo/Woher',
          },
          {
            text: 'N – Notfallpriorität: anhand des cABCDE-Schemas mit pathologischen Befunden/Vitalparametern (kein A-E-Problem? → auch das benennen)',
          },
          {
            text: 'H – Handlung: durchgeführte Maßnahmen (Maßnahme, Dosis/Umfang/Zeitpunkt, Wirkung), bewusst unterlassene Handlungen',
          },
          { text: 'A – Anamnese: Allergien, Medikation, Vorerkrankungen, Infektionen, Soziales/Organisatorisches, Besonderheiten' },
          {
            text: 'F – Fazit: Wiederholung durch das aufnehmende Personal (Identifikation, Notfallereignis, Notfallpriorität gekoppelt an die Handlung)',
          },
          { text: 'T – Teamfragen: Raum für zusätzliche wesentliche Fragen des aufnehmenden Personals' },
        ],
      },
    ],
    page: 83,
  },
  {
    id: 'reanimation-erwachsene',
    title: 'Reanimation Erwachsene (BLS → ALS)',
    category: 'Kreislaufstillstand',
    minLevel: 'SanH',
    summary:
      'Vom Erkennen des Kreislaufstillstands über Basismaßnahmen (die jede Qualifikationsstufe beherrschen ' +
      'sollte) bis zur erweiterten Reanimation (ALS) durch NotSan.',
    sections: [
      {
        heading: 'Erkennen & Basismaßnahmen (alle Stufen)',
        steps: [
          { text: 'Eigenschutz beachten, Bewusstsein prüfen (Ansprechen, Rütteln)', minLevel: 'SanH' },
          { text: 'Atemkontrolle: Atemweg freimachen (Kopf überstrecken), max. 10 Sek. auf normale Atmung prüfen', minLevel: 'SanH' },
          {
            text: 'Keine Reaktion und keine/keine normale Atmung → Notruf 112 veranlassen (lassen), sofort Herzdruckmassage starten',
            minLevel: 'SanH',
          },
          {
            text: 'Thoraxkompression: Frequenz 100–120/min, Tiefe 5–6 cm, vollständige Entlastung zwischen den Kompressionen',
            minLevel: 'SanH',
          },
          { text: 'Herzdruckmassage : Beatmung im Verhältnis 30:2 (sofern Beatmung durchführbar/geschult)', minLevel: 'SanH' },
          { text: 'AED sobald verfügbar anlegen und den Sprachanweisungen folgen', minLevel: 'RS' },
        ],
      },
      {
        heading: 'Erweiterte Versorgung (RS/NotSan)',
        steps: [
          { text: 'Defibrillator vorbereiten, einschalten, Defi-Elektroden kleben, laden', minLevel: 'RS' },
          {
            text: '1. EKG-Rhythmus-Beurteilung: VF/pVT → Defibrillation; Asystolie/PEA/auswurffähiger Rhythmus → keine Defibrillation, Defi entladen',
            minLevel: 'RS',
          },
          { text: '2 Minuten CPR, danach erneute Rhythmusbeurteilung (Zyklus wiederholen, ggf. Positionswechsel der Helfer)', minLevel: 'RS' },
          { text: 'EGA einlegen, Kapnografie anschließen', minLevel: 'NotSan' },
          { text: 'i.v.- oder i.o.-Zugang legen, Infusion vorbereiten', minLevel: 'NotSan' },
          { text: 'Bei Asystolie/PEA: Epinephringabe so früh wie möglich (SAA Epinephrin)', minLevel: 'NotSan' },
          { text: 'Nach der 3. erfolglosen Defibrillation: Amiodaron (alternativ Lidocain), danach Epinephrin alle 4 Min.', minLevel: 'NotSan' },
          {
            text: 'Reversible Ursachen bedenken: 4 „Hs" (Hypoxie, Hypovolämie, Hypo-/Hyperkaliämie, Hypothermie) und „HITS" (Herzbeuteltamponade, Intoxikation, Thromboembolie, Spannungspneumothorax)',
            minLevel: 'NotSan',
          },
        ],
      },
    ],
    notes: [
      'Hands-off-Zeiten vor/während der Defibrillation < 10 Sekunden; danach sofort Thoraxkompression fortsetzen.',
      'Pulskontrolle nur bei auswurffähigem EKG-Rhythmus und < 10 Sekunden.',
      'Oberste Priorität: qualitativ hochwertige Thoraxkompressionen mit minimalen Unterbrechungen, schnellstmögliche Defibrillation, Therapie reversibler Ursachen.',
    ],
    sourceNote:
      'Basismaßnahmen-Teil (Erkennen, Notruf, HDM 30:2, AED) nach allgemeinem BLS-Wissen (ERC-Leitlinien) ' +
      'ergänzt — steht nicht im SAA/BPR-PDF. Erweiterte Versorgung aus SAA/BPR „Reanimation Erwachsene – ALS", S. 85–86.',
    page: 85,
  },
  {
    id: 'reanimation-kinder',
    title: 'Reanimation Kinder (PLS)',
    category: 'Kreislaufstillstand',
    minLevel: 'SanH',
    summary:
      'Reanimation bei Kindern (0–18 Jahre, außer Neugeborene bei Geburt). Unterschiede zu Erwachsenen: erst ' +
      '5 initiale Beatmungen, Verhältnis 15:2, gewichtsadaptierte Defi-Energie.',
    sections: [
      {
        heading: 'Basismaßnahmen',
        steps: [
          {
            text: 'Bewusstsein und Atmung prüfen; bei Säuglingen/Kleinkindern mit hypoxiebedingter Bradykardie (HF < 60/min) ebenfalls CPR beginnen, auch wenn ein Puls tastbar ist',
            minLevel: 'SanH',
          },
          {
            text: '5 initiale Beatmungen (Sauerstoff, FiO2 1,0); erst danach bei fehlenden Lebenszeichen mit Thoraxkompression beginnen',
            minLevel: 'RS',
          },
          {
            text: 'Thoraxkompression: mind. 1/3 des Thoraxdurchmessers — Säugling: 2-Daumen-Technik, Kind: 1-Handballen-Technik, Jugendliche: 2-Hand-Technik ca. 5 cm (max. 6 cm)',
            minLevel: 'SanH',
          },
          { text: 'Verhältnis Thoraxkompression : Beatmung 15:2 (ohne EGA bzw. bei Undichtigkeit unter Kompression)', minLevel: 'RS' },
        ],
      },
      {
        heading: 'Erweiterte Versorgung (RS/NotSan)',
        steps: [
          { text: 'Defibrillation mit 4 J/kgKG biphasisch; bei refraktärem VF/pVT (> 6 Schocks) ggf. schrittweise bis max. 8 J/kgKG', minLevel: 'RS' },
          { text: 'EGA (Larynxmaske) erwägen, insbesondere bei schwieriger Beutel-Masken-Beatmung', minLevel: 'NotSan' },
          { text: 'i.v.-Zugang; bei Erfolglosigkeit binnen 5 Min. i.o.-Zugang', minLevel: 'NotSan' },
          {
            text: 'Bei Asystolie/PEA: Epinephrin so früh wie möglich nach Zugang (SAA Epinephrin), weitere Gaben nach Amiodaron/Lidocain',
            minLevel: 'NotSan',
          },
          { text: 'Reversible Ursachen: 4 Hs (inkl. Hypoglykämie) und HITS bedenken', minLevel: 'NotSan' },
        ],
      },
    ],
    notes: [
      'Bei Jugendlichen mit entsprechender Größe/Gewicht kann auch der Erwachsenen-Algorithmus angewendet werden.',
      'Atemfrequenz nach endotrachealer Intubation altersabhängig: 25/min (Säugling), 20/min (1–8 J.), 15/min (8–12 J.), 10/min (> 12 J.).',
    ],
    sourceNote:
      'Basismaßnahmen nach allgemeinem PLS/BLS-Wissen ergänzt — steht nicht im SAA/BPR-PDF. Erweiterte ' +
      'Versorgung aus SAA/BPR „Reanimation Kinder – PLS", S. 87–88.',
    page: 87,
  },
];

export function getAlgorithmById(id: string): AlgorithmEntry | undefined {
  return ALGORITHMEN.find((a) => a.id === id);
}
