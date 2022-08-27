import { createSelector } from '@reduxjs/toolkit';

import { PackType } from 'api/types';
import { FIRST_ITEM_INDEX, ZERO_LENGTH } from 'const';
import { RootState } from 'store/types';

const createPack = (data: Partial<PackType> = {}) => ({
  name: '',
  _id: 'no pack id provided',
  user_name: '',
  type: 'pack',
  created: '',
  updated: '',
  __v: 0,
  cardsCount: 0,
  grade: 0,
  path: '',
  more_id: '',
  private: false,
  rating: 0,
  shots: 0,
  user_id: '',
  ...data,
});

const selectById = (state: RootState, packId: string | undefined | null): PackType => {
  if (!packId) return createPack();
  const result = state.packs.cardPacks.filter(pack => pack._id === packId);
  return result.length > ZERO_LENGTH ? result[FIRST_ITEM_INDEX] : createPack();
};

export const selectPackById = createSelector([selectById], pack => pack);
