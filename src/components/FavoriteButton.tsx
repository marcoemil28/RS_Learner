import { useEffect, useState } from 'react';
import { isFavorite, subscribeFavorites, toggleFavorite } from '../app/favorites';

interface FavoriteButtonProps {
  moduleId: string;
  itemId: string;
  title: string;
  moduleTitle: string;
  icon: string;
}

/** Stern-Button zum Merken/Entfernen eines Eintrags als Favorit (persistiert in localStorage). */
export function FavoriteButton({ moduleId, itemId, title, moduleTitle, icon }: FavoriteButtonProps) {
  const key = `${moduleId}:${itemId}`;
  const [active, setActive] = useState(() => isFavorite(key));

  useEffect(() => {
    setActive(isFavorite(key));
    return subscribeFavorites(() => setActive(isFavorite(key)));
  }, [key]);

  return (
    <button
      type="button"
      className={`favorite-button ${active ? 'active' : ''}`}
      onClick={() => toggleFavorite({ key, moduleId, itemId, title, moduleTitle, icon })}
      title={active ? 'Von Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
      aria-label={active ? 'Von Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
    >
      {active ? '★' : '☆'}
    </button>
  );
}
