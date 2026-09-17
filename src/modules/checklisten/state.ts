const STORAGE_KEY = 'sanwissen:checklisten:checked';

type CheckedMap = Record<string, string[]>;

function load(): CheckedMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CheckedMap) : {};
  } catch {
    return {};
  }
}

function save(map: CheckedMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // localStorage nicht verfügbar — Haken gelten dann nur für die Sitzung.
  }
}

export function getChecked(checklistId: string): Set<string> {
  const map = load();
  return new Set(map[checklistId] ?? []);
}

export function toggleChecked(checklistId: string, itemId: string): Set<string> {
  const map = load();
  const current = new Set(map[checklistId] ?? []);
  if (current.has(itemId)) current.delete(itemId);
  else current.add(itemId);
  map[checklistId] = [...current];
  save(map);
  return current;
}

export function resetChecklist(checklistId: string): Set<string> {
  const map = load();
  delete map[checklistId];
  save(map);
  return new Set();
}
