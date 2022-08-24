export const getChangedParams = <T extends object>(prev: T, next: T): Partial<T> => {
  const prevParams = Object.keys(prev) as Array<keyof T>;
  const nextParams = Object.keys(next) as Array<keyof T>;
  const result: Partial<T> = {};
  nextParams.forEach(key => {
    if (!prevParams.includes(key) || prev[key] !== next[key]) {
      result[key] = next[key];
    }
  });
  return result;
};
