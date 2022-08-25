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
  PutFlashcardGradeParameterType,
  PutFlashcardGradeResponseType,
  PutPackDataResponseType,
  PutPackDataType,
} from 'api/types';
import { stripObjectEmptyProperties } from 'utils';

export const dataAPI = {
  getPacks(requestParameters: GetPacksParameterType) {
    const cleanParameters: GetPacksParameterType =
      stripObjectEmptyProperties(requestParameters);
    return axiosInstance
      .get<PackDataOnServerType>('cards/pack', { params: cleanParameters })
      .then(response => response.data);
  },
  getFlashcards(getRequestParameters: GetFlashcardsParameterType) {
    const cleanParameters: GetFlashcardsParameterType =
      stripObjectEmptyProperties(getRequestParameters);
    return axiosInstance
      .get<FlashcardOnServerDataType>('cards/card', {
        params: cleanParameters,
      })
      .then(response => response.data);
  },
  postPack(newPackData: CreatePackParameterType) {
    const cleanData = stripObjectEmptyProperties(newPackData);
    return axiosInstance
      .post<CreatePackResponseType>('cards/pack', { cardsPack: cleanData })
      .then(response => response.data);
  },
  postFlashcard(newCardData: CreateFlashcardParameterType) {
    const cleanData = stripObjectEmptyProperties(newCardData);
    return axiosInstance.post('cards/card', { card: cleanData });
  },
  putPackData(data: PutPackDataType) {
    return axiosInstance.put<PutPackDataResponseType>(`cards/pack`, {
      cardsPack: data,
    });
  },
  putFlashcardData(data: PutFlashcardDataType) {
    return axiosInstance.put<PutFlashcardDataResponseType>('cards/card', {
      card: data,
    });
  },
  putFlashcardGrade(data: PutFlashcardGradeParameterType) {
    return axiosInstance.put<PutFlashcardGradeResponseType>('cards/grade', data);
  },
  deletePack(id: string) {
    return axiosInstance.delete(`cards/pack?id=${id}`);
  },
  deleteFlashcard(id: string) {
    return axiosInstance.delete(`cards/card?id=${id}`);
  },
};
