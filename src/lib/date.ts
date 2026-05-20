/**
 * Format a Date object to Vietnamese "dd.MM.yyyy" string.
 *
 * Ví dụ: new Date('2026-05-18') → "18.05.2026"
 */
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

/**
 * Sort comparator: newest first (descending).
 * Truyền vào `.sort()` để bài blog mới hiện trên đầu.
 */
export function byDateDesc<T extends { data: { date: Date } }>(a: T, b: T): number {
  return b.data.date.getTime() - a.data.date.getTime();
}
