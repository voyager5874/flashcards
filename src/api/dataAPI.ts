import { axiosInstance } from 'api/config';
import {
  CreateFlashcardParameterType,
  CreatePackParameterType,
  CreatePackResponseType,
  FlashcardOnServerDataType,
  GetFlashcardParameterType,
  GetPacksParameterType,
  PackDataOnServerType,
  PutFlashcardDataResponseType,
  PutFlashcardDataType,
  PutPackDataResponseType,
  PutPackDataType,
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
  putPackData(data: PutPackDataType) {
    return axiosInstance.put<PutPackDataResponseType>(`cards/pack`, {
      cardsPack: { ...data },
    });
  },
  putFlashcardData(data: PutFlashcardDataType) {
    return axiosInstance.put<PutFlashcardDataResponseType>('cards/card', {
      card: { ...data },
    });
  },
  deletePack(id: string) {
    return axiosInstance.delete(`cards/pack?id=${id}`);
  },
  deleteFlashcard(id: string) {
    return axiosInstance.delete(`cards/card?id=${id}`);
  },
};
