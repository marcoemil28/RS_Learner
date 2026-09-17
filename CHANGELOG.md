# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier dokumentiert.

Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
Versionierung angelehnt an [Semantic Versioning](https://semver.org/lang/de/)
(solange die App nicht veröffentlicht ist, sind Breaking Changes zwischen
`0.x`-Versionen jederzeit möglich).

## [Unreleased]

Nichts geplant Offenes aktuell außerhalb der Roadmap in der README.

## [0.23.0] – 2026-09-17

### Hinzugefügt

- **Favoriten/Lesezeichen** (aus `docs/vorgaben_und_inhalte.txt` Abschnitt
  3, „Favoriten/Lesezeichen"): ☆-Stern-Button neben dem Titel in der
  Detailansicht der meisten Themenmodule (Algorithmen, Anatomie,
  Traumatologie, Medikamente, Sanitätsdienst, Internistische Notfälle,
  Pädiatrie & Geburtshilfe, Psychiatrische Notfälle & Kommunikation,
  Rettungstechnik & Gerätekunde, Rechtliche Grundlagen, EKG-Rhythmen) —
  markiert einen Eintrag zum schnellen Wiederfinden.
  - Neue Sektion „Deine Favoriten" auf der Startseite, direkt oberhalb des
    Fahrplans, mit Klick-Navigation zum jeweiligen Eintrag.
  - Persistiert in `localStorage` (`src/app/favorites.ts`), modulübergreifend
    synchronisiert über ein einfaches Pub/Sub (kein zusätzlicher React-
    Context nötig).
  - Bewusst nicht enthalten: Werkzeuge & Scores (Rechner, kein
    "Nachschlage-Eintrag") und Glossar (bereits als durchsuchbare
    Kurzliste konzipiert) sowie das Einzelthema
    "Medikamente vorbereiten & verabreichen" (redundant zum direkten
    Modul-Link auf der Startseite).

## [0.22.0] – 2026-09-17

### Hinzugefügt

- **Hoher-Kontrast-Modus** (aus `docs/vorgaben_und_inhalte.txt` Abschnitt 3,
  „Dark Mode / High-Contrast für schlechte Lichtverhältnisse im Einsatz"):
  Umschalter unten in der Sidebar. Die App ist standardmäßig bereits
  dunkel gestaltet — der neue Modus geht für schlechte Lichtverhältnisse
  (grelle Sonne, Blendung) einen Schritt weiter: reines Schwarz als
  Hintergrund, kräftigere Akzentfarben, dickere Rahmen und größere
  Grundschrift. Einstellung wird lokal gespeichert (`localStorage`) und
  bleibt über Neustarts erhalten.

## [0.21.0] – 2026-09-17

### Hinzugefügt

- **Neues Modul „Glossar & Abkürzungen"** (aus `docs/vorgaben_und_inhalte.txt`
  Abschnitt 3, „Tag-/Verlinkungssystem"), fest oben in der Sidebar
  angepinnt wie Werkzeuge & Scores: ca. 40 RS-typische Abkürzungen (SAA,
  BPR, GCS, NACA, MANV, SAMPLER, ZOABCDE, SINNHAFT, DIVI, PSNV, ROSC, u.
  v. m.) mit Bedeutung, teils mit kurzer Erklärung und Verweis auf das
  jeweilige Fachmodul. Direkt durchsuchbar per Eingabefeld im Modul selbst
  sowie über die globale Suche.

## [0.20.0] – 2026-09-17

### Hinzugefügt

- **Neues Modul „Rechtliche & organisatorische Grundlagen"** (aus
  `docs/vorgaben_und_inhalte.txt` Abschnitt 2), letztes offenes
  Themenmodul aus der Liste — erscheint in der Sidebar unter „Einsatz &
  Organisation": 5 Themen in 3 Kategorien —
  - Grundrechte & Pflichten: Garantenstellung & unterlassene Hilfeleistung,
    Schweigepflicht, Patientenverfügung/-wille & mutmaßlicher Wille
  - Delegation & Kompetenz: Delegation ärztlicher Maßnahmen — Abgrenzung
    RS vs. NotSan
  - Dokumentation: Einsatzprotokoll & DIVI-Protokoll
  - Allgemeines rechtliches Grundlagenwissen, keine SAA/BPR-Quelle und
    keine Rechtsberatung — bundeslandspezifische Abweichungen sind je
    Eintrag vermerkt.
- Fahrplan und Suchindex um die neuen Inhalte ergänzt.
- Damit sind alle Themenmodule aus `docs/vorgaben_und_inhalte.txt`
  Abschnitt 2 umgesetzt. Offen bleibt aus der Priorisierung (Abschnitt 6)
  noch der generalisierte Quiz-Modus sowie die cross-cutting Features aus
  Abschnitt 3 (Glossar, Favoriten/Notizen, Checklisten-Modus, Cheat-Sheet,
  Dark Mode/High-Contrast).

## [0.19.0] – 2026-09-17

### Hinzugefügt

- **Neues Modul „Rettungstechnik & Gerätekunde"** (aus
  `docs/vorgaben_und_inhalte.txt` Abschnitt 2), erscheint in der Sidebar
  unter „Diagnostik & Training": 6 Themen in 4 Kategorien —
  - Transport & Trageformen: Rautekgriff, Tragestuhl, Schaufeltrage,
    Vakuummatratze
  - Lagerungsarten: stabile Seitenlage, Schocklage, Oberkörperhochlagerung,
    Knierolle, jeweils mit Indikation
  - Atemwege & Beatmung: Sauerstoffgabe (Systeme/Flussraten), Absaugung &
    Atemwegshilfen (Guedel-/Wendl-Tubus), Beatmungsbeutel
  - Gerätekunde: Notfallrucksack-Inhalt & Vollständigkeitsprüfung
  - Allgemeines rettungsdienstliches Grundlagenwissen, keine SAA/BPR-Quelle.
- Fahrplan und Suchindex um die neuen Inhalte ergänzt.

## [0.18.0] – 2026-09-17

### Hinzugefügt

- **Neues Modul „Psychiatrische Notfälle & Kommunikation"** (aus
  `docs/vorgaben_und_inhalte.txt` Abschnitt 2), erscheint in der Sidebar
  unter „Krankheitsbilder & Algorithmen": 5 Themen in 4 Kategorien —
  - Psychiatrische Notfälle: Erregungszustände & Deeskalation, Suizidalität
  - Kommunikation: Gesprächsführung mit Patienten & Angehörigen
  - Sterben & Todesfeststellung: sichere/unsichere Todeszeichen,
    rechtlicher Rahmen der Todesfeststellung als RS
  - Großschadenslagen: Psychische Erste Hilfe (PSNV-Grundprinzipien)
  - Allgemeines rettungsdienstliches Grundlagenwissen, keine SAA/BPR-Quelle.
    Bundeslandspezifische rechtliche Rahmenbedingungen (Unterbringung,
    Todesfeststellung) sind je Eintrag vermerkt.
