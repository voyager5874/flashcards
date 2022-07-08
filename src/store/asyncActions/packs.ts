import { AxiosError } from 'axios';

import { dataAPI } from 'api';
import { GetPacksRequestParametersType } from 'api/types';
import { appIsBusy, appErrorOccurred } from 'store/reducers/app';
import { packsDataReceived } from 'store/reducers/packs';
import { AppDispatch } from 'store/types';

export const setPacksData =
  (requestParameters: GetPacksRequestParametersType) => async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    try {
      const response = await dataAPI.getPacks(requestParameters);
      if (response.cardPacksTotalCount) {
        dispatch(packsDataReceived(response));
      } else {
        dispatch(appErrorOccurred(JSON.stringify(response)));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error?.response?.data?.error ?? error.message;
        dispatch(appErrorOccurred(errorMessage));
      } else {
        dispatch(appErrorOccurred('error getting packs from the server'));
      }
    } finally {
      dispatch(appIsBusy(false));
    }
  };
