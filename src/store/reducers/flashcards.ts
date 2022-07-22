import { FlashcardOnServerDataType, FlashcardOnServerType } from 'api/types';

// type flashcardsSliceInitialStateType = {
//   cards: FlashcardOnServerType[];
//   packUserId: string;
//   page: number;
//   pageCount: number;
//   cardsTotalCount: number;
//   minGrade: number;
//   maxGrade: number;
//   token: string;
//   tokenDeathTime: number;
//   minGradeFilter: number;
//   maxGradeFilter: number;
//   keyWordsFilter: string;
// };

const initialState = {
  cards: [] as FlashcardOnServerType[],
  packUserId: '',
  page: 1,
  pageCount: 10,
  cardsTotalCount: 0,
  minGrade: 0,
  maxGrade: 5,
  token: '',
  tokenDeathTime: 0,
  minGradeFilter: 0,
  maxGradeFilter: 5,
  keywordsFilter: '',
  packName: '',
  answerKeywordsFilter: '',
  questionKeywordsFilter: '',
};

type initialStateType = typeof initialState;

type FlashcardsActionType =
  | ReturnType<typeof flashcardsDataReceived>
  | ReturnType<typeof flashcardsKeywordsFilterApplied>
  | ReturnType<typeof flashcardsMaxGradeFilterApplied>
  | ReturnType<typeof flashcardsMinGradeFilterApplied>
  | ReturnType<typeof flashcardsCurrentPageChanged>
  | ReturnType<typeof flashcardsItemsPerPageChanged>
  | ReturnType<typeof flashcardsPackNameDetermined>;

export const flashcards = (
  state: initialStateType = initialState,
  action: FlashcardsActionType,
): initialStateType => {
  switch (action.type) {
    case 'FLASHCARDS/DATA-RECEIVED':
      return { ...state, ...action.payload };
    case 'FLASHCARDS/KEYWORDS-FILTER-APPLIED':
      return { ...state, ...action.payload };
    case 'FLASHCARDS/MAX-GRADE-FILTER-APPLIED':
      return { ...state, ...action.payload };
    case 'FLASHCARDS/MIN-GRADE-FILTER-APPLIED':
      return { ...state, ...action.payload };
    case 'FLASHCARDS/CURRENT-PAGE-CHANGED':
      return { ...state, ...action.payload };
    case 'FLASHCARDS/ITEMS-PER-PAGE-CHANGED':
      return { ...state, ...action.payload };
    case 'FLASHCARDS/PACK-NAME-DETERMINED':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const flashcardsDataReceived = (data: FlashcardOnServerDataType) =>
  ({
    type: 'FLASHCARDS/DATA-RECEIVED',
    payload: data,
  } as const);

export const flashcardsKeywordsFilterApplied = (keywordsFilter: string) =>
  ({
    type: 'FLASHCARDS/KEYWORDS-FILTER-APPLIED',
    payload: {
      keywordsFilter,
    },
  } as const);

export const flashcardsMaxGradeFilterApplied = (maxGradeFilter: number) =>
  ({
    type: 'FLASHCARDS/MAX-GRADE-FILTER-APPLIED',
    payload: {
      maxGradeFilter,
    },
  } as const);

export const flashcardsMinGradeFilterApplied = (minGradeFilter: number) =>
  ({
    type: 'FLASHCARDS/MIN-GRADE-FILTER-APPLIED',
    payload: {
      minGradeFilter,
    },
  } as const);

export const flashcardsCurrentPageChanged = (page: number) =>
  ({
    type: 'FLASHCARDS/CURRENT-PAGE-CHANGED',
    payload: {
      page,
    },
  } as const);

export const flashcardsItemsPerPageChanged = (pageCount: number) =>
  ({
    type: 'FLASHCARDS/ITEMS-PER-PAGE-CHANGED',
    payload: {
      pageCount,
    },
  } as const);

export const flashcardsPackNameDetermined = (packName: string) =>
  ({
    type: 'FLASHCARDS/PACK-NAME-DETERMINED',
    payload: {
      packName,
    },
  } as const);
