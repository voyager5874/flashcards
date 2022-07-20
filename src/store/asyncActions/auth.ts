import { authAPI } from 'api';
import { appErrorOccurred, appIsBusy } from 'store/reducers/app';
import { userLoggedIn } from 'store/reducers/login';
import { profileDataReceived } from 'store/reducers/profile';
import { AppDispatch } from 'store/types';
import { processAsyncActionErrors } from 'utils';

export const auth = () => async (dispatch: AppDispatch) => {
  dispatch(appIsBusy(true));
  try {
    const response = await authAPI.authMe();
    if (!response.error) {
      dispatch(profileDataReceived(response));
      dispatch(userLoggedIn(true));
      return response.name;
    }
    dispatch(appErrorOccurred(response.error));
    dispatch(userLoggedIn(false));
    return new Error(response.error);
  } catch (error) {
    // processAsyncActionErrors(
    //   error,
    //   dispatch,
    //   'there was some error during authorization',
    // );
    dispatch(userLoggedIn(false));
    throw new Error('not authorized');
  } finally {
    dispatch(appIsBusy(false));
  }
};
