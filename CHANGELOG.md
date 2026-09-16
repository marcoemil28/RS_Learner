# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier dokumentiert.

Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
Versionierung angelehnt an [Semantic Versioning](https://semver.org/lang/de/)
(solange die App nicht veröffentlicht ist, sind Breaking Changes zwischen
`0.x`-Versionen jederzeit möglich).

## [Unreleased]

Nichts geplant Offenes aktuell außerhalb der Roadmap in der README.

## [0.4.0] – 2026-09-16

### Behoben

- **„Zurücksetzen" im EKG-Quiz und in der Fortschrittsansicht funktionierte
  nicht.** Ursache: `window.confirm()` liefert in der Tauri-WebView nicht
  zuverlässig einen echten Bestätigungsdialog. Ersetzt durch eine
  In-App-Bestätigung (`components/ConfirmButton.tsx`, Klick → "Wirklich?"/
  "Abbrechen" statt nativem Dialog).

### Geändert

- **12-Kanal-Elektrodentrainer:** `ThoraxOutline.tsx` zeigt jetzt einen
  echten, anatomisch angelehnten Rippenkorb (Schlüsselbeine, Brustbein mit
  Manubrium/Corpus/Xiphoid, 9 nummerierte Rippenpaare als Knochen statt
  schattierter Bänder) — angelehnt an eine vom Nutzer bereitgestellte
  Referenz-Abbildung. Die V1-V6-Punkte sitzen jetzt direkt auf den Rippen
  mit gepunkteten Hilfslinien zu den Labels darunter (wie in klassischen
  Lehrbuch-Abbildungen). Hit-Zonen (ICR-Band + Leitlinie) wurden an die neue
  Rippengeometrie angepasst und erneut end-to-end getestet.

## [0.3.0] – 2026-09-16

### Hinzugefügt

- **Medikamente-Modul:** neues Feld „Wirkung“ pro Medikament (allgemeinverständlich,
  was das Medikament im Körper macht) direkt neben den Indikationen, damit
  auf einen Blick klar ist, was ein Mittel bringt und wann es eingesetzt
  wird (`modules/medikamente/wirkung.ts`). Dieses Wissen stammt bewusst
  nicht aus dem SAA/BPR-PDF, sondern ist ergänztes Pharmakologie-Grundwissen
  — im UI-Disclaimer entsprechend gekennzeichnet.
- **12-Kanal-Elektrodentrainer grundlegend überarbeitet:** statt der
  bisherigen Ganzkörper-Ansicht mit grobem Abstands-Treffer gibt es jetzt
  einen eigenen, gezoomten **Brustkorb-Umriss** (`ThoraxOutline.tsx`) mit
  gezeichneten, nummerierten Rippen, schattierten Interkostalraum-Bändern
  (ICR 1-6) und durchgehend sichtbaren vertikalen Leitlinien
  (Sternal-/Medioklavikular-/vordere+mittlere Axillarlinie).
  - Für V1, V2, V4, V5 und V6 wird jetzt **zweidimensional geprüft**: Die
    Elektrode muss sowohl im richtigen Interkostalraum **als auch** auf der
    richtigen Linie liegen (`ElectrodeHitZone`), statt nur "nah genug" an
    einem Punkt zu sein — deutlich näher an der echten Anlegetechnik
    ("Rippe zählen, dann Linie finden").
  - V3 (per Definition nur "zwischen V2 und V4") und die vier
    Extremitätenableitungen (jetzt als Schulter-/Hüft-Ansatzpunkte am
    Brustkorb) bleiben bewusst einfache Abstandsziele.
  - Das Monitoring-EKG-Set (Ampelschema) nutzt weiterhin die
    Ganzkörperansicht (dort nicht nötig/sinnvoll, keine ICR-Kritikalität).

## [0.2.0] – 2026-09-16

### Hinzugefügt

- **Elektroden-Platzierungstrainer** im EKG-Modul (neuer Tab „Elektroden
  legen“): interaktiver, per Maus/Touch bedienbarer Körper (SVG-Mannequin,
  `modules/ekg/electrodes/`), auf dem die richtigen Klebepositionen der
  EKG-Elektroden trainiert werden.
  - Zwei Sets: **Monitoring-EKG (3-/4-Kanal, „Ampelschema“)** und
    **12-Kanal-EKG** (Extremitäten- + Brustwandableitungen V1-V6 nach
    Wilson, inkl. Rippen-/Hilfslinien für die Landmarken).
  - Zwei Modi: **Lernen** (statische, beschriftete Referenzansicht) und
    **Üben** (Elektroden per Drag-and-drop an die richtige Stelle ziehen,
    mit Sofort-Feedback, Versuchszähler und Reset).
- **Medikamente-Modul** (neu verfügbar, vorher Platzhalter): durchsuchbares
  Nachschlagewerk mit 29 Medikamenten (Wirkstoff, Konzentration,
  Indikationen, Kontraindikationen, Dosierung, Nebenwirkungen,
  Besonderheiten), inhaltlich aus den **SAA und BPR 2025** (Standard-
  Arbeitsanweisungen und Behandlungspfade Rettungsdienst, 6-Länder-
  Arbeitsgruppe ÄLRD) extrahiert. Mit deutlich sichtbarem Hinweis, dass es
  sich um NotSan-Kompetenzen (nicht RS-Prüfungsstoff) handelt und die App
  hier als Kontext-/Nachschlage-Plattform dient.
- `docs/saa_bpr_2025.pdf` als Wissensquelle im Projekt abgelegt; Extraktion
  der Medikamentendaten über ein einmaliges Python/PyMuPDF-Skript
  (Ergebnis liegt strukturiert in `modules/medikamente/medications.json`).

### Geändert

- Registry-Eintrag „SAA / BPR Fragenkatalog“ entfernt zugunsten des jetzt
  verfügbaren Medikamente-Moduls; „Algorithmen“ bleibt als Platzhalter für
  die BPR-Krankheitsbilder/-Algorithmen aus derselben Quelle.
- Versionsnummer auf 0.2.0 angehoben.

## [0.1.0] – 2026-09-16

### Hinzugefügt

- Projekt-Setup als Tauri + React + TypeScript App (lauffähig auf macOS und
  Windows, Vite als Build-Tool).
- App-Shell mit Seitenleiste und Modul-Registry (`src/app/registry.tsx`) als
  Grundlage für zukünftige Lernmodule.
- **EKG-Trainer** als erstes vollständiges Lernmodul:
  - Parametrischer EKG-Kurvengenerator (`modules/ekg/waveform.ts`), der
    Rhythmen aus P/Q/R/S/T-Gaußkurven synthetisiert statt Bildmaterial zu
    benötigen.
  - Rhythmus-Bibliothek mit 18 Einträgen: Sinusrhythmus, Sinusbradykardie,
    Sinustachykardie, respiratorische Sinusarrhythmie, Vorhofflimmern,
    Vorhofflattern, SVT, ventrikuläre Extrasystole, ventrikuläre Tachykardie,
    Kammerflattern, Kammerflimmern (grob/fein), Asystolie, AV-Block I°,
    AV-Block II° Wenckebach, AV-Block II° Mobitz II, AV-Block III°,
    ST-Hebung- und ST-Senkung-Muster.
  - Canvas-Rendering der Kurven im Monitor-Look (`EkgTrace.tsx`).
  - Lernmodus mit Karteikarten-Bibliothek, gruppiert nach Kategorie
    (`StudyMode.tsx`).
  - Quiz-Modus mit Multiple-Choice-Erkennung und gewichteter
    Wiederholungslogik für schwache Rhythmen (`QuizMode.tsx`, `progress.ts`).
  - Fortschrittsansicht mit Trefferquote pro Rhythmus, lokal persistiert
    (`ProgressView.tsx`).
- Platzhalter-Einträge für kommende Module: SAA/BPR-Fragenkatalog,
  Algorithmen (ABCDE, BLS/ALS), Medikamente, Anatomie & Physiologie.
- README mit Schnellstart, Architekturüberblick und
  Fehlerbehebungs-Hinweisen (u. a. Xcode-Lizenz unter macOS).
