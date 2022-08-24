import { ChangeEvent } from 'react';

import { FIRST_ITEM_INDEX, IMAGE_MAX_SIZE } from 'const';
import { Nullable } from 'types';

export const toBase64 = (event: ChangeEvent<HTMLInputElement>): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    if (!event?.target?.files?.length) {
      reject(new Error('no files received from the input'));
    } else {
      const targetFile = event.target.files[FIRST_ITEM_INDEX];
      if (targetFile.size > IMAGE_MAX_SIZE)
        reject(new Error('max image file size exceeded'));
      const reader = new FileReader();
      // const formData = new FormData();
      // formData.append('base64Representation', targetFile);
      reader.readAsDataURL(targetFile);
      reader.onloadend = () => {
        if (reader.result) {
          resolve(String(reader.result));
        } else {
          reject(new Error('conversion to base64 failed'));
        }
      };
      reader.onerror = error => reject(error);
    }
  });

// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript

// export function getBase64(file: File) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       let encoded = reader?.result?.toString().replace(/^data:(.*,)?/, '');
//       if (encoded && encoded.length % 4 > 0) {
//         encoded += '='.repeat(4 - (encoded.length % 4));
//       }
//       resolve(encoded);
//     };
//     reader.onerror = error => reject(error);
//   });
// }

export const getBase64String = (event: ChangeEvent<HTMLInputElement>): string | Error => {
  if (!event?.target?.files?.length) return new Error('no file');
  const targetFile = event.target.files[FIRST_ITEM_INDEX];
  if (targetFile.size > IMAGE_MAX_SIZE) return new Error('file size exceeded');
  const reader = new FileReader();
  reader.readAsDataURL(targetFile);
  reader.onloadend = () => {
    if (reader.result) {
      return String(reader.result);
    }
    return new Error('error converting file');
  };
  reader.onerror = error => new Error(error.type);
  return new Error('something went wrong');
};
