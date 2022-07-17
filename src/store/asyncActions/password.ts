import { authAPI } from 'api';
import { PasswordForgottenParameterType, ResetPasswordParameterType } from 'api/types';
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
    try {
      const response = await authAPI.passwordForgotten(data);
      if (!response.error) {
        navigate(`../instructions/${data.email}`);
        dispatch(setAppMessage(response.info));
      } else dispatch(appErrorOccurred(response.error));
    } catch (error) {
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
    dispatch(appIsBusy(true));
    changeFormSubmittingState(true);
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
