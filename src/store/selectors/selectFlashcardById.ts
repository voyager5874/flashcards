import { createSelector } from '@reduxjs/toolkit';

import { FlashcardType } from 'api/types';
import { FIRST_ITEM_INDEX, ZERO_LENGTH } from 'const';
import { RootState } from 'store/types';
import { Nullable } from 'types';

// entity factory
const createFlashcard = (data: Partial<FlashcardType> = {}): FlashcardType => ({
  _id: '',
  question: '',
  answer: '',
  __v: 0,
  created: '',
  grade: 0,
  type: 'card',
  rating: 0,
  more_id: '',
  shots: 0,
  updated: '',
  user_id: '',
  cardsPack_id: '',
  comments: '',
  ...data,
});

const selectById = (state: RootState, cardId: string): Nullable<FlashcardType> => {
  if (!cardId) return null;
  const result = state.flashcards.cards.filter(card => card._id === cardId);
  return result.length > ZERO_LENGTH ? result[FIRST_ITEM_INDEX] : null;
};

export const selectFlashcardById = createSelector(
  [selectById],
  (card): Nullable<FlashcardType> => card,
);
