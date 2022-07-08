import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { LoginDataType } from 'api/types';
import { appIsBusy, appErrorOccurred } from 'store/reducers/app';
import { setLoginStatus } from 'store/reducers/login';
import { profileDataReceived } from 'store/reducers/profile';
import { AppDispatch } from 'store/types';

export const login = (credentials: LoginDataType) => async (dispatch: AppDispatch) => {
  dispatch(appIsBusy(true));
  try {
    const response = await authAPI.login(credentials);
    if (!response.error) {
      dispatch(setLoginStatus(true));
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
