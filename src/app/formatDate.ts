/** Formatiert ein ISO-Datum (YYYY-MM-DD) als deutsches Datum (DD.MM.YYYY). */
export function formatStand(isoDate: string): string {
  const [y, m, d] = isoDate.split('-');
  return `${d}.${m}.${y}`;
}
