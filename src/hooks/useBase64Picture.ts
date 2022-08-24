import { ChangeEvent, useEffect, useState } from 'react';

import { FIRST_ITEM_INDEX, IMAGE_MAX_SIZE } from 'const';
import { FILE_READER_STATUS } from 'enum';
import { useAppDispatch } from 'hooks/AppTypedReduxHooks';
import { appErrorOccurred } from 'store/reducers/app';
import { Nullable } from 'types';

export const useBase64Picture = () => {
  const dispatch = useAppDispatch();

  const [base64String, setBase64String] = useState<Nullable<string>>(null);
  const [loaderId, setLoaderId] = useState<Nullable<string>>(null);
  const [inputEvent, setInputEvent] =
    useState<Nullable<ChangeEvent<HTMLInputElement>>>(null);

  useEffect(() => {
    if (inputEvent === null) return undefined;
    if (!inputEvent?.target?.files?.length) {
      setBase64String(prev => (prev ? null : prev));
      setLoaderId(prev => (prev ? null : prev));
      dispatch(appErrorOccurred('error reading file from disk'));
      return undefined;
    }
    if (inputEvent?.target?.name) setLoaderId(inputEvent.target.name);
    const targetFile = inputEvent.target.files[FIRST_ITEM_INDEX];
    if (targetFile.size > IMAGE_MAX_SIZE) {
      setBase64String(prev => (prev ? null : prev));
      // setLoaderId(prev => (prev ? null : prev));
      dispatch(appErrorOccurred('image size exceeded'));
      return undefined;
    }
    const reader = new FileReader();
    reader.readAsDataURL(targetFile);
    reader.onloadend = () => {
      if (reader.result) {
        const img = new Image();
        img.src = String(reader.result);
        img.onload = () => setBase64String(String(reader.result));
        img.onerror = () => {
          setBase64String(prev => (prev ? null : prev));
          setLoaderId(prev => (prev ? null : prev));
          dispatch(appErrorOccurred('that was not an image'));
          return undefined;
        };
      } else {
        setBase64String(prev => (prev ? null : prev));
        setLoaderId(prev => (prev ? null : prev));
        dispatch(appErrorOccurred('error converting image to base64'));
      }
    };
    reader.onerror = error => {
      setBase64String(prev => (prev ? null : prev));
      setLoaderId(prev => (prev ? null : prev));
      dispatch(appErrorOccurred(error.type));
    };

    return () => {
      if (reader && reader.readyState === FILE_READER_STATUS.Loading) {
        reader.abort();
      }
      setBase64String(null);
      setLoaderId(null);
    };
  }, [inputEvent]);

  return { base64String, setInputEvent, loaderId };
};
