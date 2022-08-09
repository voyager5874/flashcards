export const prettifyDate = (rawDate: string | number): string => {
  const msec = typeof rawDate === 'string' ? Date.parse(rawDate) : rawDate;
  const date = new Date(msec);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
