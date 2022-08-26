export const getTypedObjectKeys = <T>(obj: T): Array<keyof T> =>
  Object.keys(obj) as Array<keyof typeof obj>;
