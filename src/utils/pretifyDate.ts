export const prettifyDate = (rawDate: number | string | null): string => {
  // if (typeof rawDate !== 'string' && typeof rawDate !== 'number') return 'unknown date';
  if (!rawDate) return 'unknown date';
  const msec = typeof rawDate === 'string' ? Date.parse(rawDate) : rawDate;
  const date = new Date(msec);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
