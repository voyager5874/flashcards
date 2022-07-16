import { AxiosError } from 'axios';

import { appErrorOccurred } from 'store/reducers/app';
import { AppDispatch } from 'store/types';

export const processAsyncActionErrors = (
  error: unknown,
  dispatch: AppDispatch,
  defaultMessage?: string,
): void => {
  if (typeof error === 'string') {
    dispatch(appErrorOccurred(error));
  } else if (error instanceof AxiosError) {
    const errorMessage = error?.response?.data?.error ?? error.message;
    dispatch(appErrorOccurred(errorMessage));
  } else if (defaultMessage) {
    dispatch(appErrorOccurred(defaultMessage));
  }
};

// export const processAsyncActionErrors = <T, D = AppDispatch>(
//   response: T,
//   dispatch: D,
//   defaultMessage?: string,
// ) => {
//   if (response.error) {
//     dispatch(appErrorOccurred(response.error));
//   } else if (error instanceof AxiosError) {
//     const errorMessage = error?.response?.data?.error ?? error.message;
//     dispatch(appErrorOccurred(errorMessage));
//   } else if(defaultMessage){
//     dispatch(appErrorOccurred(defaultMessage));
//   }
// };
