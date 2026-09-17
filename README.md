# SanWissen

Eine lokale Lern- und Nachschlage-App für den Sanitäts- und Rettungsdienst —
von Sanitätshelfer (SanH) über Rettungssanitäter (RS, schließt Rettungshelfer
mit ein) bis Notfallsanitäter (NotSan) (EKG, Anatomie, Algorithmen, SAA/BPR,
und perspektivisch weitere Themen). Läuft als native Desktop-App auf
**macOS und Windows** (Tauri + React/TypeScript) — komplett offline, keine
Accounts, keine Cloud.

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

### ✅ Startseite

- Landet man beim App-Start: Modul-Karten-Übersicht + **"Dein Fahrplan"**
  — kuratierte Verlinkung in ausgewählte Abschnitte aller Module, gruppiert
  nach Thema (kein eigenes Modul mit eigenen Inhalten, nur Navigation,
  siehe `docs/vorgaben_und_inhalte.txt` Abschnitt 5).
- Zeigt eine EKG-Fortschritts-Kachel, sobald erste Quiz-Versuche vorliegen.
- Die App-Version steht sichtbar neben dem Logo in der Sidebar (z. B.
  "v0.10.0") — automatisch aus `package.json` übernommen, keine doppelte
  Pflege nötig (`vite.config.ts` → `__APP_VERSION__`).

### ✅ Themen-Gruppierung (statt Qualifikationsstufen)

- Sidebar und Fahrplan gruppieren Module nach fünf Themenkategorien statt
  nach Kompetenzstufe: **Grundlagenwissen**, **Krankheitsbilder &
  Algorithmen**, **Medikamente**, **Diagnostik & Training**, **Einsatz &
  Organisation** (`ModuleCategory` in `src/app/registry.tsx`). Werkzeuge &
  Scores bleibt als einziges Modul fest oben angepinnt (`pinned: true`),
  alle anderen erscheinen in ihrer Kategorie.
- Ursprünglich gab es hier drei Qualifikationsstufen (SanH/RS/NotSan) als
  Navigationsachse — nach Rückmeldung war das unnötig komplex, da Inhalte
  ohnehin für alle einsehbar sind. Umgestellt in 0.17.0, siehe CHANGELOG.
- `QualificationLevel` (`src/app/levels.ts`) existiert weiterhin als
  internes `minLevel`-Feld auf einzelnen Inhalten (Datenmodell-Altlast aus
  der früheren Stufen-Idee), hat aber aktuell **keine** Auswirkung auf
  Anzeige, Gruppierung oder Suche.

### ✅ Globale Suche

- Ein Suchfeld oben in der Sidebar durchsucht **alle Module gleichzeitig**
  (EKG-Rhythmen, Medikamente, Algorithmen, Anatomie) statt einzelner
  Tab-Suchfelder.
- Klick auf einen Treffer springt direkt zum richtigen Modul **und**
  Eintrag — auch über die internen Tabs des EKG-Trainers hinweg.
- Implementierung: `app/searchIndex.ts` (durchsuchbarer Index über alle
  Module) + `app/NavigationContext.tsx` (moduleübergreifende
  Navigations-Anfrage, die jedes Modul selbst konsumiert).

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

### ✅ Elektroden-Platzierungstrainer (im EKG-Modul, Tab „Elektroden legen“)

- Interaktiver **SVG-Körper**, auf dem du die Elektroden per Maus/Touch an
  die richtige Stelle ziehst — kein Foto/Bildmaterial nötig.
- **Monitoring-EKG (3-/4-Kanal, „Ampelschema“)**: Ganzkörperansicht, 4
  Positionen am Rumpf.
- **12-Kanal-EKG**: eigener, gezoomter **Brustkorb-Umriss** mit
  nummerierten Rippen, schattierten Interkostalraum-Bändern und
  durchgehenden Leitlinien (Sternal-/Medioklavikular-/Axillarlinien). Bei
  V1, V2, V4-V6 wird **zweidimensional** geprüft (richtiger
  Interkostalraum **und** richtige Linie), nicht nur "nah genug" an einem
  Punkt — trainiert die echte Anlegetechnik ("Rippe zählen, Linie finden").
