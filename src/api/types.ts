export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginResponseType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: false;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
  error?: string;
  avatar?: string;
};

export type LogoutResponseType = {
  info: string;
  error: string;
};

type PackOnServerType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
};

export type PackDataOnServerType = {
  cardPacks: PackOnServerType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};

export type SortParameterType =
  | '0updated'
  | '1updated'
  | '0cardsCount'
  | '1cardsCount'
  | '0user_name'
  | '1user_name';

export type GetPacksRequestParametersType = {
  packName?: 'english' | 'russian'; // wtf?
  min?: number;
  max?: number;
  sortPacks?: SortParameterType;
  page?: number;
  pageCount?: number; // number of items per page
  user_id?: string;
};

export type CreatePackRequestParametersType = {
  name: string; // also is not mandatory
  private?: boolean;
  path?: string; // folder ?
  grade?: number;
  type?: string;
  deckCover?: string;
};

export type ServerErrorMessageType = {
  error: string;
  errorObject: boolean;
  in: string;
  info: string;
};
