import { ChangeEvent } from 'react';

import { FIRST_ITEM_INDEX } from 'const';

export const toBase64 = (event: ChangeEvent<HTMLInputElement>): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    if (!event?.target?.files?.length) {
      reject(new Error('no files received from the input'));
    } else {
      const targetFile = event.target.files[FIRST_ITEM_INDEX];
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

export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader?.result?.toString().replace(/^data:(.*,)?/, '');
      if (encoded && encoded.length % 4 > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}
