import { dataAPI } from 'api';
import {
  CreateFlashcardParameterType,
  GetFlashcardsParameterType,
  PutFlashcardDataType,
  PutFlashcardGradeParameterType,
} from 'api/types';
import { appErrorOccurred, appIsBusy, setAppMessage } from 'store/reducers/app';
import {
  flashcardsCardDataUpdated,
  flashcardsCardGradeUpdated,
  flashcardsDataReceived,
} from 'store/reducers/flashcards';
import { AppDispatch, RootState } from 'store/types';
import { processAsyncActionErrors } from 'utils';

export const setFlashcardsData =
  (packId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    // const { isBusy } = getState().appReducer;
    // if (isBusy) {
    //   dispatch(appErrorOccurred('concurrent requests!'));
    //   return;
    // }
    dispatch(appIsBusy(true));
    const {
      page,
      pageCount,
      minGradeFilter,
      maxGradeFilter,
      sorting,
      questionKeywordsFilter,
      answerKeywordsFilter,
    } = getState().flashcards;
    const flashcardPageSettings: GetFlashcardsParameterType = {
      cardsPack_id: packId,
      page,
      pageCount,
      min: minGradeFilter,
      max: maxGradeFilter,
      cardQuestion: questionKeywordsFilter,
      sortCards: sorting,
      cardAnswer: answerKeywordsFilter,
    };
    try {
      const response = await dataAPI.getFlashcards(flashcardPageSettings);
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
  (newCardData: CreateFlashcardParameterType, packId: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));

    try {
      const response = await dataAPI.postFlashcard(newCardData);
      if (response.data.token) {
        await dispatch(setFlashcardsData(packId));
        dispatch(setAppMessage('flashcard created successfully'));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error creating flashcard');
    } finally {
      dispatch(appIsBusy(false));
    }
  };

export const updateFlashcard =
  (data: PutFlashcardDataType, packId: string) => async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    try {
      const response = await dataAPI.putFlashcardData(data);
      if (response.statusText === 'OK') {
        // dispatch(setFlashcardsData(packId));
        dispatch(flashcardsCardDataUpdated(response.data.updatedCard));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error updating the flashcard');
    } finally {
      dispatch(appIsBusy(false));
    }
  };

export const deleteFlashcard =
  (id: string, packId: string) => async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    try {
      const response = await dataAPI.deleteFlashcard(id);
      if (response.statusText === 'OK') {
        await dispatch(setFlashcardsData(packId));
        dispatch(setAppMessage('flashcard deleted successfully'));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error deleting flashcard');
    } finally {
      dispatch(appIsBusy(false));
    }
  };

export const updateFlashcardGrade =
  (data: PutFlashcardGradeParameterType) => async (dispatch: AppDispatch) => {
    dispatch(appIsBusy(true));
    try {
      const response = await dataAPI.putFlashcardGrade(data);
      if (response.statusText === 'OK') {
        dispatch(flashcardsCardGradeUpdated(response.data));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error updating flashcard grade');
    } finally {
      dispatch(appIsBusy(false));
    }
  };
