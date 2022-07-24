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

export const createPack =
  (packData: CreatePackParameterType, viewSettings: GetPacksParameterType) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await dataAPI.postPack(packData);
      if (response.token) {
        await dispatch(setPacksData(viewSettings));
        dispatch(setAppMessage('new pack created successfully'));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error creating new pack');
    }
  };

export const updatePack =
  (data: PutPackDataType, currentViewSettings: GetPacksParameterType) =>
  async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    try {
      const response = await dataAPI.putPackData(data);
      if (response.statusText === 'OK') {
        // just trying another approach with response codes
        await dispatch(setPacksData(currentViewSettings));
        dispatch(setAppMessage('pack updated successfully'));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error updating the pack');
    } finally {
      dispatch(appIsBusy(false));
    }
  };

export const deletePack =
  (id: string, viewSettings: GetPacksParameterType) => async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    try {
      const response = await dataAPI.deletePack(id);
      if (response.statusText === 'OK') {
        await dispatch(setPacksData(viewSettings));
        dispatch(setAppMessage('the pack deleted successfully'));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error deleting the pack');
    } finally {
      dispatch(appIsBusy(false));
    }
  };
