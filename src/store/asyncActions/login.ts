import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { LoginDataType } from 'api/types';
import { setAppBusyState, setAppError } from 'store/reducers/app';
import { setLoginStatus } from 'store/reducers/login';
import { profileDataReceived } from 'store/reducers/profile';
import { AppDispatch } from 'store/types';

export const login = (credentials: LoginDataType) => async (dispatch: AppDispatch) => {
  dispatch(setAppBusyState(true));
  try {
    const response = await authAPI.login(credentials);
    if (!response.error) {
      dispatch(setLoginStatus(true));
      dispatch(profileDataReceived(response));
    } else {
      dispatch(setAppError(response.error));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error?.response?.data.error ?? error.message;
      dispatch(setAppError(errorMessage));
    } else {
      dispatch(setAppError('some error during login'));
    }
    // console.dir(error);
  } finally {
    dispatch(setAppBusyState(false));
  }
};
