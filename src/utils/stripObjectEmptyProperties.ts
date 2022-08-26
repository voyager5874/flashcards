export const stripObjectEmptyProperties = <T extends object>(obj: T): T => {
  const objCopy: T = { ...obj };
  const keys = Object.keys(obj) as Array<keyof T>;
  keys.forEach(key => {
    if (!objCopy[key]) {
      delete objCopy[key];
    }
  });
  return objCopy;
};

// export const cleanObjectEmptyProperties = <T extends object>(obj: T): T => {
//   const res = {} as T;
//   getTypedObjectKeys(obj).forEach(key => {
//     if (obj[key]) {
//       res[key] = obj[key];
//     }
//   });
//   return res;
// };
