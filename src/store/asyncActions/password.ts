import { authAPI } from 'api';
import { PasswordForgottenParameterType, ResetPasswordParameterType } from 'api/types';
import { auth } from 'store/asyncActions/auth';
import { appErrorOccurred, appIsBusy, setAppMessage } from 'store/reducers/app';
import { AppDispatch } from 'store/types';
import { processAsyncActionErrors } from 'utils';

export const startPasswordRecovery =
  (
    data: PasswordForgottenParameterType,
    navigate: Function,
    changeFormSubmittingState: Function,
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    changeFormSubmittingState(true);
    // eslint-disable-next-line no-debugger
    debugger;
    try {
      const response = await authAPI.passwordForgotten(data);

      console.dir(response);
      if (!response.error) {
        navigate('../instructions');
        dispatch(setAppMessage(response.info));
      } else dispatch(appErrorOccurred(response.error));
    } catch (error) {
      // if (error instanceof AxiosError) {
      //   const errorMessage = error?.response?.data?.error ?? error.message;
      //   dispatch(appErrorOccurred(errorMessage));
      // } else {
      //   dispatch(appErrorOccurred('error requesting password recovery link'));
      // }
      processAsyncActionErrors(
        error,
        dispatch,
        'error requesting password recovery link',
      );
    } finally {
      dispatch(appIsBusy(false));
      changeFormSubmittingState(false);
    }
  };

export const requestPasswordReset =
  (
    data: ResetPasswordParameterType,
    navigate: Function,
    changeFormSubmittingState: Function,
  ) =>
  async (dispatch: AppDispatch) => {
    // if (!data.resetPasswordToken.length) {
    //   appErrorOccurred('token invalid');
    //   return;
    // }
    dispatch(appIsBusy(true));
    changeFormSubmittingState(true);
    // eslint-disable-next-line no-debugger
    debugger;
    try {
      const response = await authAPI.resetPassword(data);
      if (!response.error) {
        dispatch(setAppMessage(response.info));
        navigate('/login', { replace: true });
      } else if (response.error) {
        dispatch(appErrorOccurred(response.error));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'some error during password reset');
    } finally {
      dispatch(appIsBusy(false));
      changeFormSubmittingState(false);
    }
  };
