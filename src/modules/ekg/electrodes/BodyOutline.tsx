export function BodyOutline() {
  return (
    <g>
      {/* Beine */}
      <path d="M168,405 L160,560 L155,675" className="body-limb" />
      <circle cx="152" cy="690" r="14" className="body-limb-end" />
      <path d="M232,405 L240,560 L245,675" className="body-limb" />
      <circle cx="248" cy="690" r="14" className="body-limb-end" />

      {/* Arme */}
      <path d="M135,125 L75,230 L55,358" className="body-limb" />
      <circle cx="52" cy="372" r="15" className="body-limb-end" />
      <path d="M265,125 L325,230 L345,358" className="body-limb" />
      <circle cx="348" cy="372" r="15" className="body-limb-end" />

      {/* Rumpf */}
      <path d="M110,115 L290,115 L245,340 L250,410 L150,410 L155,340 Z" className="body-torso" />

      {/* Hals + Kopf */}
      <rect x="185" y="90" width="30" height="30" className="body-torso" />
      <circle cx="200" cy="58" r="38" className="body-torso" />
    </g>
  );
}
