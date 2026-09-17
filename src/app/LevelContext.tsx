import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { LevelFilter } from './levels';

const STORAGE_KEY = 'sanwissen:selectedLevel';

const LevelContext = createContext<{
  level: LevelFilter;
  setLevel: (l: LevelFilter) => void;
}>({ level: 'all', setLevel: () => {} });

function loadInitial(): LevelFilter {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (raw as LevelFilter) : 'all';
  } catch {
    return 'all';
  }
}

export function LevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<LevelFilter>(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, level);
    } catch {
      // localStorage nicht verfügbar — Auswahl gilt dann nur für die Sitzung.
    }
  }, [level]);

  return <LevelContext.Provider value={{ level, setLevel }}>{children}</LevelContext.Provider>;
}

export function useLevel() {
  return useContext(LevelContext);
}
