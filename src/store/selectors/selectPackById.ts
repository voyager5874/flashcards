import { FIRST_ITEM_INDEX, ZERO_LENGTH } from 'const';
import { PackInAppType } from 'features/Pack/types';
import { RootState } from 'store/types';

export const selectPackById = (
  state: RootState,
  packId: string | undefined | null,
): PackInAppType => {
  const notFound: PackInAppType = {
    name: null,
    _id: packId || 'no pack id provided',
    user_name: null,
    type: 'pack',
    created: null,
    updated: null,
    __v: 0,
    cardsCount: null,
    grade: null,
    path: null,
    more_id: null,
    private: null,
    rating: null,
    shots: null,
    user_id: null,
  };
  if (!packId) return notFound;
  const result = state.packs.cardPacks.filter(pack => pack._id === packId);
  return result.length > ZERO_LENGTH ? result[FIRST_ITEM_INDEX] : notFound;
};
