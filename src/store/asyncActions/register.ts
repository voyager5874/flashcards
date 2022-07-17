import { authAPI } from 'api';
import { SignUpParameterType } from 'api/types';
import { appErrorOccurred, appIsBusy, setAppMessage } from 'store/reducers/app';
import { AppDispatch } from 'store/types';
import { processAsyncActionErrors } from 'utils';

export const register =
  (
    data: SignUpParameterType,
    redirectFunction: Function,
    changeFormSubmitting: Function,
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    changeFormSubmitting(true);
    try {
      const response = await authAPI.signUp(data);
      if (!response.error) {
        dispatch(setAppMessage('successful'));
        redirectFunction('../login', { replace: true });
      } else if (response.error) {
        dispatch(appErrorOccurred(response.error));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'some error during registration');
    } finally {
      dispatch(appIsBusy(false));
      changeFormSubmitting(false);
    }
  };
