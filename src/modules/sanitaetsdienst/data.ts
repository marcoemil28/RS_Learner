import type { SanitaetsdienstTopic } from './types';

const GENERAL_SOURCE_NOTE =
  'Allgemeines Grundlagenwissen zum Sanitäts-/Veranstaltungsdienst — keine SAA/BPR-Quelle. Konkrete Abläufe ' +
  '(Funkkanäle/Rufnamen, Sichtungsschema, Hygieneplan) sind organisations- und bundeslandspezifisch geregelt; ' +
  'es gilt immer die aktuelle, lokale Dienstanweisung bzw. der Hygieneplan des Trägers.';

export const SANITAETSDIENST_THEMEN: SanitaetsdienstTopic[] = [
  {
    id: 'wachdienst-organisation',
    title: 'Sanitätswachdienst-Organisation',
    category: 'Einsatzorganisation',
    minLevel: 'SanH',
    summary: 'Wie eine Sanitätswache bei einer Veranstaltung aufgebaut ist und welche Rollen es gibt.',
    sections: [
      {
        heading: 'Aufbau einer Wache',
        facts: [
          { text: 'Anmeldung/Erstkontakt: erste Anlaufstelle für Patienten und Helfer' },
          { text: 'Behandlungsbereich: abgetrennt, mit Liege(n), Sicht- und Lärmschutz' },
          { text: 'Ruhebereich für Betreuung (z. B. Kreislaufkollaps, psychische Erste Hilfe)' },
          { text: 'Materialdepot: Nachschub an Verbrauchsmaterial, getrennt vom Behandlungsbereich' },
          { text: 'Fahrzeug-/Trage-Stellplatz mit freier Zufahrt für den Rettungsdienst' },
        ],
      },
      {
        heading: 'Materialdepot & Ausstattung',
        facts: [
          { text: 'Inventarliste zu Dienstbeginn und -ende prüfen (Vollständigkeit, Verfallsdaten)' },
          { text: 'Springer-/Reservematerial für Streifenteams getrennt vorhalten' },
          { text: 'Nachschubweg definieren: wer meldet Verbrauch, wer füllt auf' },
        ],
      },
      {
        heading: 'Funkkonzept',
        facts: [
          { text: 'Wachleitung als zentrale Anlaufstelle und Koordinationsstelle', minLevel: 'RS' },
          { text: 'Sprechgruppen/Kanäle nach Einsatzabschnitt oder Aufgabe getrennt', minLevel: 'RS' },
          { text: 'Jedes Team erhält einen eindeutigen Rufnamen für die Dauer der Veranstaltung' },
        ],
      },
      {
        heading: 'Einsatzabschnitte bei Großveranstaltungen',
        facts: [
          { text: 'Abschnittsleitung koordiniert mehrere Sanitätsstationen/Streifenteams', minLevel: 'RS' },
          { text: 'Hauptwache als zentrale Sanitätsstation, dezentrale Nebenwachen je nach Geländegröße' },
          { text: 'Streifenteams (Fuß/Rad) zur schnellen Erstversorgung in der Menschenmenge' },
        ],
      },
    ],
    sourceNote: GENERAL_SOURCE_NOTE,
  },
  {
    id: 'manv-sichtung',
    title: 'MANV & Sichtung (Triage)',
    category: 'Einsatzorganisation',
    minLevel: 'RS',
    summary:
      'Grundprinzip der Sichtung bei einem Massenanfall von Verletzten (MANV): Ziel ist die größtmögliche ' +
      'Anzahl Überlebender, nicht die optimale Einzelbehandlung.',
    sections: [
      {
        heading: 'Was ist ein MANV?',
        facts: [
          {
            text: 'MANV = die Anzahl und/oder Schwere der Verletzten übersteigt die sofort verfügbaren Rettungsmittel',
          },
          { text: 'Grundsatzwechsel: weg von "bestmögliche Versorgung für einen Patienten", hin zu "größtmögliche Anzahl Überlebender"' },
        ],
      },
      {
        heading: 'Sichtungskategorien (Ampelschema)',
        facts: [
          { text: 'Sichtungskategorie I (rot): akute vitale Bedrohung — sofortige Behandlung' },
          { text: 'Sichtungskategorie II (gelb): schwer verletzt/erkrankt — aufgeschobene Behandlung' },
          { text: 'Sichtungskategorie III (grün): leicht verletzt — spätere/ambulante Behandlung' },
          { text: 'Sichtungskategorie IV (blau): ohne Überlebenschance — betreuende/palliative Versorgung' },
          { text: 'Tote werden gesondert gekennzeichnet, sind aber keine eigene Sichtungskategorie' },
        ],
      },
      {
        heading: 'Sichtungsalgorithmus (Grundprinzip, angelehnt an START)',
        facts: [
          { text: 'Gehfähig? → ja: Sichtungskategorie III, Sammelpunkt für Leichtverletzte' },
          { text: 'Atmung nach Freimachen der Atemwege vorhanden? → nein: Sichtungskategorie IV/tot' },
          { text: 'Atemfrequenz stark erhöht/erniedrigt (Richtwert < 10 oder > 29/min) → Sichtungskategorie I' },
          { text: 'Kreislauf kritisch (Rekapillarisierungszeit > 2 s bzw. Radialispuls fehlt) → Sichtungskategorie I' },
          { text: 'Bewusstsein eingeschränkt (folgt keinen einfachen Aufforderungen) → Sichtungskategorie I' },
          { text: 'Keines der Kriterien erfüllt → Sichtungskategorie II' },
        ],
      },
      {
        heading: 'Sichtung ist ein dynamischer Prozess',
        facts: [
          { text: 'Regelmäßige Nachsichtung, da sich der Zustand verschlechtern oder verbessern kann' },
          { text: 'Kennzeichnung z. B. mit Sichtungskarten/-anhängern nach Kategorie' },
        ],
      },
    ],
    notes: [
      'Das genaue Ampelschema und die Kriterien-Schwellenwerte können je nach Bundesland/Landesrettungsdienstplan ' +
        'variieren — maßgeblich ist immer die lokale Vorgabe/SOP.',
    ],
    sourceNote: GENERAL_SOURCE_NOTE,
  },
  {
    id: 'funkalphabet',
    title: 'Funkalphabet & Funkdisziplin',
    category: 'Kommunikation',
    minLevel: 'SanH',
    summary: 'Das international genormte Buchstabieralphabet und Grundregeln für klaren, kurzen Sprechfunkverkehr.',
    sections: [
      {
        heading: 'Internationales Buchstabieralphabet (nach DIN 5009 / ICAO)',
        facts: [
          { text: 'A – Alfa, B – Bravo, C – Charlie, D – Delta, E – Echo, F – Foxtrot, G – Golf, H – Hotel, I – India' },
          { text: 'J – Juliett, K – Kilo, L – Lima, M – Mike, N – November, O – Oscar, P – Papa, Q – Quebec, R – Romeo' },
          { text: 'S – Sierra, T – Tango, U – Uniform, V – Victor, W – Whiskey, X – X-ray, Y – Yankee, Z – Zulu' },
        ],
      },
      {
        heading: 'Grundregeln der Funkdisziplin',
        facts: [
          { text: 'Kurz und präzise sprechen — kein unnötiges "Füllwort"-Geplauder auf dem Kanal' },
          { text: 'Eigenen Rufnamen zuerst nennen, dann die Gegenstelle' },
          { text: 'Nachricht mit "kommen" abschließen, wenn eine Antwort erwartet wird, sonst "Ende"' },
          { text: 'Mithören durch Dritte bedenken — keine sensiblen Patientendaten im Klartext' },
          { text: 'Kanal nach der Durchsage sofort wieder freigeben' },
        ],
      },
      {
        heading: 'Standard-Sprechfunkverkehr-Ablauf',
        facts: [
          { text: 'Rufname der Gegenstelle → eigener Rufname → Nachricht → "kommen"' },
          { text: 'Wichtige Angaben (Ort, Anzahl Patienten, Zustand) in fester Reihenfolge durchgeben' },
        ],
      },
    ],
    notes: ['Konkrete Kanalzuteilung und Rufnamen sind organisationsspezifisch (BOS-Funk-Richtlinien, lokale Dienstanweisung).'],
    sourceNote: GENERAL_SOURCE_NOTE,
  },
  {
    id: 'veranstaltungs-verletzungsmuster',
    title: 'Typische Veranstaltungs-Verletzungsmuster',
    category: 'Medizinische Besonderheiten',
    minLevel: 'SanH',
    summary: 'Wiederkehrende Beschwerdebilder bei Menschenansammlungen, Festivals und Sportveranstaltungen.',
    sections: [
      {
        heading: 'Typische Ursachen',
        facts: [
          { text: 'Menschenmengen/Gedränge (Crowd Crush)' },
          { text: 'Alkohol- und Drogenkonsum' },
          { text: 'Witterung (Hitze, Kälte, direkte Sonne)' },
          { text: 'Lärm, Stress, langes Stehen' },
        ],
      },
      {
        heading: 'Kreislaufkollaps (vasovagale Synkope)',
        facts: [
          { text: 'Häufigstes Beschwerdebild bei Veranstaltungen' },
          { text: 'Auslöser: langes Stehen, Hitze, Aufregung, Blutentnahme/Anblick von Blut' },
          { text: 'Maßnahmen: hinlegen, Beine hochlagern, für kühle Umgebung und Flüssigkeit sorgen' },
        ],
      },
      {
        heading: 'Verletzungen durch Gedränge (Crowd Crush)',
        facts: [
          { text: 'Quetschungen und Sturzverletzungen in dichten Menschenmengen' },
          { text: 'Erstickungsgefahr durch Brustkorbkompression — frühzeitige Eigen- und Fremdrettung aus der Menge', minLevel: 'RS' },
        ],
      },
      {
        heading: 'Alkohol- und Hitzeintoxikation',
        facts: [
          { text: 'Erkennungsmerkmale: verminderte Ansprechbarkeit, Gangunsicherheit, Erbrechen' },
          { text: 'Basismaßnahmen: stabile Seitenlage bei Erbrechen, Überwachung von Atmung und Bewusstsein' },
          { text: 'Bei fehlender Besserung oder Bewusstlosigkeit: Notarzt/Klinikeinweisung veranlassen', minLevel: 'RS' },
        ],
      },
    ],
    sourceNote: GENERAL_SOURCE_NOTE,
  },
  {
    id: 'hygiene-infektionsschutz',
    title: 'Hygiene & Infektionsschutz',
    category: 'Medizinische Besonderheiten',
    minLevel: 'SanH',
    summary: 'Basishygiene, persönliche Schutzausrüstung und Vorgehen nach Blutkontakt/Nadelstichverletzung.',
    sections: [
      {
        heading: 'Basishygiene',
        facts: [
          { text: 'Händedesinfektion vor Patientenkontakt, vor aseptischen Tätigkeiten, nach Kontakt mit Körperflüssigkeiten, nach Patientenkontakt und nach Kontakt mit der Patientenumgebung' },
          { text: 'Flächendesinfektion von Fahrzeug und Material nach jedem Einsatz mit Kontamination' },
        ],
      },
      {
        heading: 'Persönliche Schutzausrüstung (PSA)',
        facts: [
          { text: 'Einmalhandschuhe als Standard bei jedem Patientenkontakt' },
          { text: 'Mund-Nasen-Schutz bzw. FFP2 bei Verdacht auf übertragbare Erkrankung' },
          { text: 'Schutzbrille bei Spritzgefahr (z. B. Erbrechen, Blutung)' },
        ],
      },
      {
        heading: 'Umgang mit Blutkontakt / Nadelstichverletzung',
        facts: [
          { text: 'Sofortmaßnahmen: Blutfluss an der Wunde fördern, anschließend gründlich desinfizieren' },
          { text: 'Vorfall dokumentieren und zeitnah D-Arzt bzw. Betriebsarzt vorstellen', minLevel: 'RS' },
          { text: 'Je nach Risikoeinschätzung ist eine Postexpositionsprophylaxe zu prüfen', minLevel: 'RS' },
        ],
      },
      {
        heading: 'Entsorgung',
        facts: [
          { text: 'Spitze/scharfe Gegenstände ausschließlich in durchstichsicheren Behältern entsorgen' },
          { text: 'Kontaminiertes Material getrennt vom restlichen Abfall entsorgen' },
        ],
      },
    ],
    notes: ['Hygienevorgaben richten sich nach dem Hygieneplan des Trägers und aktuellen RKI-Empfehlungen.'],
    sourceNote: GENERAL_SOURCE_NOTE,
  },
];

export function getSanitaetsdienstTopicById(id: string): SanitaetsdienstTopic | undefined {
  return SANITAETSDIENST_THEMEN.find((t) => t.id === id);
}
