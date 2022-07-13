import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { appErrorOccurred, appIsBusy, setAppMessage } from 'store/reducers/app';
import { AppDispatch } from 'store/types';

export const startPasswordRecovery =
  (
    email: string,
    redirectCallback: Function,
    changeFormSubmittingStateCallback: Function,
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    changeFormSubmittingStateCallback(true);
    // eslint-disable-next-line no-debugger
    debugger;
    try {
      const response = await authAPI.passwordForgotten(email);

      console.dir(response);
      if (!response.error) {
        redirectCallback('../password-reset');
        dispatch(setAppMessage(response.info));
      } else dispatch(appErrorOccurred(response.error));
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error?.response?.data?.error ?? error.message;
        dispatch(appErrorOccurred(errorMessage));
      } else {
        dispatch(appErrorOccurred('error requesting password recovery link'));
      }
    } finally {
      dispatch(appIsBusy(false));
      changeFormSubmittingStateCallback(false);
    }
  };
