export function KopfverbandIllustration() {
  return (
    <svg viewBox="0 0 220 220" className="illustration-svg" role="img" aria-label="Schema eines Kopfverbands mit Dreiecktuch">
      {/* Kopf */}
      <ellipse cx="110" cy="110" rx="68" ry="78" className="illustration-skin" />

      {/* Dreiecktuch als Kappe über dem Oberkopf */}
      <path d="M45,95 A68,78 0 0 1 175,95 L165,120 A58,58 0 0 0 55,120 Z" className="illustration-bandage" />
      {/* Eingeschlagene Spitze oben */}
      <path d="M110,32 L95,58 L125,58 Z" className="illustration-bandage-fold" />

      {/* Enden, die am Hinterkopf gekreuzt und verknotet werden */}
      <path d="M55,120 C 20,140 40,175 90,182" className="illustration-tie" />
      <path d="M165,120 C 200,140 180,175 130,182" className="illustration-tie" />
      <circle cx="110" cy="184" r="8" className="illustration-knot" />

      {/* Beschriftungen */}
      <line x1="110" y1="45" x2="110" y2="15" className="illustration-leader" />
      <text x="110" y="10" className="illustration-label" textAnchor="middle">
        Spitze wird eingeschlagen
      </text>

      <line x1="150" y1="105" x2="205" y2="90" className="illustration-leader" />
      <text x="215" y="86" className="illustration-label" textAnchor="end">
        Tuch flach auflegen
      </text>

      <line x1="110" y1="184" x2="110" y2="210" className="illustration-leader" />
      <text x="110" y="216" className="illustration-label" textAnchor="middle">
        Enden am Hinterkopf verknoten
      </text>
    </svg>
  );
}
