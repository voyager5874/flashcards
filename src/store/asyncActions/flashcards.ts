import { dataAPI } from 'api';
import {
  CreateFlashcardParameterType,
  GetFlashcardParameterType,
  PutFlashcardDataType,
} from 'api/types';
import { appIsBusy, setAppMessage } from 'store/reducers/app';
import { flashcardsDataReceived } from 'store/reducers/flashcards';
import { AppDispatch } from 'store/types';
import { processAsyncActionErrors } from 'utils';

export const setFlashcardsData =
  (requestParameters: GetFlashcardParameterType) => async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    try {
      const response = await dataAPI.getFlashcards(requestParameters);
      if (response.token) {
        dispatch(flashcardsDataReceived(response));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error getting flashcards');
    } finally {
      dispatch(appIsBusy(false));
    }
  };

export const createFlashcard =
  (
    newCardData: CreateFlashcardParameterType,
    packId: string,
    viewSettings: GetFlashcardParameterType,
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));

    try {
      const response = await dataAPI.postFlashcard(newCardData);
      if (response.data.token) {
        // const {
        //   page,
        //   pageCount,
        //   answerKeywordsFilter,
        //   questionKeywordsFilter,
        //   minGradeFilter,
        //   maxGradeFilter,
        // } = getState().flashcards;
        await dispatch(setFlashcardsData(viewSettings));
        dispatch(setAppMessage('flashcard created successfully'));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error creating flashcard');
    } finally {
      dispatch(appIsBusy(false));
    }
  };

export const updateFlashcard =
  (data: PutFlashcardDataType, viewSettings: GetFlashcardParameterType) =>
  async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));

    try {
      const response = await dataAPI.putFlashcardData(data);
      if (response.statusText === 'OK') {
        dispatch(setFlashcardsData(viewSettings));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error updating the flashcard');
    } finally {
      dispatch(appIsBusy(false));
    }
  };

export const deleteFlashcard =
  (id: string, viewSettings: GetFlashcardParameterType) =>
  async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    try {
      const response = await dataAPI.deleteFlashcard(id);
      if (response.statusText === 'OK') {
        await dispatch(setFlashcardsData(viewSettings));
        dispatch(setAppMessage('flashcard deleted successfully'));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error deleting flashcard');
    } finally {
      dispatch(appIsBusy(false));
    }
  };
