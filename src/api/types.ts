export type LoginParameterType = {
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
  error?: string;
};

export type PackOnServerType = {
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

export type FlashcardOnServerType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
  answerImg: string;
  answerVideo: string;
  questionImg: string;
  questionVideo: string;
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

export type PacksSortParameterType = keyof PackOnServerType;
// | '0updated'
// | '1updated'
// | '0cardsCount'
// | '1cardsCount'
// | '0user_name'
// | '1user_name';

export type FlashcardOnServerDataType = {
  cards: FlashcardOnServerType[];
  packUserId: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
  token: string;
  tokenDeathTime: number;
};

export type GetPacksParameterType = {
  packName?: string; // just search within pack names string
  min?: number;
  max?: number;
  sortPacks?: PacksSortParameterType;
  page?: number;
  pageCount?: number; // number of items per page
  user_id?: string;
};

export type CardsSortParameterType = keyof FlashcardOnServerType;

export type GetFlashcardParameterType = {
  cardsPack_id: string;
  cardAnswer?: string;
  cardQuestion?: string;
  min?: number | string;
  max?: number | string;
  sortCards?: CardsSortParameterType;
  page: number | string;
  pageCount: number | string;
};

export type CreatePackParameterType = {
  cardsPack: {
    name: string; // 'No name' by default
    deckCover?: string;
    private?: boolean;
    // path?: string; // folder ?
    // grade?: number; // wtf?
    // type?: string;
  };
};

export type CreatePackResponseType = {
  newCardsPack: {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string; // "/def",
    grade: number;
    shots: number;
    deckCover: string;
    cardsCount: number;
    type: string; // "pack",
    rating: number;
    created: string; // "2022-07-05T15:40:59.191Z",
    updated: string;
    more_id: string;
    __v: number;
  };
  token: string;
  tokenDeathTime: number; // 1657640459095
};

export type CreateFlashcardParameterType = {
  card: {
    cardsPack_id: string;
    question?: string; // если не отправить будет 'no question'
    answer?: string; // если не отправить будет 'no answer'
    // grade?: number; // 0..5, computed by backend?
    // shots?: number; // computed by backend?
    answerImg?: string;
    questionImg?: string;
    questionVideo?: string;
    answerVideo?: string;
  };
};

export type CreateFlashcardResponseType = {
  newCard: {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    comments: string;
    type: string; // "card",
    rating: number;
    more_id: string;
    created: string; // "2022-07-05T16:59:40.845Z",
    updated: string; // "2022-07-05T16:59:40.845Z",
    __v: number;
  };
  token: string;
  tokenDeathTime: number; // 1657645180657
};

export type UpdateProfileParameterType = {
  name?: string;
  avatar?: string;
};

export type UpdateProfileResponseType = {
  updatedUser: {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
    token: string;
    tokenDeathTime: number;
    avatar: string;
  };
  token: string;
  tokenDeathTime: number;
  error?: string;
};

export type SignUpParameterType = {
  email: string;
  password: string;
};

export type SignUpResponseType = {
  addedUser: {
    _id: string;
    email: string;
    rememberMe: false;
    isAdmin: false;
    name: string;
    verified: false;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
  };
  error?: string;
};

export type PasswordForgottenRequestDataType = {
  email: string; // кому восстанавливать пароль
  from: string; // можно указать разработчика фронта)
  message: string; // хтмп-письмо, вместо $token$ бэк вставит токен
};

export type PasswordForgottenParameterType = {
  email: string;
  senderName: string;
  senderEmail: string;
  origin: string;
};

export type PasswordForgottenResponseType = {
  info: string;
  error?: string;
};

export type ResetPasswordParameterType = {
  password: string;
  resetPasswordToken: string;
};

export type ResetPasswordResponseType = {
  info: string;
  error?: string;
};

export type ServerErrorMessageType = {
  error: string;
  errorObject: boolean;
  in: string;
  info: string;
};

export type PutPackDataType = {
  _id: string;
  // user_id: string;
  // user_name: number;
  private?: boolean;
  name?: string;
  path?: string;
  // grade: number;
  // shots: number;
  deckCover?: string;
  // cardsCount: number;
  // type: string;
  // rating: number;
  // more_id: string;
  // __v: number;
};

export type PutPackDataResponseType = {
  updatedCardsPack: {
    _id: string;
    user_id: string;
    user_name: number;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    deckCover: string;
    cardsCount: number;
    type: string;
    rating: number;
    created: string; // "2022-07-05T20:57:42.943Z",
    updated: string; // "2022-07-24T17:59:20.965Z",
    more_id: string;
    __v: number;
  };
  token: string;
  tokenDeathTime: number; // 1659290360772
};

export type PutFlashcardDataType = {
  _id: string;
  cardsPack_id?: string;
  // user_id: string;
  answer?: string;
  question?: string;
  // grade: number;
  // shots: number;
  // comments: string;
  // type: string;
  // rating: number;
  // more_id: string;
  // created: string;
  // updated: string;
  // __v: number;
  answerImg?: string;
  answerVideo?: string;
  questionImg?: string;
  questionVideo?: string;
};

export type PutFlashcardDataResponseType = {
  updatedCard: {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
    answerImg: string;
    answerVideo: string;
    questionImg: string;
    questionVideo: string;
  };
  token: string;
  tokenDeathTime: number;
};
