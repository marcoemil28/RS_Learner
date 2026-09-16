# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier dokumentiert.

Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
Versionierung angelehnt an [Semantic Versioning](https://semver.org/lang/de/)
(solange die App nicht veröffentlicht ist, sind Breaking Changes zwischen
`0.x`-Versionen jederzeit möglich).

## [Unreleased]

Nichts geplant Offenes aktuell außerhalb der Roadmap in der README.

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
