export interface FavoriteItem {
  key: string;
  moduleId: string;
  itemId: string;
  title: string;
  moduleTitle: string;
  icon: string;
}

const STORAGE_KEY = 'sanwissen:favorites';

function load(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(items: FavoriteItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage nicht verfügbar — Favoriten gelten dann nur für die Sitzung.
  }
}

type Listener = () => void;
let listeners: Listener[] = [];
let cache = load();

export function getFavorites(): FavoriteItem[] {
  return cache;
}

export function isFavorite(key: string): boolean {
  return cache.some((f) => f.key === key);
}

export function toggleFavorite(item: FavoriteItem) {
  cache = isFavorite(item.key) ? cache.filter((f) => f.key !== item.key) : [...cache, item];
  save(cache);
  listeners.forEach((l) => l());
}

export function subscribeFavorites(listener: Listener): () => void {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