- Fahrplan und Suchindex um die neuen Inhalte ergänzt.

## [0.17.1] – 2026-09-17

### Hinzugefügt

- **Dosierungsbesonderheiten bei Kindern** als eigener Abschnitt im
  Pädiatrie-Modul ergänzt (Thema „Besonderheiten pädiatrischer Notfälle")
  — bewusst ohne konkrete Zahlenwerte (Verweis auf Medikamente-Modul/SAA-
  BPR), da eine gewichtsbasierte Kinderdosierung zu hochsensibel für eine
  auswendig gelernte Faustregel ist (analog zur bestehenden
  Dosisrechner-Entscheidung, siehe CHANGELOG 0.8.0). Ergänzt den bereits
  vorhandenen Verweis auf die altersabhängigen Vitalwerte im
  Anatomie-Modul.

## [0.17.0] – 2026-09-17

### Geändert

- **Sidebar-/Fahrplan-Gruppierung von Qualifikationsstufe auf Thema
  umgestellt**: Statt „Sanitätshelfer/Rettungssanitäter/Notfallsanitäter"
  gruppieren Sidebar und Startseiten-Fahrplan jetzt nach fünf
  Themenkategorien — **Grundlagenwissen**, **Krankheitsbilder &
  Algorithmen**, **Medikamente**, **Diagnostik & Training**, **Einsatz &
  Organisation** (neues `ModuleCategory`-Feld in `registry.tsx`, ersetzt
  `minLevel` auf Modulebene). Grund: drei Kompetenzstufen als
  Navigationsachse waren unnötig komplex, wenn Inhalte ohnehin für alle
  einsehbar sind — Gruppierung nach Thema ist einfacher zu überblicken.
  Die globale Suche zeigt entsprechend die Themenkategorie statt der
  Stufe an.
- `QualificationLevel` bleibt als internes `minLevel`-Datenfeld auf
  einzelnen Inhalten bestehen (aktuell ohne Anzeige-Auswirkung), wird aber
  nicht mehr für Navigation/Gruppierung verwendet.

### Hinzugefügt

- **Neues Modul „Pädiatrie & Geburtshilfe"** (aus
  `docs/vorgaben_und_inhalte.txt` Abschnitt 2), erscheint in der Sidebar
  unter „Krankheitsbilder & Algorithmen": 4 Themen in 2 Kategorien —
  - Pädiatrie: Besonderheiten pädiatrischer Notfälle (Anatomie/Physiologie,
    Kommunikation, Gewichtsschätzung, Verweis auf Kinderreanimation im
    Algorithmen-Modul)
  - Geburtshilfe: Normale Geburt, Notgeburt-Ablauf für den Sanitätsdienst,
    Erstversorgung Neugeborenes & APGAR-Score (Verweis auf den
    APGAR-Rechner im Werkzeuge-Modul)
  - Allgemeines rettungsdienstliches Grundlagenwissen, keine SAA/BPR-Quelle.
