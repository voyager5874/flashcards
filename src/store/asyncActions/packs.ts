import { AxiosError } from 'axios';

import { dataAPI } from 'api';
import { appIsBusy, setAppError } from 'store/reducers/app';
import { packsDataReceived } from 'store/reducers/packs';
import { AppDispatch } from 'store/types';

export const setPacksData = () => async (dispatch: AppDispatch) => {
  dispatch(appIsBusy(true));
  try {
    const response = await dataAPI.getPacks();
    if (response.cardPacksTotalCount) {
      dispatch(packsDataReceived(response));
    } else {
      dispatch(setAppError(JSON.stringify(response)));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error?.response?.data?.error ?? error.message;
      dispatch(setAppError(errorMessage));
    } else {
      dispatch(setAppError('error getting pacs from the server'));
    }
  } finally {
    dispatch(appIsBusy(false));
  }
};
