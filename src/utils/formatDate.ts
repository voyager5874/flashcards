type formatDateStringReturnType = {
  date: string;
  time: string;
};

export const formatDate = (rawDate: string | number): formatDateStringReturnType => {
  const msec = typeof rawDate === 'string' ? Date.parse(rawDate) : rawDate;
  const date = new Date(msec);
  const stringTime = date.toLocaleTimeString();
  const stringDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return { date: stringDate, time: stringTime };
};
