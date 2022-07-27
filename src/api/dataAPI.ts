import { axiosInstance } from 'api/config';
import {
  CreateFlashcardParameterType,
  CreatePackParameterType,
  CreatePackResponseType,
  FlashcardOnServerDataType,
  GetFlashcardsParameterType,
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
      .get<PackDataOnServerType>('cards/pack', { params: cleanParameters })
      .then(response => response.data);
  },
  getFlashcards(requestParameters: GetFlashcardsParameterType) {
    const cleanParameters: GetFlashcardsParameterType =
      clearObjectEmptyProperties(requestParameters);
    return axiosInstance
      .get<FlashcardOnServerDataType>('cards/card', {
        params: cleanParameters,
      })
      .then(response => response.data);
  },
  postPack(requestParameter: CreatePackParameterType) {
    return axiosInstance
      .post<CreatePackResponseType>('cards/pack', { cardsPack: requestParameter })
      .then(response => response.data);
  },
  postFlashcard(requestParameter: CreateFlashcardParameterType) {
    return axiosInstance.post('cards/card', { card: requestParameter });
  },
  putPackData(data: PutPackDataType) {
    return axiosInstance.put<PutPackDataResponseType>(`cards/pack`, {
      cardsPack: data,
      // cardsPack: { ...data },
    });
  },
  putFlashcardData(data: PutFlashcardDataType) {
    return axiosInstance.put<PutFlashcardDataResponseType>('cards/card', {
      card: data,
      // card: { ...data },
    });
  },
  deletePack(id: string) {
    return axiosInstance.delete(`cards/pack?id=${id}`);
  },
  deleteFlashcard(id: string) {
    return axiosInstance.delete(`cards/card?id=${id}`);
  },
};
