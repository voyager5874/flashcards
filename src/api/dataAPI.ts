import { axiosInstance } from 'api/config';
import {
  CreateFlashcardParameterType,
  CreatePackParameterType,
  CreatePackResponseType,
  FlashcardOnServerDataType,
  GetFlashcardParameterType,
  GetPacksParameterType,
  PackDataOnServerType,
  PackOnServerType,
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
  postPack(requestParameter: CreatePackParameterType) {
    return axiosInstance
      .post<CreatePackResponseType>('cards/pack', requestParameter)
      .then(response => response.data);
  },
  postFlashcard(requestParameter: CreateFlashcardParameterType) {
    return axiosInstance.post('cards/card', requestParameter);
  },
};
