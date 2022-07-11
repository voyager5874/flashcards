import { AxiosError } from 'axios';

import { authAPI } from 'api';
import { UpdateProfileParameterType } from 'api/types';
import { appErrorOccurred, appIsBusy } from 'store/reducers/app';
import { profileDataReceived } from 'store/reducers/profile';
import { AppDispatch } from 'store/types';

export const setUpdatedProfileData =
  (data: UpdateProfileParameterType) => async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    try {
      const response = await authAPI.updateProfile(data);
      // eslint-disable-next-line no-debugger
      debugger;
      if (!response.error) {
        dispatch(profileDataReceived(response.updatedUser));
      } else if (response.error) {
        dispatch(appErrorOccurred(response.error));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error?.response?.data?.error ?? error.message;
        dispatch(appErrorOccurred(errorMessage));
      } else {
        dispatch(appErrorOccurred('there was some error during profile update'));
      }
    } finally {
      dispatch(appIsBusy(false));
    }
  };
