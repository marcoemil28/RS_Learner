import { useState } from 'react';

function band(value: number): string {
  if (value === 0) return 'Kein Schmerz';
  if (value <= 3) return 'Leichter Schmerz';
  if (value <= 6) return 'Mittlerer Schmerz';
  if (value <= 9) return 'Starker Schmerz';
  return 'Stärkster vorstellbarer Schmerz';
}

function medHint(value: number): string | null {
  if (value >= 6) {
    return 'Ab NRS ≥ 6 ist laut SAA/BPR z. B. Morphin/Fentanyl/Nalbuphin indiziert (NotSan-Kompetenz, siehe Medikamente).';
  }
  if (value >= 3) {
    return 'Ab NRS ≥ 3 ist laut SAA/BPR z. B. Ibuprofen/Paracetamol indiziert (NotSan-Kompetenz, siehe Medikamente).';
  }
  return null;
}

export function SchmerzSkala() {
  const [value, setValue] = useState(0);

  return (
    <div className="tool-calculator">
      <p className="tool-intro">
        Numerische Ratingskala (NRS): Patient:in gibt eine Zahl von 0 (kein Schmerz) bis 10 (stärkster vorstellbarer
        Schmerz) an. Die Visuelle Analogskala (VAS) funktioniert analog über eine 10-cm-Linie, an der ein Punkt
        markiert wird.
      </p>

      <div className="nrs-slider-wrap">
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="nrs-slider"
        />
        <div className="nrs-scale-labels">
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      </div>

      <div className="tool-result">
        <div className="tool-result-score">NRS: {value} / 10</div>
        <div className="tool-result-label">{band(value)}</div>
        {medHint(value) && <p className="tool-cross-hint">{medHint(value)}</p>}
      </div>
    </div>
  );
}
