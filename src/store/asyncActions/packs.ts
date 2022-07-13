import { AxiosError } from 'axios';

import { dataAPI } from 'api';
import { GetPacksParameterType } from 'api/types';
import { appIsBusy, appErrorOccurred } from 'store/reducers/app';
import {
  packsDataReceived,
  packsSetMaxCardsCountFilter,
  packsSetMinCardsCountFilter,
} from 'store/reducers/packs';
import { AppDispatch, RootState } from 'store/types';

export const setPacksData =
  (requestParameters: GetPacksParameterType) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(appIsBusy(true));
    const currentMaxCardsCount = getState().packs.maxCardsCount;
    const currentMinCardsCount = getState().packs.minCardsCount;
    try {
      const response = await dataAPI.getPacks(requestParameters);
      console.dir(response);
      if (response.token) {
        dispatch(packsDataReceived(response));
        if (response.minCardsCount !== currentMinCardsCount) {
          dispatch(packsSetMinCardsCountFilter(response.minCardsCount));
        }
        if (response.maxCardsCount !== currentMaxCardsCount) {
          dispatch(packsSetMaxCardsCountFilter(response.maxCardsCount));
        }
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
