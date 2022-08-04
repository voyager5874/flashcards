import { dataAPI } from 'api';
import {
  CreatePackParameterType,
  GetPacksParameterType,
  PutPackDataType,
} from 'api/types';
import { appErrorOccurred, appIsBusy, setAppMessage } from 'store/reducers/app';
import {
  packsDataReceived,
  packsSetMaxCardsCountFilter,
  packsSetMinCardsCountFilter,
} from 'store/reducers/packs';
import { AppDispatch, RootState } from 'store/types';
import { processAsyncActionErrors } from 'utils';

export const setPacksData =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    // const { isBusy } = getState().appReducer;
    // if (isBusy) return;
    dispatch(appIsBusy(true));
    // eslint-disable-next-line no-underscore-dangle
    const userId = getState().profile._id;
    const {
      page,
      pageCount,
      minCardsCountFilter,
      minCardsCount,
      maxCardsCountFilter,
      maxCardsCount,
      packsOfCurrentUserFilter,
      packNameFilter,
      sorting,
    } = getState().packs;
    const packsPageSettings: GetPacksParameterType = {
      page,
      pageCount,
      min: minCardsCountFilter,
      max: maxCardsCountFilter,
      sortPacks: sorting,
      packName: packNameFilter,
      // @ts-ignore
      user_id: packsOfCurrentUserFilter ? userId : '',
    };
    try {
      const response = await dataAPI.getPacks(packsPageSettings);
      if (response.token) {
        dispatch(packsDataReceived(response));
        if (
          response.minCardsCount !== minCardsCount ||
          minCardsCountFilter >= response.maxCardsCount
        ) {
          dispatch(packsSetMinCardsCountFilter(response.minCardsCount));
        }
        if (response.maxCardsCount !== maxCardsCount) {
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

export const createPack =
  (packData: CreatePackParameterType) => async (dispatch: AppDispatch) => {
    try {
      const response = await dataAPI.postPack(packData);
      if (response.token) {
        await dispatch(setPacksData());
        dispatch(setAppMessage('new pack created successfully'));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error creating new pack');
    }
  };

export const updatePack = (data: PutPackDataType) => async (dispatch: AppDispatch) => {
  dispatch(appIsBusy(true));
  try {
    const response = await dataAPI.putPackData(data);
    if (response.statusText === 'OK') {
      // just trying another approach with response codes
      await dispatch(setPacksData());
      dispatch(setAppMessage('pack updated successfully'));
    }
  } catch (error) {
    processAsyncActionErrors(error, dispatch, 'error updating the pack');
  } finally {
    dispatch(appIsBusy(false));
  }
};

export const deletePack = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(appIsBusy(true));
  try {
    const response = await dataAPI.deletePack(id);
    if (response.statusText === 'OK') {
      await dispatch(setPacksData());
      dispatch(setAppMessage('the pack deleted successfully'));
    }
  } catch (error) {
    processAsyncActionErrors(error, dispatch, 'error deleting the pack');
  } finally {
    dispatch(appIsBusy(false));
  }
};
