import { dataAPI } from 'api';
import { CreateFlashcardParameterType, GetFlashcardParameterType } from 'api/types';
import { appIsBusy, setAppMessage } from 'store/reducers/app';
import { flashcardsDataReceived } from 'store/reducers/flashcards';
import { AppDispatch, RootState } from 'store/types';
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
  (newCardData: CreateFlashcardParameterType, packId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(appIsBusy(true));

    try {
      const response = await dataAPI.postFlashcard(newCardData);
      if (response.data.token) {
        dispatch(setAppMessage('flashcard added successfully'));
        const {
          page,
          pageCount,
          answerKeywordsFilter,
          questionKeywordsFilter,
          minGradeFilter,
          maxGradeFilter,
        } = getState().flashcards;
        dispatch(
          setFlashcardsData({
            cardsPack_id: packId,
            page,
            pageCount,
            cardAnswer: answerKeywordsFilter,
            cardQuestion: questionKeywordsFilter,
            max: maxGradeFilter,
            min: minGradeFilter,
          }),
        );
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error creating flashcard');
    } finally {
      dispatch(appIsBusy(false));
    }
  };
