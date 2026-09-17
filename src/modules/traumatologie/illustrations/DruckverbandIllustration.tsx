export function DruckverbandIllustration() {
  return (
    <svg viewBox="0 0 340 200" className="illustration-svg" role="img" aria-label="Schema eines Druckverbands am Unterarm">
      <defs>
        <clipPath id="forearm-clip">
          <rect x="20" y="70" width="250" height="60" rx="30" />
        </clipPath>
      </defs>

      {/* Unterarm + Hand */}
      <rect x="20" y="70" width="250" height="60" rx="30" className="illustration-skin" />
      <ellipse cx="278" cy="100" rx="22" ry="26" className="illustration-skin" />

      {/* Wundauflage (liegt unter dem Verband, an den Rändern sichtbar) */}
      <rect x="112" y="66" width="56" height="68" rx="6" className="illustration-wound" />

      {/* Spiralförmig gewickelte Fixierbinde */}
      <g clipPath="url(#forearm-clip)">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect
            key={i}
            x={100 + i * 14}
            y="55"
            width="10"
            height="90"
            transform={`rotate(28 ${105 + i * 14} 100)`}
            className="illustration-bandage-strip"
          />
        ))}
      </g>

      {/* Beschriftungen */}
      <line x1="140" y1="66" x2="140" y2="30" className="illustration-leader" />
      <text x="140" y="20" className="illustration-label" textAnchor="middle">
        Wundauflage + Druckpolster
      </text>

      <line x1="200" y1="60" x2="230" y2="20" className="illustration-leader" />
      <text x="335" y="16" className="illustration-label" textAnchor="end">
        Fixierbinde (straff)
      </text>

      <line x1="278" y1="126" x2="278" y2="172" className="illustration-leader" />
      <text x="278" y="185" className="illustration-label" textAnchor="middle">
        DMS-Kontrolle distal
      </text>
    </svg>
  );
}
