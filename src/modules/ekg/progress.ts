const STORAGE_KEY = 'rs-learner:ekg:progress:v1';

export interface RhythmStat {
  attempts: number;
  correct: number;
  lastSeenAt: number | null;
  lastCorrect: boolean | null;
}

export type ProgressState = Record<string, RhythmStat>;

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressState) : {};
  } catch {
    return {};
  }
}

function save(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage nicht verfügbar (z. B. privater Modus) — Fortschritt geht dann nicht verloren-relevant für die Sitzung, wird aber nicht persistiert.
  }
}

export function getProgress(): ProgressState {
  return load();
}

export function recordAttempt(rhythmId: string, wasCorrect: boolean): ProgressState {
  const state = load();
  const stat = state[rhythmId] ?? { attempts: 0, correct: 0, lastSeenAt: null, lastCorrect: null };
  stat.attempts += 1;
  if (wasCorrect) stat.correct += 1;
  stat.lastSeenAt = Date.now();
  stat.lastCorrect = wasCorrect;
  state[rhythmId] = stat;
  save(state);
  return state;
}

export function resetProgress(): ProgressState {
  save({});
  return {};
}

/**
 * Gewichtete Zufallsauswahl: Rhythmen mit wenig Übung oder niedriger Trefferquote
 * werden häufiger gezogen (einfache Form von Spaced Repetition).
 */
export function weightFor(stat: RhythmStat | undefined): number {
  if (!stat || stat.attempts === 0) return 3;
  const accuracy = stat.correct / stat.attempts;
  const recencyBoost = stat.lastCorrect === false ? 1.5 : 1;
  return (1.2 - accuracy) * recencyBoost + 0.3;
}

export function pickWeighted<T extends { id: string }>(items: T[], state: ProgressState): T {
  const weights = items.map((it) => Math.max(0.05, weightFor(state[it.id])));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}
