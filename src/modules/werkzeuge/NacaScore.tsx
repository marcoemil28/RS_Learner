import { useState } from 'react';

const NACA_GRADES = [
  { grade: '0', label: 'Keine Verletzung/Erkrankung' },
  { grade: 'I', label: 'Geringfügige Störung, keine ärztliche Behandlung notwendig' },
  { grade: 'II', label: 'Ambulante Abklärung/Behandlung notwendig, keine Vitalgefährdung' },
  { grade: 'III', label: 'Stationäre Behandlung erforderlich, keine akute Vitalgefährdung' },
  { grade: 'IV', label: 'Akute Vitalgefährdung nicht auszuschließen' },
  { grade: 'V', label: 'Akute Vitalgefährdung vorhanden (z. B. Schock, Bewusstlosigkeit)' },
  { grade: 'VI', label: 'Reanimation am Einsatzort erforderlich' },
  { grade: 'VII', label: 'Tod (keine Reanimation eingeleitet oder erfolglose Reanimation)' },
];

export function NacaScore() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedGrade = NACA_GRADES.find((g) => g.grade === selected);

  return (
    <div className="tool-calculator">
      <p className="tool-intro">
        NACA-Score — grobe Einteilung der Einsatzschwere für Dokumentation/Statistik. Wähle die zutreffende Stufe.
      </p>

      <div className="naca-list">
        {NACA_GRADES.map((g) => (
          <button
            key={g.grade}
            className={`naca-item ${selected === g.grade ? 'active' : ''}`}
            onClick={() => setSelected(g.grade)}
          >
            <span className="naca-grade">{g.grade}</span>
            <span>{g.label}</span>
          </button>
        ))}
      </div>

      {selectedGrade && (
        <div className="tool-result">
          <div className="tool-result-score">
            NACA {selectedGrade.grade}
          </div>
          <div className="tool-result-label">{selectedGrade.label}</div>
        </div>
      )}
    </div>
  );
}
