import { auth } from 'store/asyncActions/auth';
import { setPacksData } from 'store/asyncActions/packs';
import { appInitialized, appIsBusy } from 'store/reducers/app';
import { AppDispatch, RootState } from 'store/types';

export const initializeApp =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(appIsBusy(true));
    const { cardPacksTotalCount } = getState().packs;
    try {
      const list: Promise<any>[] = [dispatch(auth())];
      await Promise.all(list);
      const authorized = getState().login.isLoggedIn;
      if (authorized && !cardPacksTotalCount) {
        // I wanted to get common data with this request (totalCount, max, min) and override default items per page count (4)
        // causes multiple requests with the same token (possibly set navigate after login to 'profile')
        // dispatch(setPacksData());
      }
    } catch (error) {
      console.log(error);
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
//     })
//     .finally(() => {
//       dispatch(appIsBusy(false));
//       dispatch(appInitialized(true));
//     });
// };
