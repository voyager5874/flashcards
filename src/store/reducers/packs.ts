import { PackDataOnServerType, PackOnServerType } from 'api/types';
import { PackInAppType } from 'features/Pack/types';
import { Nullable } from 'types';

type InitialStateType = {
  cardPacks: PackInAppType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: Nullable<number>;
  minCardsCount: number;
  maxCardsCount: Nullable<number>;
  token: Nullable<string>;
  tokenDeathTime: Nullable<number>;
  minCardsCountFilter: number;
  maxCardsCountFilter: number;
  packsOfCurrentUserFilter: boolean;
  packNameFilter: string;
};

const initialState: InitialStateType = {
  cardPacks: [],
  page: 1,
  pageCount: 10,
  cardPacksTotalCount: null,
  minCardsCount: 0,
  maxCardsCount: null,
  token: null,
  tokenDeathTime: null,
  minCardsCountFilter: 0,
  maxCardsCountFilter: 10,
  packsOfCurrentUserFilter: false,
  packNameFilter: '',
};

type PacksActionType =
  | ReturnType<typeof packsDataReceived>
  | ReturnType<typeof packsNewPackCreated>
  | ReturnType<typeof packsSetItemsPerPage>
  | ReturnType<typeof packsSetMinCardsCountFilter>
  | ReturnType<typeof packsSetMaxCardsCountFilter>
  | ReturnType<typeof packsCurrentPageChanged>
  | ReturnType<typeof packsSetCurrentUserPacksFilter>
  | ReturnType<typeof packsSetPackNameFilter>;

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
    case 'PACKS/SET-CURRENT-USER-PACKS-FILTER':
      return { ...state, ...action.payload };
    case 'PACKS/CURRENT-PAGE-CHANGED':
      return { ...state, ...action.payload };
    case 'PACKS/SET-PACK-NAME-FILTER':
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

export const packsNewPackCreated = (pack: PackOnServerType) =>
  ({
    type: 'PACKS/NEW-PACK-CREATED',
    payload: {
      ...pack,
    },
  } as const);

export const packsSetItemsPerPage = (pageCount: number) =>
  ({
    type: 'PACKS/SET-ITEMS-PER-PAGE',
    payload: {
      pageCount,
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

export const packsSetCurrentUserPacksFilter = (packsOfCurrentUserFilter: boolean) =>
  ({
    type: 'PACKS/SET-CURRENT-USER-PACKS-FILTER',
    payload: {
      packsOfCurrentUserFilter,
    },
  } as const);

export const packsSetPackNameFilter = (packNameFilter: string) =>
  ({
    type: 'PACKS/SET-PACK-NAME-FILTER',
    payload: {
      packNameFilter,
    },
  } as const);
