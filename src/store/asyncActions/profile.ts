import { ChangeEvent } from 'react';

import { authAPI } from 'api';
import { UpdateProfileParameterType } from 'api/types';
import { appErrorOccurred, appIsBusy } from 'store/reducers/app';
import { profileDataReceived } from 'store/reducers/profile';
import { AppDispatch } from 'store/types';
import { processAsyncActionErrors, toBase64, validateImage } from 'utils';

export const setUpdatedProfileData =
  (data: UpdateProfileParameterType) => async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    try {
      const response = await authAPI.updateProfile(data);
      if (!response.error) {
        dispatch(profileDataReceived(response.updatedUser));
      } else if (response.error) {
        dispatch(appErrorOccurred(response.error));
      }
    } catch (error) {
      processAsyncActionErrors(
        error,
        dispatch,
        'there was some error during profile update',
      );
    } finally {
      dispatch(appIsBusy(false));
    }
  };

export const uploadAvatar =
  (dataFromInput: ChangeEvent<HTMLInputElement>) => async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    try {
      const response = await toBase64(dataFromInput);
      const validImage = await validateImage(response);
      // await dispatch(setUpdatedProfileData({ avatar: response }));
      if (validImage) {
        await dispatch(setUpdatedProfileData({ avatar: response }));
      } else {
        dispatch(appErrorOccurred('not an image file'));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error during conversion to base64');
    } finally {
      dispatch(appIsBusy(false));
    }
  };
