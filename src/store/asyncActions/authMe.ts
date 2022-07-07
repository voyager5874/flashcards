import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { setAppBusyState, setAppError } from 'store/reducers/app';
import { profileDataReceived } from 'store/reducers/profile';
import { AppDispatch } from 'store/types';

export const authMe = () => async (dispatch: AppDispatch) => {
  dispatch(setAppBusyState(true));
  try {
    const response = await authAPI.authMe();
    if (!response.error) {
      dispatch(profileDataReceived(response));
    } else {
      dispatch(setAppError(response.error));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error?.response?.data?.error ?? error.message;
      dispatch(setAppError(errorMessage));
    } else {
      dispatch(setAppError('there was some error during authorization'));
    }
  } finally {
    dispatch(setAppBusyState(false));
  }
};
