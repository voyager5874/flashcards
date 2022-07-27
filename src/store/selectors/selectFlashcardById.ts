import { FIRST_ITEM_INDEX, ZERO_LENGTH } from 'const';
import { FlashcardInAppType } from 'features/Flashcard/types';
import { RootState } from 'store/types';

export const selectFlashcardById = (
  state: RootState,
  cardId: string,
): FlashcardInAppType => {
  const notFound: FlashcardInAppType = {
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
  // eslint-disable-next-line no-underscore-dangle
  const result = state.flashcards.cards.filter(card => card._id === cardId);
  return result.length > ZERO_LENGTH ? result[FIRST_ITEM_INDEX] : notFound;
};
