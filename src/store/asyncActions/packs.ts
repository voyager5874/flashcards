import { dataAPI } from 'api';
import { GetPacksParameterType } from 'api/types';
import { appErrorOccurred, appIsBusy } from 'store/reducers/app';
import {
  packsDataReceived,
  packsSetMaxCardsCountFilter,
  packsSetMinCardsCountFilter,
} from 'store/reducers/packs';
import { AppDispatch, RootState } from 'store/types';
import { processAsyncActionErrors } from 'utils';

export const setPacksData =
  (requestParameters: GetPacksParameterType) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(appIsBusy(true));
    const currentMaxCardsCount = getState().packs.maxCardsCount;
    const currentMinCardsCount = getState().packs.minCardsCount;
    try {
      const response = await dataAPI.getPacks(requestParameters);
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
      processAsyncActionErrors(error, dispatch, 'error getting packs from the server');
    } finally {
      dispatch(appIsBusy(false));
    }
  };
