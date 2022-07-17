import { authAPI } from 'api';
import { LoginParameterType } from 'api/types';
import { appErrorOccurred, appIsBusy, setAppMessage } from 'store/reducers/app';
import { userLoggedIn } from 'store/reducers/login';
import { profileDataReceived } from 'store/reducers/profile';
import { AppDispatch } from 'store/types';
import { processAsyncActionErrors } from 'utils';

export const login =
  (credentials: LoginParameterType) => async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    // setSubmitting(true);
    try {
      const response = await authAPI.login(credentials);
      if (!response.error) {
        dispatch(userLoggedIn(true));
        dispatch(profileDataReceived(response));
      } else {
        dispatch(appErrorOccurred(response.error));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'some error during login');
    } finally {
      dispatch(appIsBusy(false));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(appIsBusy(true));
  try {
    const response = await authAPI.logout();
    if (!response.error) {
      dispatch(userLoggedIn(false));
      dispatch(setAppMessage(response.info));
    } else if (response.error) {
      dispatch(appErrorOccurred(response.error));
    }
  } catch (error) {
    processAsyncActionErrors(error, dispatch, 'some error during logout');
  } finally {
    dispatch(appIsBusy(false));
  }
};