- **Lernen**-Modus zeigt alle Positionen beschriftet an, **Üben**-Modus
  lässt dich die Elektroden platzieren (Sofort-Feedback, Versuchszähler).

### ✅ Medikamente (SAA/BPR) — Nachschlagewerk

- Durchsuchbare Referenz mit **29 Medikamenten** (Wirkstoff, Konzentration,
  Wirkung, Indikationen, Kontraindikationen, Dosierung, Nebenwirkungen,
  Besonderheiten), gruppiert nach Kategorie. Die kurze "Wirkung"-Erklärung
  (was macht das Mittel im Körper) ist allgemeines Pharmakologie-Wissen,
  ergänzt neben den PDF-Originalfeldern.
- Inhaltlich extrahiert aus [`docs/saa_bpr_2025.pdf`](docs/saa_bpr_2025.pdf)
  ("Standard-Arbeitsanweisungen und Behandlungspfade Rettungsdienst 2025",
  6-Länder-Arbeitsgruppe ÄLRD).
- ⚠️ **Scope-Hinweis:** Diese SAA/BPR beschreiben delegierbare invasive
  Maßnahmen und Medikamentengaben für **Notfallsanitäter:innen (NotSan)**
  mit ärztlicher Delegation — **nicht** den Kompetenzbereich der (kürzeren)
  Rettungssanitäter-Ausbildung (RS). Das Modul ist bewusst als
  **Nachschlage-/Kontextwissen** gedacht (verstehen, was NA/NotSan tun und
  warum), nicht als 1:1-RS-Prüfungsstoff. Die App ist damit auch allgemein
  als **Kontext-Plattform** angelegt: eigene Quell-PDFs unter `docs/`
  ablegen und daraus weitere Module/Inhalte extrahieren, siehe
  [Eigene Inhalte einpflegen](#eigene-inhalte-einpflegen--korrigieren).

### ✅ Algorithmen (ABCDE, BLS/ALS)

- 9 Einträge aus den BPR-Abschnitten „Herangehensweise" und
  „Kreislaufstillstand": ABCDE-Herangehensweise/-Instabilitäten, WASB & GCS,
  SAMPLER, OPQRST, Atemwegsmanagement, Patientenanmeldung (ZOABCDE),
  Übergabe (SINNHAFT), Reanimation Erwachsene (BLS→ALS) und Kinder (PLS).
- Jeder einzelne Handlungsschritt trägt intern sein eigenes `minLevel`-
  Datenfeld (z. B. Basismaßnahmen der Reanimation vs. EGA/i.v.-Zugang/
  Medikamentengabe erst ab Notfallsanitäter) — dient nur der Datenmodell-
  Struktur, wird aber nicht mehr separat angezeigt.
- Laien-Basismaßnahmen (Reanimation) sind allgemeines BLS-Wissen und per
  Quellenhinweis von den PDF-Inhalten (NotSan-fokussiert) abgegrenzt.

### ✅ Medikamente vorbereiten & sicher verabreichen

Eigenständiges Modul, eigener Sidebar-Tab in der „Rettungssanitäter"-Gruppe
(vorher fälschlich als Unterpunkt in Algorithmen einsortiert).

- 6-R-Regel, Sicherheitsprinzipien (DIVI-ISO-Aufkleber, 4-Augen-Prinzip,
  Doppelkontrolle, gesicherte Kommunikation) und der
  Standardvorgehen-Ablauf direkt aus SAA/BPR S. 40–41, plus die allgemeine
  Verdünnungsformel (C1×V1 = C2×V2) mit zwei PDF-geprüften
  Praxisbeispielen (Epinephrin, Naloxon).

### ✅ Anatomie & Physiologie

- 5 Themen: Herz-Kreislauf-System (inkl. Erregungsleitungssystem — direkte
  Grundlage fürs EKG-Modul), Atmungssystem, Skelett & Muskulatur,
  Nervensystem (inkl. vegetatives NS als Grundlage für Medikamentenwirkungen
  wie Adrenalin/Atropin), Vitalparameter-Normwerte nach Altersgruppe als
  Nachschlagetabelle.
  Allgemeines anatomisch-physiologisches Grundlagenwissen, keine SAA/BPR-Quelle.

### ✅ Werkzeuge & Scores

Fest oben in der Sidebar angepinnt (direkt unter der Startseite, nicht in
einer Stufen-Gruppe) — die Werkzeuge sind stufenübergreifend gleich
relevant.

- 6 interaktive Rechner: **GCS** (Klick-Rechner, live Summe + Schweregrad),
  **Schmerzskala NRS/VAS** (0–10-Regler, inkl. Cross-Referenz zu den
  Medikamente-Schwellenwerten), **APGAR-Score** (Neugeborenen-Beurteilung),
  **Neuner-Regel** (Verbrennungsfläche, Erwachsene/Kind umschaltbar +
  Handflächenregel), **NACA-Score** (Einsatzschwere-Referenzliste),
  **Verdünnungsrechner** (Ausgangs-/Zielkonzentration + Zielvolumen →
  benötigte Mengen, mit PDF-geprüften Beispielen).
- Bewusst nicht enthalten: ein Medikamenten-Dosisrechner nach Körpergewicht
  — die Dosierungsangaben der 29 SAA/BPR-Medikamente sind uneinheitlicher
  Freitext, ein automatisches Auslesen wäre bei diesem hochsensiblen Thema
  ein zu hohes Fehlerrisiko (siehe CHANGELOG 0.8.0).

### ✅ Traumatologie & Verbandslehre

- 7 Themen: Frakturlehre, Wundversorgung, Verbandslehre (Druckverband/
  Dreiecktuch/Schienung), Wirbelsäulentrauma & Immobilisation,
  Thorax-/Abdominaltrauma, Verbrennungen, Polytrauma & kritische
  Blutungen (Tourniquet). Allgemeines rettungsdienstliches
  Grundlagenwissen, keine SAA/BPR-Quelle.
- Die Verbandslehre enthält stilisierte SVG-Beispiel-Illustrationen
  (Druckverband, Armtragetuch, Kopfverband) statt Fotos — schnell
  umsetzbar, keine Lizenzfragen. Bei Bedarf später ersetzbar durch eigene
  Fotos (z. B. aus Kursunterlagen).

### ✅ Sanitätsdienst (Veranstaltungsdienst)

- 5 Themen in 3 Kategorien: **Einsatzorganisation** (Sanitätswachdienst-
  Organisation, MANV & Sichtung/Triage mit Ampelschema und
  Sichtungsalgorithmus angelehnt an START), **Kommunikation**
  (Funkalphabet nach DIN 5009/ICAO & Funkdisziplin), **Medizinische
  Besonderheiten** (typische Veranstaltungs-Verletzungsmuster wie
  Kreislaufkollaps und Crowd-Crush-Verletzungen, Hygiene &
  Infektionsschutz).
- Allgemeines Grundlagenwissen zum Sanitäts-/Veranstaltungsdienst, keine
  SAA/BPR-Quelle — organisations- und bundeslandspezifische Abweichungen
  (Sichtungsschema, Funkkanäle, Hygieneplan) sind je Eintrag vermerkt.

### ✅ Internistische Notfälle

- 10 Themen in 5 Kategorien: **Herz & Kreislauf** (Herzinfarkt/ACS,
  Lungenödem), **Neurologisch** (Schlaganfall mit FAST-Test,
  Krampfanfall/Epilepsie), **Stoffwechsel & Allergie** (diabetische
  Notfälle, Allergie/Anaphylaxie), **Abdomen & Vergiftungen** (akutes
  Abdomen, Intoxikationen inkl. Alkohol/Drogen), **Umweltbedingte
  Notfälle** (Hitzenotfälle, Unterkühlung & Erfrierung).
- Allgemeines rettungsdienstliches Grundlagenwissen, keine SAA/BPR-Quelle.
  Ärztlich delegierte Maßnahmen (z. B. ASS/Nitro, Glucose i.v., Adrenalin,
  Naloxon) sind je Eintrag markiert und verweisen auf das
  Medikamente-Modul.

### ✅ Pädiatrie & Geburtshilfe

- 4 Themen in 2 Kategorien: **Pädiatrie** (Besonderheiten pädiatrischer
  Notfälle — Anatomie/Physiologie, altersabhängige Vitalwerte (Verweis auf
  Anatomie-Modul), Dosierungsbesonderheiten (bewusst ohne Zahlenwerte,
  Verweis auf Medikamente-Modul), Kommunikation, Gewichtsschätzung, Verweis
  auf die Kinderreanimation im Algorithmen-Modul), **Geburtshilfe**
  (Normale Geburt, Notgeburt-Ablauf für den Sanitätsdienst, Erstversorgung
  Neugeborenes & APGAR-Score).
- Allgemeines rettungsdienstliches Grundlagenwissen, keine SAA/BPR-Quelle.
  Der APGAR-Rechner selbst bleibt im Werkzeuge-Modul, hier nur der
  fachliche Hintergrund und Verweis darauf.

### ✅ Psychiatrische Notfälle & Kommunikation

- 5 Themen in 4 Kategorien: **Psychiatrische Notfälle** (Erregungszustände
  & Deeskalation, Suizidalität), **Kommunikation** (Gesprächsführung mit
  Patienten & Angehörigen), **Sterben & Todesfeststellung** (sichere/
  unsichere Todeszeichen, rechtlicher Rahmen der Todesfeststellung als
  RS), **Großschadenslagen** (Psychische Erste Hilfe / PSNV-
  Grundprinzipien).
- Allgemeines rettungsdienstliches Grundlagenwissen, keine SAA/BPR-Quelle.
  Bundeslandspezifische rechtliche Rahmenbedingungen (Unterbringung gegen
  den eigenen Willen, Todesfeststellung) sind je Eintrag vermerkt.

### ✅ Rettungstechnik & Gerätekunde

- 6 Themen in 4 Kategorien: **Transport & Trageformen** (Rautekgriff,
  Tragestuhl, Schaufeltrage, Vakuummatratze), **Lagerungsarten** (stabile
  Seitenlage, Schocklage, Oberkörperhochlagerung, Knierolle — jeweils mit
  Indikation), **Atemwege & Beatmung** (Sauerstoffgabe, Absaugung &
  Atemwegshilfen mit Guedel-/Wendl-Tubus, Beatmungsbeutel),
  **Gerätekunde** (Notfallrucksack-Inhalt & Vollständigkeitsprüfung).
- Allgemeines rettungsdienstliches Grundlagenwissen, keine SAA/BPR-Quelle.
  Konkrete Geräte und Checklisten können je nach Organisation/Fahrzeugtyp
  abweichen.

### 🔜 Geplant

Aktuell keine Platzhalter-Module offen — siehe `docs/vorgaben_und_inhalte.txt`
für weitere Ideen (Rechtliche Grundlagen, generalisierter Quiz-Modus, …).

## Architektur

```
src/
  app/
    registry.tsx         # zentrale Liste aller Lernmodule + ModuleCategory (Sidebar-Gruppierung)
    levels.ts             # QualificationLevel-Typ (nur noch inertes minLevel-Datenfeld je Inhalt)
    NavigationContext.tsx    # modulübergreifende "spring zu Modul X, Eintrag Y"-Anfrage
    searchIndex.ts            # durchsuchbarer Index über alle Module
    GlobalSearch.tsx           # Suchfeld + Ergebnisliste in der Sidebar
    roadmap.ts                # kuratierter "Fahrplan" je Themenkategorie (nur Links, keine Inhalte)
    HomePage.tsx               # Startseite: Modul-Karten + Fahrplan + EKG-Fortschritt
  components/
    ConfirmButton.tsx      # In-App-Bestätigung statt window.confirm (Tauri-WebView-sicher)
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
      EkgModule.tsx         # Tab-Container (Lernen/Elektroden/Quiz/Fortschritt)
      electrodes/
        types.ts             # Datenmodell für Elektrodenpunkte/-sets (inkl. ElectrodeHitZone)
        data.ts               # Monitoring- + 12-Kanal-Set (Positionen, Landmarken, Hit-Zonen)
        layout.ts              # Label-Platzierung (links/rechts) im SVG
        BodyOutline.tsx        # SVG-Ganzkörperumriss (fürs Monitoring-Set)
        ThoraxOutline.tsx       # gezoomter Brustkorb mit ICR-Bändern + Leitlinien (fürs 12-Kanal-Set)
        ElectrodeStudy.tsx      # Lernen: alle Positionen beschriftet
        ElectrodePlacement.tsx  # Üben: Drag-and-drop-Platzierung + Zeile/Spalte-Prüfung
        ElectrodesTab.tsx        # Set-/Modus-Umschalter
    medikamente/
      types.ts           # Datenmodell für Medikamente
      medications.json   # aus docs/saa_bpr_2025.pdf extrahierte Rohdaten
      wirkung.ts          # ergänzte Kurz-Wirkbeschreibungen (nicht aus dem PDF)
      data.ts             # lädt/typisiert medications.json + wirkung.ts
      MedikamenteModule.tsx  # Kategorie-Liste + Detailansicht
    algorithmen/
      types.ts           # Datenmodell (AlgorithmEntry/-Section/-Step, je mit minLevel)
      data.ts             # 9 Einträge aus BPR "Herangehensweise" + "Kreislaufstillstand"
      AlgorithmenModule.tsx  # Detailansicht mit Schritten je Sektion
    medikamentenvorbereitung/
      types.ts           # Datenmodell (MedVorbereitungEntry/-Section/-Step, je mit minLevel)
      data.ts             # 6-R-Regel, Sicherheitsprinzipien, Standardvorgehen, Verdünnungsformel
      MedikamentenvorbereitungModule.tsx  # Detailansicht (Einzelthema, keine Liste)
    anatomie/
      types.ts           # Datenmodell (AnatomieTopic/-Section/-Fact, je mit minLevel)
      data.ts             # 5 Themen: Herz-Kreislauf, Atmung, Skelett/Muskulatur, Nervensystem, Vitalparameter
      AnatomieModule.tsx  # Detailansicht mit Fakten je Sektion
    werkzeuge/
      data.ts             # Tool-Registry (GCS/Schmerzskala/APGAR/Neuner-Regel/NACA)
      GcsCalculator.tsx, SchmerzSkala.tsx, ApgarCalculator.tsx,
      NeunerRegel.tsx, NacaScore.tsx  # je ein interaktiver Rechner
      WerkzeugeModule.tsx # Liste + aktiver Rechner
    traumatologie/
      types.ts           # Datenmodell (TraumaTopic/-Section/-Fact, je mit minLevel)
      data.ts             # 7 Themen: Frakturen, Wundversorgung, Verbandslehre, schwere
                          #   Verletzungen, Verbrennungen, Polytrauma/Blutstillung
      TraumatologieModule.tsx  # Detailansicht mit Fakten je Sektion
    sanitaetsdienst/
      types.ts           # Datenmodell (SanitaetsdienstTopic/-Section/-Fact, je mit minLevel)
      data.ts             # 5 Themen: Wachdienst-Organisation, MANV/Sichtung, Funkalphabet,
                          #   Veranstaltungs-Verletzungsmuster, Hygiene & Infektionsschutz
      SanitaetsdienstModule.tsx  # Detailansicht mit Fakten je Sektion
    internistischenotfaelle/
      types.ts           # Datenmodell (InternistischeNotfaelleTopic/-Section/-Fact, je mit minLevel)
      data.ts             # 10 Themen: Herz & Kreislauf, Neurologisch, Stoffwechsel & Allergie,
                          #   Abdomen & Vergiftungen, Umweltbedingte Notfälle
      InternistischeNotfaelleModule.tsx  # Detailansicht mit Fakten je Sektion
    paediatrie/
      types.ts           # Datenmodell (PaediatrieTopic/-Section/-Fact, je mit minLevel)
      data.ts             # 4 Themen: Pädiatrie (Besonderheiten), Geburtshilfe (Geburt,
                          #   Notgeburt, Neugeborenen-Erstversorgung & APGAR)
      PaediatrieModule.tsx  # Detailansicht mit Fakten je Sektion
    psychiatrienotfaelle/
      types.ts           # Datenmodell (PsychiatrieNotfaelleTopic/-Section/-Fact, je mit minLevel)
      data.ts             # 5 Themen: Psychiatrische Notfälle, Kommunikation,
                          #   Sterben & Todesfeststellung, Großschadenslagen
      PsychiatrieNotfaelleModule.tsx  # Detailansicht mit Fakten je Sektion
    rettungstechnik/
      types.ts           # Datenmodell (RettungstechnikTopic/-Section/-Fact, je mit minLevel)
      data.ts             # 6 Themen: Trageformen, Lagerungsarten, Atemwege & Beatmung,
                          #   Gerätekunde (Notfallrucksack)
      RettungstechnikModule.tsx  # Detailansicht mit Fakten je Sektion
  App.tsx                 # App-Shell: nach Thema gruppierte Sidebar, globale Suche, aktives Modul
src-tauri/                # Rust-Backend (Tauri), native Fenster/Bundling
docs/                    # Quell-PDFs/Unterlagen, aus denen Inhalte extrahiert werden
```

### Eigene Inhalte einpflegen / korrigieren

- EKG-Rhythmen: `src/modules/ekg/rhythms.ts` — jeder Eintrag hat Merkmale,
  klinische Hinweise und die Parameter für die Kurvengenerierung
  (`gen`-Feld, siehe `types.ts` für die möglichen Rhythmus-Arten).
- Elektroden-Positionen: `src/modules/ekg/electrodes/data.ts` — Koordinaten
  beziehen sich auf das `viewBox="0 0 400 750"` des Körperdiagramms in
  `BodyOutline.tsx`.
- Medikamente: `src/modules/medikamente/medications.json` direkt anpassen,
  oder eigene Quell-PDFs unter `docs/` ablegen und wie unten beschrieben neu
  extrahieren.
- Wenn du eigene Skripten/Fragenkataloge hast: am besten als eigene
  Modul-Datenquelle im gleichen Stil wie `rhythms.ts`/`medications.json`
  anlegen.

### Eigene PDFs als Wissensbasis nutzen

Die Medikamente stammen aus `docs/saa_bpr_2025.pdf` und wurden per Skript
(PyMuPDF) automatisiert in `medications.json` extrahiert, nicht händisch
abgetippt — das minimiert Übertragungsfehler bei sicherheitsrelevanten
Dosierungen. Um eigene Unterlagen (z. B. eine andere/aktuellere
SAA/BPR-Version, ein Fragenkatalog-PDF) als Quelle zu nutzen:

1. PDF unter `docs/` ablegen.
2. Text extrahieren (z. B. mit `pymupdf`/`pdftotext`) und Struktur/Kapitel
   sichten.
3. Passendes Extraktionsskript schreiben (Vorlage: die Parser, die
   `medications.json` erzeugt haben — nicht Teil des Repos, da einmalig
   ausgeführt), Ergebnis als JSON/TS in ein neues oder bestehendes Modul
   einpflegen.
4. Zahlenwerte (Dosierungen!) stichprobenartig gegen das Original-PDF
   gegenprüfen, bevor du dich darauf verlässt.

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
