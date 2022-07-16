import { auth } from 'store/asyncActions/auth';
import { setPacksData } from 'store/asyncActions/packs';
import { appInitialized, appIsBusy } from 'store/reducers/app';
import { AppDispatch, RootState } from 'store/types';
import { processAsyncActionErrors } from 'utils';

export const initializeApp =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(appIsBusy(true));
    try {
      // const list: Promise<any>[] = [dispatch(auth()), dispatch(setPacksData({}))];
      const list: Promise<any>[] = [dispatch(auth())];
      await Promise.all(list);
      // if (getState().packs.maxCardsCount !== null) {
      //   console.log(getState().packs.maxCardsCount);
      //   dispatch(packsSetMaxCardsCountFilter(getState().packs.maxCardsCount!));
      // }
      // if (getState().packs.minCardsCount !== null) {
      //   dispatch(packsSetMinCardsCountFilter(getState().packs.minCardsCount));
      // }
    } catch (error) {
      // if (error instanceof AxiosError) {
      //   const errorMessage = error?.response?.data?.error ?? error.message;
      //   dispatch(appErrorOccurred(errorMessage));
      // } else {
      //   dispatch(appErrorOccurred('there was some error during app initialization'));
      // }
      processAsyncActionErrors(
        error,
        dispatch,
        'there was some error during app initialization',
      );
    } finally {
      dispatch(appIsBusy(false));
      dispatch(appInitialized(true));
    }
  };
