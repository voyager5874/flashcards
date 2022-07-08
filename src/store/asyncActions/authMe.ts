import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { appIsBusy, appErrorOccurred } from 'store/reducers/app';
import { setLoginStatus } from 'store/reducers/login';
import { profileDataReceived } from 'store/reducers/profile';
import { AppDispatch } from 'store/types';

export const authMe = () => async (dispatch: AppDispatch) => {
  dispatch(appIsBusy(true));
  try {
    const response = await authAPI.authMe();
    if (!response.error) {
      dispatch(profileDataReceived(response));
      dispatch(setLoginStatus(true));
    } else {
      dispatch(appErrorOccurred(response.error));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error?.response?.data?.error ?? error.message;
      dispatch(appErrorOccurred(errorMessage));
    } else {
      dispatch(appErrorOccurred('there was some error during authorization'));
    }
  } finally {
    dispatch(appIsBusy(false));
  }
};
