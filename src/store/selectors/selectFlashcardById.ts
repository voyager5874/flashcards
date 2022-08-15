import { FlashcardType } from 'api/types';
import { FIRST_ITEM_INDEX, ZERO_LENGTH } from 'const';
import { RootState } from 'store/types';

export const selectFlashcardById = (state: RootState, cardId: string): FlashcardType => {
  const notFound: FlashcardType = {
    _id: cardId,
    question: 'unknown',
    answer: 'unknown',
    __v: 0,
    created: 'unknown',
    grade: 0,
    type: 'card',
    rating: 0,
    more_id: '',
    shots: 0,
    updated: '',
    user_id: 'unknown',
    cardsPack_id: 'unknown',
    comments: '',
  };
  if (!cardId) return notFound;
  const result = state.flashcards.cards.filter(card => card._id === cardId);
  return result.length > ZERO_LENGTH ? result[FIRST_ITEM_INDEX] : notFound;
};
