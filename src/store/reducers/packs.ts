import { PackDataOnServerType } from 'api/types';
import { PackInAppType } from 'features/Pack/types';
import { Nullable } from 'types';

type InitialStateType = {
  cardPacks: PackInAppType[];
  page: number;
  pageCount: Nullable<number>;
  cardPacksTotalCount: Nullable<number>;
  minCardsCount: number;
  maxCardsCount: Nullable<number>;
  token: Nullable<string>;
  tokenDeathTime: Nullable<number>;
};

const initialState: InitialStateType = {
  cardPacks: [],
  page: 1,
  pageCount: null,
  cardPacksTotalCount: null,
  minCardsCount: 0,
  maxCardsCount: null,
  token: null,
  tokenDeathTime: null,
};

type PacksActionType =
  | ReturnType<typeof packsDataReceived>
  | ReturnType<typeof newPackCreated>;

export const packs = (
  state: InitialStateType = initialState,
  action: PacksActionType,
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/DATA-RECEIVED':
      return { ...action.payload };
    case 'PACKS/NEW-PACK-CREATED':
      return { ...state, cardPacks: [...state.cardPacks, action.payload] };
    default:
      return state;
  }
};

export const packsDataReceived = (packsData: PackDataOnServerType) =>
  ({
    type: 'PACKS/DATA-RECEIVED',
    payload: packsData,
  } as const);

export const newPackCreated = (pack: PackInAppType) =>
  ({
    type: 'PACKS/NEW-PACK-CREATED',
    payload: pack,
  } as const);
