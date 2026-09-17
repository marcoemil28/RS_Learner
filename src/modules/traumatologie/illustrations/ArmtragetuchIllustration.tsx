export function ArmtragetuchIllustration() {
  return (
    <svg viewBox="0 0 260 300" className="illustration-svg" role="img" aria-label="Schema eines Armtragetuchs">
      {/* Kopf + Hals */}
      <circle cx="150" cy="45" r="32" className="illustration-skin" />
      <rect x="138" y="70" width="24" height="26" className="illustration-skin" />

      {/* Rumpf */}
      <path d="M90,96 L210,96 L200,230 L100,230 Z" className="illustration-skin" />

      {/* Unverletzter Arm */}
      <path d="M92,105 L60,220" className="illustration-limb" />
      <circle cx="55" cy="232" r="13" className="illustration-skin" />

      {/* Verletzter Arm: Oberarm am Körper, Unterarm diagonal nach oben zur Gegenschulter (Hand höher als Ellenbogen) */}
      <path d="M205,105 L212,168" className="illustration-limb" />
      <path d="M212,168 L128,138" className="illustration-limb" />
      <circle cx="120" cy="135" r="14" className="illustration-skin" />

      {/* Dreiecktuch als Schlinge, die den Unterarm von unten trägt */}
      <path d="M136,152 L207,182 L172,222 Z" className="illustration-bandage" />

      {/* Enden, die seitlich am Nacken verknotet werden */}
      <path d="M205,184 C 232,150 220,95 175,80" className="illustration-tie" />
      <path d="M138,154 C 100,120 130,95 172,82" className="illustration-tie" />
      <circle cx="176" cy="82" r="7" className="illustration-knot" />

      {/* Beschriftungen */}
      <line x1="170" y1="200" x2="80" y2="235" className="illustration-leader" />
      <text x="30" y="248" className="illustration-label">
        Dreiecktuch als Schlinge
      </text>

      <line x1="176" y1="82" x2="130" y2="55" className="illustration-leader" />
      <text x="20" y="48" className="illustration-label">
        Knoten seitlich am Hals
      </text>

      <line x1="120" y1="135" x2="55" y2="120" className="illustration-leader" />
      <text x="15" y="110" className="illustration-label">
        Hand höher als Ellenbogen
      </text>
    </svg>
  );
}