- Fahrplan und Suchindex um die neuen Inhalte ergänzt.

## [0.16.0] – 2026-09-17

### Hinzugefügt

- **Neues Modul „Internistische Notfälle"** (aus `docs/vorgaben_und_inhalte.txt`
  Abschnitt 2), erscheint in der Sidebar unter „Sanitätshelfer": 10 Themen
  in 5 Kategorien —
  - Herz & Kreislauf: Herzinfarkt (ACS), Lungenödem
  - Neurologisch: Schlaganfall (FAST-Test), Krampfanfall/Epilepsie
  - Stoffwechsel & Allergie: Diabetische Notfälle, Allergie/Anaphylaxie
  - Abdomen & Vergiftungen: Akutes Abdomen, Intoxikationen
    (Alkohol/Drogen)
  - Umweltbedingte Notfälle: Hitzenotfälle, Unterkühlung & Erfrierung
  - Allgemeines rettungsdienstliches Grundlagenwissen, keine SAA/BPR-Quelle.
    Ärztlich delegierte Maßnahmen (ASS/Nitro, Glucose i.v., Adrenalin,
    Naloxon) sind als solche markiert und verweisen auf das
    Medikamente-Modul.
- Fahrplan und Suchindex um die neuen Inhalte ergänzt.

## [0.15.1] – 2026-09-17

### Behoben

