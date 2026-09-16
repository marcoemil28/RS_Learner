const MIDLINE = 250;

/**
 * Rippen 1-9 einer Körperhälfte (patient:innen-rechts, kleinere x-Werte).
 * lateral = seitlicher Ansatzpunkt (Knochen), sternal = Ansatz am Brustbein
 * (über den Rippenknorpel). Die linke Seite wird an MIDLINE gespiegelt.
 */
const RIBS_RIGHT = [
  { n: 1, latX: 108, latY: 102, midX: 150, midY: 88, sternX: 224, sternY: 80 },
  { n: 2, latX: 88, latY: 148, midX: 140, midY: 145, sternX: 228, sternY: 132 },
  { n: 3, latX: 70, latY: 197, midX: 130, midY: 205, sternX: 231, sternY: 178 },
  { n: 4, latX: 60, latY: 247, midX: 122, midY: 262, sternX: 234, sternY: 224 },
  { n: 5, latX: 56, latY: 297, midX: 118, midY: 316, sternX: 236, sternY: 266 },
  { n: 6, latX: 58, latY: 345, midX: 120, midY: 368, sternX: 238, sternY: 306 },
  { n: 7, latX: 66, latY: 390, midX: 128, midY: 415, sternX: 240, sternY: 340 },
  { n: 8, latX: 80, latY: 430, midX: 145, midY: 450, sternX: 232, sternY: 372 },
  { n: 9, latX: 98, latY: 465, midX: 165, midY: 478, sternX: 224, sternY: 398 },
];

function mirror(x: number) {
  return 2 * MIDLINE - x;
}

export function ThoraxOutline() {
  return (
    <g>
      {/* Schlüsselbeine */}
      <path d="M228,62 L100,88" className="clavicle" />
      <path d={`M${mirror(228)},62 L${mirror(100)},88`} className="clavicle" />

      {/* Brustbein: Manubrium, Corpus, Xiphoid */}
      <path
        d="M228,58 L272,58 L266,128 L234,128 Z M234,128 L266,128 L262,375 L238,375 Z M240,375 L260,375 L250,400 Z"
        className="sternum-bone"
      />

      {RIBS_RIGHT.map((r) => (
        <g key={r.n}>
          <path
            d={`M${r.latX},${r.latY} Q${r.midX},${r.midY} ${r.sternX},${r.sternY}`}
            className="rib-bone"
          />
          <path
            d={`M${mirror(r.latX)},${r.latY} Q${mirror(r.midX)},${r.midY} ${mirror(r.sternX)},${r.sternY}`}
            className="rib-bone"
          />
          <text x={r.latX - 16} y={r.latY + 4} className="rib-number">
            {r.n}
          </text>
        </g>
      ))}

      {/* Beispiel-Hinweis wie man Interkostalräume zählt */}
      <path d="M150,72 L118,120" className="callout-line" />
      <text x="152" y="66" className="callout-label">
        1. ICR
      </text>

      {/* Vertikale Leitlinien für die Brustwandableitungen */}
      {[
        { xR: 230, xL: 270 },
        { xR: 160, xL: 340 },
        { xR: 100, xL: 400 },
        { xR: 75, xL: 425 },
      ].map((v, i) => (
        <g key={i}>
          <line x1={v.xR} y1="90" x2={v.xR} y2="470" className="vline" />
          <line x1={v.xL} y1="90" x2={v.xL} y2="470" className="vline" />
        </g>
      ))}

      {/* Schulter-/Hüftansatzpunkte für die Extremitätenableitungen */}
      <circle cx="85" cy="65" r="16" className="limb-stub" />
      <circle cx="415" cy="65" r="16" className="limb-stub" />
      <circle cx="150" cy="500" r="16" className="limb-stub" />
      <circle cx="350" cy="500" r="16" className="limb-stub" />
    </g>
  );
}
