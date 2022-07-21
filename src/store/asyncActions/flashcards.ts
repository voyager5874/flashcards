import { dataAPI } from 'api';
import { GetFlashcardParameterType } from 'api/types';
import { flashcardsDataReceived } from 'store/reducers/flashcards';
import { AppDispatch } from 'store/types';
import { processAsyncActionErrors } from 'utils';

export const setFlashcardsData =
  (requestParameters: GetFlashcardParameterType) => async (dispatch: AppDispatch) => {
    try {
      const response = await dataAPI.getFlashcards(requestParameters);
      if (response.data.token) {
        dispatch(flashcardsDataReceived(response.data));
      }
    } catch (error) {
      processAsyncActionErrors(error, dispatch, 'error getting flashcards');
    }
  };