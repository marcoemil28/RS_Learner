import { useEffect, useState } from 'react';

/**
 * Button mit eingebauter Bestätigung, ohne auf `window.confirm` zu setzen.
 * In der Tauri-WebView zeigen native `confirm()`-Dialoge nicht zuverlässig
 * einen Bestätigungsdialog (je nach Plattform kommt sofort `false` zurück,
 * ohne dass der Nutzer etwas sieht) — deshalb hier eine In-App-Lösung.
 */
export function ConfirmButton({
  label,
  confirmLabel = 'Wirklich?',
  className,
  onConfirm,
}: {
  label: string;
  confirmLabel?: string;
  className?: string;
  onConfirm: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const timer = window.setTimeout(() => setConfirming(false), 4000);
    return () => window.clearTimeout(timer);
  }, [confirming]);

  if (confirming) {
    return (
      <span className="confirm-button-group">
        <button
          className={className}
          onClick={() => {
            setConfirming(false);
            onConfirm();
          }}
        >
          {confirmLabel}
        </button>
        <button className="secondary" onClick={() => setConfirming(false)}>
          Abbrechen
        </button>
      </span>
    );
  }

  return (
    <button className={className} onClick={() => setConfirming(true)}>
      {label}
    </button>
  );
}
