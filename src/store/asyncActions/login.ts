import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { LoginParameterType } from 'api/types';
import { auth } from 'store/asyncActions/auth';
import { appIsBusy, appErrorOccurred, setAppMessage } from 'store/reducers/app';
import { loginStateChanged } from 'store/reducers/login';
import { profileDataReceived } from 'store/reducers/profile';
import { AppDispatch } from 'store/types';

export const login =
  (credentials: LoginParameterType) => async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    try {
      const response = await authAPI.login(credentials);
      if (!response.error) {
        dispatch(loginStateChanged(true));
        dispatch(profileDataReceived(response));
      } else {
        dispatch(appErrorOccurred(response.error));
      }
    } catch (error) {
      // console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error?.response?.data?.error ?? error.message;
        dispatch(appErrorOccurred(errorMessage));
      } else {
        dispatch(appErrorOccurred('some error during login'));
      }
      // console.dir(error);
    } finally {
      dispatch(appIsBusy(false));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(appIsBusy(true));
  try {
    const response = await authAPI.logout();
    if (!response.error) {
      dispatch(loginStateChanged(false));
      dispatch(setAppMessage(response.info));
    } else if (response.error) {
      dispatch(appErrorOccurred(response.error));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error?.response?.data?.error ?? error.message;
      dispatch(appErrorOccurred(errorMessage));
    } else {
      dispatch(appErrorOccurred('some error during logout'));
    }
  } finally {
    dispatch(appIsBusy(false));
  }
};