- **Sprechfunk-Ablauf im Sanitätsdienst-Modul korrigiert**: Reihenfolge war
  falsch angegeben (eigener Rufname zuerst) — korrekt ist erst die
  Gegenstelle, dann "von", dann der eigene Rufname (z. B. "Wachleitung von
  Sani 3"). Außerdem klargestellt, dass "kommen" nur die Übergabe an die
  Gegenstelle markiert und nicht bei jeder einzelnen Durchsage innerhalb
  eines laufenden Gesprächs wiederholt werden muss — "Ende" beendet den
  gesamten Sprechfunkverkehr.

## [0.15.0] – 2026-09-17

### Hinzugefügt

- **Neues Modul „Sanitätsdienst (Veranstaltungsdienst)"** (Priorisierungspunkt 5
  aus `docs/vorgaben_und_inhalte.txt`), erscheint in der Sidebar unter
  „Sanitätshelfer": 5 Themen in 3 Kategorien —
  - Einsatzorganisation: Sanitätswachdienst-Organisation (Wachaufbau,
    Materialdepot, Funkkonzept, Einsatzabschnitte), MANV & Sichtung
    (Ampelschema, Sichtungsalgorithmus angelehnt an START)
  - Kommunikation: Funkalphabet (DIN 5009/ICAO) & Funkdisziplin
  - Medizinische Besonderheiten: Typische Veranstaltungs-Verletzungsmuster
    (Kreislaufkollaps, Crowd-Crush-Verletzungen, Alkohol-/Hitzeintoxikation),
    Hygiene & Infektionsschutz (Basishygiene, PSA, Nadelstichverletzung)
  - Allgemeines Grundlagenwissen, keine SAA/BPR-Quelle — organisations- und
    bundeslandspezifische Abweichungen (Sichtungsschema, Funkkanäle,
    Hygieneplan) sind im jeweiligen Quellenhinweis vermerkt.
- Fahrplan und Suchindex um die neuen Inhalte ergänzt.

## [0.14.0] – 2026-09-17

### Entfernt

- **"Meine Qualifikation"-Selector** in der Sidebar (inkl. `LevelContext`)
  komplett entfernt — nicht benötigt.
- Damit einhergehend auch **"ab \<Stufe\>"-Badges und die
  Abblendung von Inhalten über der gewählten Stufe** (`LevelBadge`,
  `aboveLevelClass`, `isAboveSelected`) aus allen Modulen sowie dem
  Fahrplan auf der Startseite entfernt.
- Die Sidebar-Gruppierung der Module nach Einstiegsstufe (Sanitätshelfer/
  Rettungssanitäter/Notfallsanitäter) bleibt zur Orientierung bestehen —
  betroffen war nur die personalisierte Auswahl/Anzeige, nicht die
  strukturelle Einteilung.

## [0.13.0] – 2026-09-17

### Korrigiert

- **0.12.1 zurückgerollt**: Die dort eingeführten, permanent sichtbaren
  Stufen-Badges waren nach Rückmeldung unübersichtlich ("steht fast überall
  Rettungssanitäter") — `LevelBadge` zeigt Badges wieder nur an, wenn eine
  Qualifikationsstufe explizit im Filter gewählt ist (Ursprungsverhalten).
  Die zusätzlichen Badges in den Seitenlisten von Algorithmen, Anatomie,
  Traumatologie und Werkzeuge wurden ebenfalls entfernt.
- **Eigentliche Ursache der ursprünglichen Beschwerde behoben**: „Medikamente
  vorbereiten & sicher verabreichen" gehörte inhaltlich nicht in die
  SanH/Basis-lastige Kategorie „Medikamentengabe" des Algorithmen-Moduls.
  Der Eintrag ist jetzt ein **eigenständiges Modul** und erscheint als
  eigener Tab in der Sidebar unter „Rettungssanitäter" (statt versteckt
  als Unterpunkt in Algorithmen). Kategorie „Medikamentengabe" aus dem
  Algorithmen-Modul entfernt, da sie dadurch leer wurde. Fahrplan,
  Suchindex und der Querverweis im Verdünnungsrechner wurden entsprechend
  aktualisiert.

## [0.12.1] – 2026-09-17

### Behoben

