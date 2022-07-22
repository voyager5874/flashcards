import { axiosInstance } from 'api/config';
import {
  FlashcardOnServerDataType,
  GetFlashcardParameterType,
  GetPacksParameterType,
  PackDataOnServerType,
} from 'api/types';
import { clearObjectEmptyProperties } from 'utils';

export const dataAPI = {
  getPacks(requestParameters: GetPacksParameterType) {
    const cleanParameters: GetPacksParameterType =
      clearObjectEmptyProperties(requestParameters);
    return axiosInstance
      .get<PackDataOnServerType>('cards/pack', { params: { ...cleanParameters } })
      .then(response => response.data);
  },
  getFlashcards(requestParameters: GetFlashcardParameterType) {
    const cleanParameters: GetFlashcardParameterType =
      clearObjectEmptyProperties(requestParameters);
    return axiosInstance
      .get<FlashcardOnServerDataType>('cards/card', {
        params: { ...cleanParameters },
      })
      .then(response => response.data);
  },
};
