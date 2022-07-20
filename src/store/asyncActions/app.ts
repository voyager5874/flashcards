import { auth } from 'store/asyncActions/auth';
import { setPacksData } from 'store/asyncActions/packs';
import { appInitialized, appIsBusy } from 'store/reducers/app';
import { packsSetItemsPerPage } from 'store/reducers/packs';
import { AppDispatch, RootState } from 'store/types';

export const initializeApp =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(appIsBusy(true));
    try {
      const list: Promise<any>[] = [dispatch(auth())];
      await Promise.all(list);
      const authorized = getState().login.isLoggedIn;
      if (authorized) {
        dispatch(packsSetItemsPerPage(10));
        dispatch(setPacksData({ pageCount: 10 }));
      }
    } catch (error) {
      // processAsyncActionErrors(
      //   error,
      //   dispatch,
      //   'there was some error during app initialization',
      // );
    } finally {
      dispatch(appIsBusy(false));
      dispatch(appInitialized(true));
    }
  };

// export const initializeApp = () => async (dispatch: AppDispatch) => {
//   dispatch(appIsBusy(true));
//   const list: Promise<any>[] = [dispatch(auth())];
//   Promise.all(list)
//     .then(res => {
//       dispatch(setPacksData({ pageCount: 10 }));
//       dispatch(packsSetItemsPerPage(10));
//     })
//     .finally(() => {
//       dispatch(appIsBusy(false));
//       dispatch(appInitialized(true));
//     });
// };