- **Kritischer Bug im Stufen-Badge-System**: `LevelBadge` zeigte "ab
  Rettungssanitäter"/"ab Notfallsanitäter" nur an, wenn explizit eine
  Qualifikationsstufe im Filter unten links gewählt war. Im Standardzustand
  "Alle anzeigen" erschien **nirgendwo im gesamten App** ein Badge — dadurch
  sah z. B. "Medikamente vorbereiten & sicher verabreichen" (RS) optisch
  identisch aus wie SanH-Inhalte wie "ABCDE – Herangehensweise", ohne jede
  Kennzeichnung. Badges sind jetzt eine **permanente Einordnung**: sie
  erscheinen immer für Inhalte oberhalb der Basisstufe (SanH), unabhängig
  vom gewählten Filter. Die Abblendung (`above-level`) bleibt weiterhin
  filterabhängig.
- Badges werden jetzt zusätzlich direkt in den Seitenlisten der Module
  Algorithmen, Anatomie, Traumatologie und Werkzeuge angezeigt (vorher nur
  in der Detailansicht nach dem Reinklicken) — Stufe ist so auf einen
  Blick erkennbar, ohne jeden Eintrag einzeln öffnen zu müssen.

## [0.12.0] – 2026-09-17

### Hinzugefügt

- **Neuer Algorithmen-Eintrag „Medikamente vorbereiten & sicher verabreichen"**
  (Kategorie „Medikamentengabe", minLevel RS) direkt aus bisher ungenutzten
  SAA/BPR-Seiten 40–41: 6-R-Regel, Sicherheitsprinzipien (DIVI-ISO-Aufkleber,
  4-Augen-Prinzip, Doppelkontrolle, gesicherte Kommunikation),
  Standardvorgehen-Ablauf sowie die allgemeine Verdünnungsformel
  (C1×V1 = C2×V2, Pharmazie-Grundwissen, als solches gekennzeichnet) mit
  zwei aus dem PDF verifizierten Praxisbeispielen (Epinephrin, Naloxon).
- **Verdünnungsrechner** im Werkzeuge & Scores-Modul: berechnet aus
  Ausgangskonzentration, Zielkonzentration und Zielvolumen die benötigte
  Menge Ausgangslösung + Verdünnungsmittel. Mit zwei anklickbaren, gegen
  das SAA/BPR-PDF geprüften Beispielen (Epinephrin bei instabiler
  Bradykardie, Naloxon-Verdünnung). Bewusst als reine Rechenhilfe für eine
  bereits vorgegebene Zielkonzentration konzipiert, nicht als Dosis-
  Empfehlung.

### Geändert

- **Sidebar-Struktur**: "Werkzeuge & Scores" ist jetzt fest oben angepinnt
  (direkt unter "Startseite"), statt in der "Sanitätshelfer"-Gruppe zu
  stecken — die Werkzeuge sind stufenübergreifend gleich relevant.
  Registry-Modell um `pinned`-Flag erweitert.

## [0.11.0] – 2026-09-17

### Hinzugefügt

- **Stilisierte Verbands-Illustrationen** im Traumatologie-Modul (statt der
  ursprünglich angedachten interaktiven Übung — nach Rückmeldung reichen
  einfache Beispiel-Diagramme): Druckverband am Unterarm, Dreiecktuch als
  Armtragetuch, Dreiecktuch als Kopfverband
  (`modules/traumatologie/illustrations/`). Reine SVG-Schemazeichnungen im
  Look der bestehenden EKG-Elektroden-Diagramme, keine Fotos — dafür sofort
  umsetzbar und ohne Lizenzfragen. Jede Illustration ist klar als
  "Stilisiertes Schema, kein Foto" gekennzeichnet.
- `TraumaSection` kann jetzt optional eine `illustration`-Komponente tragen
  (neues Feld im Datenmodell), gerendert oberhalb der zugehörigen
  Stichpunkte.
- Falls die Diagramme nicht überzeugen: Umstieg auf einen Platzhalter-
  Mechanismus für eigene Fotos (z. B. aus Kursunterlagen) ist als nächster
  Schritt vorgemerkt, sobald gewünscht.

## [0.10.0] – 2026-09-17

### Hinzugefügt

- **Traumatologie & Verbandslehre-Modul** (neu, Priorität 4 aus
  `docs/vorgaben_und_inhalte.txt`) mit 7 Themen: Frakturlehre,
  Wundversorgung, Verbandslehre (Druckverband/Dreiecktuch/Schienung),
  Wirbelsäulentrauma & Immobilisation, Thorax-/Abdominaltrauma,
  Verbrennungen (mit Verweis auf die Neuner-Regel im Werkzeuge-Modul),
  Polytrauma & kritische Blutungen (Tourniquet). Allgemeines
  rettungsdienstliches Grundlagenwissen, keine SAA/BPR-Quelle.
- In den "Fahrplan" auf der Startseite eingehängt (SanH: Frakturlehre/
  Wundversorgung/Verbandslehre/Verbrennungen; RS: Wirbelsäulentrauma/
  Thorax-Abdominaltrauma/Polytrauma) und in die globale Suche
  aufgenommen.
- Der Verbandslehre-Eintrag markiert explizit, dass er sich als nächster
  Ausbaustand für einen interaktiven Schritt-für-Schritt-Übungsmodus
  eignet (im Stil des Elektroden-Trainers) — bewusst als Referenztext
  begonnen, da die interaktive Variante ein neues UI-Pattern braucht und
  nicht überstürzt werden sollte.

## [0.9.1] – 2026-09-17

### Hinzugefügt

- Versionsnummer wird jetzt in der Sidebar neben dem Logo angezeigt
  ("SanWissen v0.9.1") — automatisch aus `package.json` übernommen
  (`vite.config.ts` injiziert `__APP_VERSION__` als Build-Konstante),
  keine manuelle Pflege an zweiter Stelle nötig.

## [0.9.0] – 2026-09-17

### Hinzugefügt

- **Startseite** (`app/HomePage.tsx`, neuer Sidebar-Eintrag "Startseite",
  jetzt Standardansicht beim Öffnen der App):
  - Modul-Karten-Übersicht (Klick navigiert direkt ins Modul).
  - **"Dein Fahrplan"**: kuratierte Verlinkung in die relevanten Abschnitte
    aller Module, gruppiert nach Qualifikationsstufe (`app/roadmap.ts`) —
    setzt die "Fahrplan"-Idee aus `docs/vorgaben_und_inhalte.txt`
    Abschnitt 5 um. Kein eigenes Modul mit eigenen Inhalten, nur Links;
    Einträge über der gewählten Stufe werden wie überall sonst nur markiert,
    nicht versteckt.
  - EKG-Fortschritts-Kachel (Versuche/Trefferquote), sobald erste
    Quiz-Versuche vorliegen.
  - `NavigationContext`: `itemId` ist jetzt optional, damit auch reine
    Modul-Links (ohne konkreten Eintrag, z. B. "Elektroden legen üben")
    funktionieren.

## [0.8.0] – 2026-09-17

### Hinzugefügt

- **Werkzeuge & Scores-Modul** (neu) mit 5 interaktiven Rechnern, gemäß
  Priorität 3 aus `docs/vorgaben_und_inhalte.txt` (geringer Aufwand, hoher
  Nutzen):
  - **Glasgow Coma Scale (GCS)**: Klick-Rechner für Augenöffnung/verbale/
    motorische Reaktion, live Summe + Schweregrad. Ergänzt die bereits
    bestehende statische GCS-Tabelle im Algorithmen-Modul um eine
    interaktive Variante.
  - **Schmerzskala (NRS/VAS)**: 0–10-Regler mit Einordnung und einer
    **direkten Cross-Referenz zu den Medikamente-Schwellenwerten**
    (z. B. "ab NRS ≥ 6 laut SAA/BPR Morphin/Fentanyl/Nalbuphin indiziert").
  - **APGAR-Score**: 5 Kategorien à 0–2 Punkte für die Neugeborenen-Beurteilung.
  - **Neuner-Regel**: Verbrennungsflächen-Schätzung mit Umschalter
    Erwachsene/Kind (unterschiedliche Körperproportionen) plus
    Handflächenregel für kleine/verstreute Areale.
  - **NACA-Score**: Referenzliste der 8 Einsatzschwere-Stufen (0–VII).
  - Alle Tools sind in die globale Suche und die modulübergreifende
    Navigation eingebunden.
- Bewusst **nicht** umgesetzt: ein Medikamenten-Dosisrechner nach
  Körpergewicht (ebenfalls in der Roadmap-Doc genannt) — die Dosierungsfelder
  der 29 SAA/BPR-Medikamente sind uneinheitlich formatierter Freitext
  (Einzeldosis, gewichtsadaptiert, Alterstabellen gemischt), ein
  automatisches Auslesen daraus wäre bei einem hochsensiblen Thema wie
  Dosierung ein zu hohes Fehlerrisiko. Ein Dosisrechner sollte, falls
  gewünscht, als eigenes, sorgfältig geprüftes Feature pro Medikament
  angegangen werden statt generisch geparst.

## [0.7.0] – 2026-09-17

### Geändert (Breaking im Datenmodell)

- **Rettungshelfer (RH) und Rettungssanitäter (RS) zu einer Stufe zusammengelegt**
  (sehr ähnlicher Kompetenzumfang). `QualificationLevel` ist jetzt
  `'SanH' | 'RS' | 'NotSan'` statt vier Stufen. Alle bisherigen `RH`-Werte
  in den Datenquellen wurden auf `RS` migriert.
- **Suche konsolidiert**: die einzelnen Suchfelder in EKG-Trainer,
  Medikamente und Algorithmen sind entfernt. Stattdessen gibt es jetzt
  **eine globale Suche** oben in der Sidebar (`app/GlobalSearch.tsx`), die
  alle Module gleichzeitig durchsucht (`app/searchIndex.ts`) und beim Klick
  auf einen Treffer direkt zum richtigen Modul **und** Eintrag springt
  (`app/NavigationContext.tsx` — auch über EKG-Trainer-interne Tabs
  hinweg).

### Hinzugefügt

- **Anatomie & Physiologie-Modul** (vorher Platzhalter, jetzt verfügbar)
  mit 5 Themen: Herz-Kreislauf-System (inkl. Erregungsleitungssystem als
  direkte Grundlage fürs EKG-Modul), Atmungssystem, Skelett & Muskulatur,
  Nervensystem (inkl. vegetatives NS als Grundlage für Medikamentenwirkungen
  wie Adrenalin/Atropin), Vitalparameter-Normwerte nach Altersgruppe als
  Nachschlagetabelle. Allgemeines anatomisch-physiologisches Wissen, klar
  als solches gekennzeichnet (keine SAA/BPR-Quelle).
- Algorithmen-Eintrag "Beurteilung der Bewusstseinslage" um die vollständige
  GCS-Punktetabelle ergänzt (siehe 0.6.1).

## [0.6.1] – 2026-09-17

### Geändert

- Sidebar-Gruppenüberschriften zeigen nur noch den Stufennamen ("Sanitätshelfer"
  statt "Ab Sanitätshelfer").
- EKG-Trainer (Lernmodus) hat jetzt ein Suchfeld, konsistent mit
  Medikamente/Algorithmen.
- Algorithmen-Eintrag "Beurteilung der Bewusstseinslage (WASB & GCS)" um die
  vollständige GCS-Punktetabelle (Augenöffnung/verbale/motorische Reaktion,
  je mit Einzelpunktwerten) ergänzt — allgemein gebräuchliche Originalskala
  nach Teasdale & Jennett, nicht im SAA/BPR-PDF enthalten (per Quellenhinweis
  markiert).

## [0.6.0] – 2026-09-17

### Hinzugefügt

- **Algorithmen-Modul** (vorher Platzhalter, jetzt verfügbar) mit 10
  Einträgen aus den BPR-Abschnitten „Herangehensweise" und
  „Kreislaufstillstand": ABCDE-Herangehensweise, ABCDE-Instabilitäten,
  WASB & GCS, SAMPLER, OPQRST, Atemwegsmanagement, Patientenanmeldung
  (ZOABCDE), Übergabe (SINNHAFT), Reanimation Erwachsene (BLS→ALS),
  Reanimation Kinder (PLS).
  - Jeder einzelne Schritt trägt sein eigenes `minLevel` (nicht nur der
    ganze Eintrag) — z. B. zeigt "Reanimation Erwachsene" die
    Basismaßnahmen (Bewusstsein/Atmung prüfen, HDM 30:2, AED) ohne Badge
    für alle Stufen, während EGA/Zugang/Medikamente mit "ab
    Notfallsanitäter" markiert sind. Das setzt das Stufen-Datenmodell aus
    0.5.0 direkt im Detail um.
  - SINNHAFT-Inhalt wurde aus einer im PDF eingebetteten Grafik (keine
    Textebene) durch Rendern der Seite und visuelles Auslesen gewonnen.
  - Basismaßnahmen-Anteile der Reanimation (Laienreanimation, nicht Teil
    der NotSan-fokussierten SAA/BPR-Quelle) sind als allgemeines BLS-Wissen
    ergänzt und per `sourceNote` von den PDF-Inhalten abgegrenzt.
- **Sidebar nach Qualifikationsstufe gruppiert**: Module erscheinen jetzt
  unter Abschnitts-Überschriften ("Ab Sanitätshelfer", "Ab Rettungshelfer" …)
  nach ihrer niedrigsten Einstiegsstufe, damit die Navigation mit
  wachsender Modulzahl übersichtlich bleibt.

## [0.5.0] – 2026-09-17

### Hinzugefügt

- **Qualifikationsstufen-Modell** (SanH/RH/RS/NotSan) als Cross-cutting-
  Metadatum auf bestehenden Inhalten, gemäß `docs/vorgaben_und_inhalte.txt`
  Abschnitt 5/6 (Priorität 1):
  - `app/levels.ts` (Typ, Reihenfolge, Vergleichslogik),
    `app/LevelContext.tsx` (global, lokal persistiert unter
    `sanwissen:selectedLevel`).
  - Neuer Stufen-Auswahl in der Sidebar ("Meine Qualifikation" /
    "Alle anzeigen").
  - `LevelBadge`-Komponente + `above-level`-Abblendung
    (`components/LevelBadge.tsx`): Inhalte über der gewählten Stufe werden
    **nicht versteckt**, nur mit Badge ("ab NotSan" etc.) markiert und
    abgeblendet — der Nachschlage-Charakter bleibt erhalten.
  - Migration bestehender Inhalte: EKG-Rhythmuserkennung →
    `minLevel: 'RS'`, Medikamente (SAA/BPR) → `minLevel: 'NotSan'`,
    Elektroden-legen → `minLevel: 'RH'` (stufenunabhängige Fertigkeit,
    niedrig angesetzt) für beide Sets.
- Projekt umbenannt in **SanWissen** (vormals "RS Learner") inkl. neuer
  Zielgruppenbeschreibung (SanH/RH/RS/NotSan) in README/App-Branding.
- `docs/vorgaben_und_inhalte.txt`: ausführliche Modul- und Feature-Roadmap
  vom Nutzer ergänzt (Grundlage für die weitere Priorisierung).

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
