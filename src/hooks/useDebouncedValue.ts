import { useEffect, useState } from 'react';

const DEFAULT_DELAY_MS = 1500;

export const useDebouncedValue = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || DEFAULT_DELAY_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // if value changes clean up runs and timer resets

  return debouncedValue;
};
