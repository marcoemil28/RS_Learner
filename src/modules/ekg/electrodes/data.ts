import type { ElectrodeSet } from './types';

/**
 * Elektrodenpositionen nach allgemein gebräuchlichen Standards (u. a.
 * "Ampelschema" für Monitoring-EKG, Wilson-Ableitungen für die
 * Brustwandableitungen V1-V6). Allgemeines Fachwissen, nicht aus einer
 * bestimmten Dienstanweisung — im Zweifel gilt das Vorgehen deines
 * Rettungsdienstbereichs bzw. Geräteherstellers.
 */
export const MONITORING_SET: ElectrodeSet = {
  id: 'monitoring',
  title: 'Monitoring-EKG (3-/4-Kanal, „Ampelschema“)',
  intro:
    'Für die kontinuierliche Rhythmusüberwachung reichen 3 (bzw. 4) Elektroden am Rumpf. ' +
    'Eselsbrücke „Ampelschema“: wie eine Ampel von oben nach unten und von rechts nach links – Rot, Gelb, Grün (, Schwarz).',
  bodyType: 'full',
  viewBox: { w: 400, h: 750 },
  minLevel: 'RS',
  points: [
    {
      id: 'rot',
      label: 'Rot',
      color: '#e5484d',
      x: 150,
      y: 145,
      description: 'Rechte Infraklavikulargrube (unterhalb des rechten Schlüsselbeins)',
    },
    {
      id: 'gelb',
      label: 'Gelb',
      color: '#e6c34d',
      x: 250,
      y: 145,
      description: 'Linke Infraklavikulargrube (unterhalb des linken Schlüsselbeins)',
    },
    {
      id: 'gruen',
      label: 'Grün',
      color: '#3ddc84',
      x: 230,
      y: 330,
      description: 'Linker unterer Rippenbogen / linke Flanke (Richtung Herzspitze)',
    },
    {
      id: 'schwarz',
      label: 'Schwarz',
      color: '#c7cdd6',
      x: 170,
      y: 330,
      description: 'Rechter unterer Rippenbogen (Erdungselektrode, nur bei 4-Kanal-Ableitung)',
    },
  ],
};

/**
 * Brustkorb-Set: viewBox 0 0 500 560, siehe ThoraxOutline.tsx für die
 * gezeichneten Interkostalraum-Bänder (ICR1-6, y-Bänder) und vertikalen
 * Leitlinien (Sternal-/Medioklavikular-/vordere+mittlere Axillarlinie).
 * Für V1, V2, V4, V5, V6 wird beim Üben strikt geprüft, ob die Elektrode im
 * richtigen ICR-Band UND auf der richtigen Linie liegt (hitZone) — nicht nur
 * "nah genug" an einem Punkt. V3 ("zwischen V2 und V4") sowie die vier
 * Extremitätenableitungen bleiben einfache Abstands-Ziele.
 */
export const TWELVE_LEAD_SET: ElectrodeSet = {
  id: 'twelve-lead',
  title: '12-Kanal-EKG (Extremitäten- + Brustwandableitungen)',
  intro:
    'Für ein vollständiges 12-Kanal-EKG (z. B. bei V. a. ACS/STEMI) braucht es 4 Extremitäten- und 6 ' +
    'Brustwandelektroden (V1-V6) nach Wilson. Bei V1, V2, V4-V6 zählt hier sowohl der richtige ' +
    'Interkostalraum als auch die richtige Linie – wie in echt.',
  bodyType: 'thorax',
  viewBox: { w: 500, h: 560 },
  minLevel: 'RS',
  points: [
    { id: 'ra', label: 'RA (Rot)', color: '#e5484d', x: 85, y: 65, description: 'Richtung rechter Arm (z. B. Handgelenk, innenseitig)' },
    { id: 'la', label: 'LA (Gelb)', color: '#e6c34d', x: 415, y: 65, description: 'Richtung linker Arm (z. B. Handgelenk, innenseitig)' },
    { id: 'rl', label: 'RL (Schwarz)', color: '#c7cdd6', x: 150, y: 500, description: 'Richtung rechtes Bein (z. B. Sprunggelenk, innenseitig)' },
    { id: 'll', label: 'LL (Grün)', color: '#3ddc84', x: 350, y: 500, description: 'Richtung linkes Bein (z. B. Sprunggelenk, innenseitig)' },
    {
      id: 'v1',
      label: 'V1',
      color: '#4da3ff',
      x: 230,
      y: 245,
      description: '4. Interkostalraum, rechts parasternal',
      hitZone: { rowY: [220, 268], colX: [212, 248] },
    },
    {
      id: 'v2',
      label: 'V2',
      color: '#4da3ff',
      x: 270,
      y: 245,
      description: '4. Interkostalraum, links parasternal',
      hitZone: { rowY: [220, 268], colX: [252, 288] },
    },
    { id: 'v3', label: 'V3', color: '#4da3ff', x: 305, y: 283, description: 'Zwischen V2 und V4' },
    {
      id: 'v4',
      label: 'V4',
      color: '#4da3ff',
      x: 340,
      y: 322,
      description: '5. Interkostalraum, linke Medioklavikularlinie',
      hitZone: { rowY: [293, 350], colX: [322, 358] },
    },
    {
      id: 'v5',
      label: 'V5',
      color: '#4da3ff',
      x: 400,
      y: 335,
      description: 'Vordere Axillarlinie, auf Höhe von V4',
      hitZone: { rowY: [303, 362], colX: [382, 418] },
    },
    {
      id: 'v6',
      label: 'V6',
      color: '#4da3ff',
      x: 425,
      y: 327,
      description: 'Mittlere Axillarlinie, auf Höhe von V4',
      hitZone: { rowY: [298, 356], colX: [407, 443] },
    },
  ],
};

export const ELECTRODE_SETS: ElectrodeSet[] = [MONITORING_SET, TWELVE_LEAD_SET];
