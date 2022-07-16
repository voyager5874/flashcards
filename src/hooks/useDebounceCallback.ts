import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_DELAY_MS = 500;

export function useDebouncedCallback<T>(
  callback: (value: T) => void,
  delay?: number,
): (value: T) => void {
  const timer = useRef<any>(null);

  return useCallback(
    (value: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        console.log(value);
        callback(value);
      }, delay || DEFAULT_DELAY_MS);
    },
    [callback, delay],
  );
}

// export function useDebouncedCallback<T>(
//   callback: (value: T) => void,
//   value: T,
//   delay?: number,
// ): void {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       callback(value);
//     }, delay || DEFAULT_DELAY_MS);
//     return () => {
//       clearTimeout(timer);
//     };
//   }, [value]);
// }

// export const useDebouncedCallback = <T>(
//   callback: (value: T) => void,
//   value: T,
//   delay?: number,
// ): void => {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value);
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

// export const useDebouncedCallback = <T, C>(
//   callback: (value: T) => void,
//   value: T,
//   context: C,
//   delay?: number,
// ): void => {
//   const boundCallback = callback.bind(context);
//   console.log(context);
//   useEffect(() => {
//     const timer = setTimeout(() => boundCallback(value), delay || DEFAULT_DELAY_MS);
//     return () => {
//       clearTimeout(timer);
//     };
//   }, [value, delay]); // if value changes clean up runs and timer resets
// };

// type DebounceCallbackType<T> = (value: T) => void;
//
// export const useDebouncedCallback2 = <T>(
//   callback: DebounceCallbackType<T | void>,
//   value?: T,
//   delay?: number,
// ): void => {
//   useEffect(() => {
//     const timer = value
//       ? setTimeout(() => callback(value), delay || DEFAULT_DELAY_MS)
//       : setTimeout(() => callback(), delay || DEFAULT_DELAY_MS);
//
//     return () => {
//       clearTimeout(timer);
//     };
//   }, [value, delay]); // if value changes clean up runs and timer resets
// };
//
// const func1 = (param: string) => {
//   console.log(param);
// };
//
// const func2 = () => {
//   console.log('do nothing');
// };
//
// useDebouncedCallback2(func2);

// https://usehooks-ts.com/react-hook/use-timeout
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
