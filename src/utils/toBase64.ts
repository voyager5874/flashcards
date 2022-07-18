import { ChangeEvent } from 'react';

import { FIRST_ITEM_INDEX } from 'const';

export const toBase64 = (event: ChangeEvent<HTMLInputElement>): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!event?.target?.files?.length) {
      reject(new Error('error reading the file'));
    } else {
      const targetFile = event.target.files[FIRST_ITEM_INDEX];
      const formData = new FormData();
      const reader = new FileReader();
      formData.append('base64Representation', targetFile);
      reader.readAsDataURL(targetFile);
      let base64String = '';
      reader.onloadend = () => {
        if (reader.result) {
          base64String = reader.result as string;
          resolve(base64String);
        }
      };
    }
  });
