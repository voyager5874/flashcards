import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_DELAY_MS = 500;

// export function useDebounceCallback<T>(
//   callback: <P>(value: P) => void,
//   delay: number,
// ): Function {
//   const timer = useRef<ReturnType<typeof setTimeout>>();
//
//   return useCallback(
//     (value: T) => {
//       if (timer.current) {
//         clearTimeout(timer.current);
//       }
//       timer.current = setTimeout(() => {
//         callback(value);
//       }, delay);
//     },
//     [callback, delay],
//   );
// }

// export const useDebouncedCallback = <F, V>(
//   callback: any,
//   value: V,
//   delay?: number,
// ): void => {
//   const [debouncedValue, setDebouncedValue] = useState<V>(value);
//
//   useEffect(() => {
//     callback(value);
//   }, [debouncedValue, callback]);
//
//   useEffect(() => {
//     const timer = setTimeout(() => setDebouncedValue(value), delay || DEFAULT_DELAY_MS);
//     return () => {
//       clearTimeout(timer);
//     };
//   }, [value, delay]); // if value changes clean up runs and timer resets
// };

export const useDebouncedCallback = <F, V>(
  callback: any,
  value: V,
  delay?: number,
): void => {
  useEffect(() => {
    const timer = setTimeout(() => callback(value), delay || DEFAULT_DELAY_MS);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // if value changes clean up runs and timer resets
};
