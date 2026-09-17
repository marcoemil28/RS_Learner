const STORAGE_KEY = 'sanwissen:quiz:progress:v1';

export interface QuestionStat {
  attempts: number;
  correct: number;
  lastCorrect: boolean | null;
}

export type QuizProgressState = Record<string, QuestionStat>;

function load(): QuizProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuizProgressState) : {};
  } catch {
    return {};
  }
}

function save(state: QuizProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage nicht verfügbar — Fortschritt gilt dann nur für die Sitzung.
  }
}

export function getProgress(): QuizProgressState {
  return load();
}

export function recordAttempt(questionId: string, wasCorrect: boolean): QuizProgressState {
  const state = load();
  const stat = state[questionId] ?? { attempts: 0, correct: 0, lastCorrect: null };
  stat.attempts += 1;
  if (wasCorrect) stat.correct += 1;
  stat.lastCorrect = wasCorrect;
  state[questionId] = stat;
  save(state);
  return state;
}

export function resetProgress(): QuizProgressState {
  save({});
  return {};
}

/** Gewichtete Zufallsauswahl: Fragen mit wenig Übung oder niedriger Trefferquote werden häufiger gezogen. */
export function weightFor(stat: QuestionStat | undefined): number {
  if (!stat || stat.attempts === 0) return 3;
  const accuracy = stat.correct / stat.attempts;
  const recencyBoost = stat.lastCorrect === false ? 1.5 : 1;
  return (1.2 - accuracy) * recencyBoost + 0.3;
}

export function pickWeighted<T extends { id: string }>(items: T[], state: QuizProgressState, exclude?: string): T {
  const pool = exclude ? items.filter((it) => it.id !== exclude) : items;
  const candidates = pool.length > 0 ? pool : items;
  const weights = candidates.map((it) => Math.max(0.05, weightFor(state[it.id])));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < candidates.length; i++) {
    r -= weights[i];
    if (r <= 0) return candidates[i];
  }
  return candidates[candidates.length - 1];
}
