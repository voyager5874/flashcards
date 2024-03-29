import { AxiosError } from 'axios';

import { STATUS_CODES } from 'enum';
import { appErrorOccurred } from 'store/reducers/app';
import { userLoggedIn } from 'store/reducers/login';
import { AppDispatch } from 'store/types';

export const processAsyncActionErrors = (
  error: unknown,
  dispatch: AppDispatch,
  defaultMessage?: string,
): void => {
  if (error instanceof Error && !(error instanceof AxiosError)) {
    dispatch(appErrorOccurred(error.message));
  } else if (error instanceof AxiosError) {
    const errorMessage = error?.response?.data?.error ?? error.message;
    dispatch(appErrorOccurred(errorMessage));
    if (error.response?.status === STATUS_CODES.Unauthorized) {
      dispatch(userLoggedIn(false));
    }
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
