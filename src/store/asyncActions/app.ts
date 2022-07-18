import { log } from 'util';

import { auth } from 'store/asyncActions/auth';
import { setPacksData } from 'store/asyncActions/packs';
import { appInitialized, appIsBusy } from 'store/reducers/app';
import { AppDispatch } from 'store/types';
import { processAsyncActionErrors } from 'utils';

// export const initializeApp = () => async (dispatch: AppDispatch) => {
//   dispatch(appIsBusy(true));
//   try {
//     // const list: Promise<any>[] = [dispatch(auth()), dispatch(setPacksData({}))];
//     const list: Promise<any>[] = [dispatch(auth())];
//     const result = await Promise.all(list);
//     console.log(result);
//     if (!result[0].error) {
//       dispatch(setPacksData({}));
//     }
//   } catch (error) {
//     processAsyncActionErrors(
//       error,
//       dispatch,
//       'there was some error during app initialization',
//     );
//   } finally {
//     dispatch(appIsBusy(false));
//     dispatch(appInitialized(true));
//   }
// };

export const initializeApp = () => async (dispatch: AppDispatch) => {
  dispatch(appIsBusy(true));
  const list: Promise<any>[] = [dispatch(auth())];
  Promise.all(list)
    .then(res => {
      dispatch(setPacksData({}));
    })
    .finally(() => {
      dispatch(appIsBusy(false));
      dispatch(appInitialized(true));
    });
};
