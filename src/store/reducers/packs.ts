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
  itemsPerPage: number;
  minCardsCountFilter: number;
  maxCardsCountFilter: number;
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
  itemsPerPage: 10,
  minCardsCountFilter: 0,
  maxCardsCountFilter: 10,
};

type PacksActionType =
  | ReturnType<typeof packsDataReceived>
  | ReturnType<typeof packsNewPackCreated>
  | ReturnType<typeof packsSetItemsPerPage>
  | ReturnType<typeof packsSetMinCardsCountFilter>
  | ReturnType<typeof packsSetMaxCardsCountFilter>
  | ReturnType<typeof packsCurrentPageChanged>;

export const packs = (
  state: InitialStateType = initialState,
  action: PacksActionType,
): InitialStateType => {
  switch (action.type) {
    case 'PACKS/DATA-RECEIVED':
      return { ...state, ...action.payload };
    case 'PACKS/NEW-PACK-CREATED':
      return { ...state, cardPacks: [...state.cardPacks, action.payload] };
    case 'PACKS/SET-ITEMS-PER-PAGE':
      return { ...state, ...action.payload };
    case 'PACKS/SET-MIN-CARDS-COUNT-FILTER':
      return { ...state, ...action.payload };
    case 'PACKS/SET-MAX-CARDS-COUNT-FILTER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const packsDataReceived = (packsData: PackDataOnServerType) =>
  ({
    type: 'PACKS/DATA-RECEIVED',
    payload: packsData,
  } as const);

export const packsNewPackCreated = (pack: PackInAppType) =>
  ({
    type: 'PACKS/NEW-PACK-CREATED',
    payload: {
      ...pack,
    },
  } as const);

export const packsSetItemsPerPage = (itemsPerPage: number) =>
  ({
    type: 'PACKS/SET-ITEMS-PER-PAGE',
    payload: {
      itemsPerPage,
    },
  } as const);

export const packsSetMinCardsCountFilter = (minCardsCountFilter: number) =>
  ({
    type: 'PACKS/SET-MIN-CARDS-COUNT-FILTER',
    payload: {
      minCardsCountFilter,
    },
  } as const);

export const packsSetMaxCardsCountFilter = (maxCardsCountFilter: number) =>
  ({
    type: 'PACKS/SET-MAX-CARDS-COUNT-FILTER',
    payload: {
      maxCardsCountFilter,
    },
  } as const);

export const packsCurrentPageChanged = (page: number) =>
  ({
    type: 'PACKS/CURRENT-PAGE-CHANGED',
    payload: {
      page,
    },
  } as const);
