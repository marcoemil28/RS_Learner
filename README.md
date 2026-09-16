# RS Learner

Eine lokale Lern-App für die Rettungssanitäter-Ausbildung (EKG, SAA/BPR, und
perspektivisch weitere Themen). Läuft als native Desktop-App auf **macOS und
Windows** (Tauri + React/TypeScript) — komplett offline, keine Accounts, keine
Cloud.

> ⚠️ **Wichtiger Hinweis zu den Inhalten:** Die fachlichen Inhalte (EKG-Merkmale,
> Einordnungen, Handlungsempfehlungen) basieren auf allgemeinem rettungsdienstlichem
> Fachwissen und wurden **nicht** gegen ein bestimmtes offizielles Curriculum/Skript
> geprüft. Vor der Prüfung unbedingt mit deinen Kursunterlagen abgleichen — Grenzwerte,
> Algorithmen und Zuständigkeiten können sich je nach Organisation/Bundesland/Land
> unterscheiden. Diese App ersetzt keine offizielle Ausbildung.

Änderungen zwischen Versionen stehen in [CHANGELOG.md](CHANGELOG.md).

---

## Inhaltsverzeichnis

- [Schnellstart](#schnellstart)
- [Voraussetzungen](#voraussetzungen)
- [Features](#features)
- [Architektur](#architektur)
- [Eigene Inhalte einpflegen](#eigene-inhalte-einpflegen--korrigieren)
- [Neues Lernmodul hinzufügen](#neues-lernmodul-hinzufügen-zb-saabpr)
- [Builds für macOS & Windows](#builds-für-macos--windows)
- [Fehlerbehebung](#fehlerbehebung)
- [Roadmap](#roadmap)

---

## Schnellstart

Einmalig einrichten:

```bash
# 1. Node.js Abhängigkeiten installieren
npm install

# 2. Rust-Toolchain installieren (falls noch nicht vorhanden)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
# danach neue Shell öffnen oder: source "$HOME/.cargo/env"
```

**macOS-spezifisch:** Xcode Command Line Tools müssen installiert *und*
lizenziert sein (siehe [Fehlerbehebung](#fehlerbehebung) falls der Build mit
einem Linker-Fehler abbricht):

```bash
xcode-select --install        # falls noch nicht installiert
sudo xcodebuild -license      # Lizenz bestätigen (einmalig, braucht Passwort)
```

App starten (jedes Mal, wenn du entwickeln/testen willst):

```bash
npm run tauri dev
```

Das öffnet die App als natives Fenster. Änderungen am Code werden per
Hot-Reload sofort übernommen.

> Tipp: `npm run dev` startet nur das Frontend im Browser (ohne Tauri-Fenster,
> ohne Rust) — nützlich zum schnellen Iterieren an der Optik, aber ohne
> native Fenster-Funktionen.

## Voraussetzungen

| Tool | Zweck | Check |
|---|---|---|
| [Node.js](https://nodejs.org/) (LTS) | Frontend-Build (Vite/React) | `node -v` |
| [Rust](https://rustup.rs/) | Tauri-Backend | `rustc --version` |
| Xcode Command Line Tools (nur macOS) | native Builds | `xcode-select -p` |
| Visual Studio Build Tools mit "Desktop development with C++" (nur Windows) | native Builds | — |

## Features

### ✅ EKG-Trainer (v1)

- **18 Rhythmen** über alle für die RS-Ausbildung relevanten Kategorien:
  Sinusrhythmen, Vorhofarrhythmien (Vorhofflimmern/-flattern, SVT),
  Kammerarrhythmien (VES, VT, Kammerflattern), Kammerflimmern (grob/fein),
  Asystolie, alle drei AV-Block-Grade (inkl. Wenckebach vs. Mobitz II),
  ST-Hebung/-Senkung.
- Die EKG-Kurven werden **synthetisch/parametrisch generiert** (Summe von
  Gauß-Kurven für P/Q/R/S/T, siehe `waveform.ts`) — kein Bildmaterial nötig,
  dadurch beliebig viele Varianten pro Rhythmus und keine Lizenzfragen.
- **Lernmodus**: Karteikarten-artige Bibliothek mit Merkmalen und klinischer
  Relevanz/Vorgehen pro Rhythmus.
- **Quiz-Modus**: Multiple-Choice-Erkennung mit **gewichteter Wiederholung**
  (Rhythmen, bei denen du öfter falsch liegst, kommen häufiger dran — eine
  einfache Form von Spaced Repetition).
- **Fortschrittsansicht**: Trefferquote pro Rhythmus, lokal gespeichert
  (im Browser-/App-Storage, verlässt nie deinen Rechner).

### 🔜 Geplant

- SAA/BPR-Fragenkatalog
- Algorithmen (ABCDE, BLS/ALS)
- Medikamente
- Anatomie & Physiologie

Platzhalter für diese Module sind bereits in der Seitenleiste sichtbar
("bald").

## Architektur

```
src/
  app/
    registry.tsx         # zentrale Liste aller Lernmodule (Sidebar-Einträge)
  modules/
    ekg/
      types.ts           # Datenmodell für Rhythmen
      rhythms.ts         # Rhythmus-Bibliothek (Inhalte!)
      waveform.ts         # EKG-Kurvengenerator (parametrisch, keine Bilder)
      EkgTrace.tsx         # Canvas-Rendering der Kurve im Monitor-Look
      StudyMode.tsx        # Lern-/Karteikartenansicht
      QuizMode.tsx         # Multiple-Choice-Quiz
      ProgressView.tsx     # Fortschrittsstatistik
      progress.ts          # localStorage-Persistenz + gewichtete Zufallsauswahl
      EkgModule.tsx         # Tab-Container (Lernen/Quiz/Fortschritt)
  App.tsx                 # App-Shell mit Sidebar + aktivem Modul
src-tauri/                # Rust-Backend (Tauri), native Fenster/Bundling
```

### Eigene Inhalte einpflegen / korrigieren

- EKG-Rhythmen: `src/modules/ekg/rhythms.ts` — jeder Eintrag hat Merkmale,
  klinische Hinweise und die Parameter für die Kurvengenerierung
  (`gen`-Feld, siehe `types.ts` für die möglichen Rhythmus-Arten).
- Wenn du eigene Skripten/Fragenkataloge hast: am besten als eigene
  Modul-Datenquelle (z. B. `src/modules/saa-bpr/questions.ts`) im gleichen
  Stil wie `rhythms.ts` anlegen.

### Neues Lernmodul hinzufügen (z. B. SAA/BPR)

1. Neuen Ordner `src/modules/<name>/` anlegen.
2. Eine Hauptkomponente bauen (an `modules/ekg/EkgModule.tsx` orientieren).
3. In `src/app/registry.tsx` den Eintrag von `status: 'coming-soon'` auf
   `status: 'available'` setzen und `component` angeben.

## Builds für macOS & Windows

Native Installer werden pro Betriebssystem gebaut (kein Cross-Compiling
ohne weiteres möglich). D. h. für einen Windows-Installer brauchst du
einen Windows-Rechner (oder CI, z. B. GitHub Actions mit einem
`windows-latest`-Runner).

```bash
npm run tauri build
```

Die fertigen Installer liegen danach unter `src-tauri/target/release/bundle/`
(z. B. `.dmg`/`.app` auf macOS, `.msi`/`.exe` auf Windows).

## Fehlerbehebung

**`npm run tauri dev` / `cargo check` bricht mit `linking with "cc" failed`
und `"You have not agreed to the Xcode license agreements"` ab (macOS):**

```bash
sudo xcodebuild -license
```
Lizenztext mit Leertaste durchblättern, am Ende mit `agree` bestätigen.
Danach den Befehl erneut ausführen.

**Erster Start dauert lange:** Beim allerersten `npm run tauri dev` bzw.
`npm run tauri build` kompiliert Rust alle Abhängigkeiten neu — das kann
einige Minuten dauern. Danach sind Rebuilds durch Caching viel schneller.

## Roadmap

Siehe [CHANGELOG.md](CHANGELOG.md) für den aktuellen Stand und
`src/app/registry.tsx` für die geplanten Module.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
