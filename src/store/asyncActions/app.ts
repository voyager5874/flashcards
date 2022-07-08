import { AxiosError } from 'axios';

import { authMe } from 'store/asyncActions/authMe';
import { appInitialized, appIsBusy, appErrorOccurred } from 'store/reducers/app';
import { AppDispatch } from 'store/types';

export const initializeApp = () => async (dispatch: AppDispatch) => {
  dispatch(appIsBusy(true));
  try {
    const list: Promise<any>[] = [dispatch(authMe())];
    await Promise.all(list);
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error?.response?.data?.error ?? error.message;
      dispatch(appErrorOccurred(errorMessage));
    } else {
      dispatch(appErrorOccurred('there was some error during app initialization'));
    }
  } finally {
    dispatch(appIsBusy(false));
    dispatch(appInitialized(true));
  }
};
