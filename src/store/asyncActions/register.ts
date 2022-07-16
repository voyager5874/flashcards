import { authAPI } from 'api';
import { SignUpParameterType } from 'api/types';
import { appErrorOccurred, appIsBusy, setAppMessage } from 'store/reducers/app';
import { AppDispatch } from 'store/types';
import { processAsyncActionErrors } from 'utils';

export const register =
  (data: SignUpParameterType, redirectFunction: Function) =>
  async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));

    try {
      const response = await authAPI.signUp(data);
      if (!response.error) {
        dispatch(setAppMessage('successful'));
        redirectFunction('../login', { replace: true });
      } else if (response.error) {
        dispatch(appErrorOccurred(response.error));
      }
    } catch (error) {
      // if (error instanceof AxiosError) {
      //   const errorMessage = error?.response?.data?.error ?? error.message;
      //   dispatch(appErrorOccurred(errorMessage));
      // } else {
      //   dispatch(appErrorOccurred('some error during registration'));
      // }
      processAsyncActionErrors(error, dispatch, 'some error during registration');
    } finally {
      dispatch(appIsBusy(false));
    }
  };
