import {
  CardsSortParameterType,
  FlashcardOnServerDataType,
  FlashcardType,
  PutFlashcardDataType,
  PutFlashcardGradeResponseType,
} from 'api/types';

const initialState = {
  cards: [] as FlashcardType[],
  packUserId: '',
  page: 1,
  pageCount: 10,
  cardsTotalCount: 0,
  minGrade: 0,
  maxGrade: 6, // maxGrade=6 comes from server, though it should be 5
  token: '',
  tokenDeathTime: 0,
  minGradeFilter: 0,
  maxGradeFilter: 6,
  keywordsFilter: '',
  answerKeywordsFilter: '',
  questionKeywordsFilter: '',
  sorting: '0updated' as CardsSortParameterType,
};

type initialStateType = typeof initialState;

type FlashcardsActionType =
  | ReturnType<typeof flashcardsDataReceived>
  | ReturnType<typeof flashcardsKeywordsFilterApplied>
  | ReturnType<typeof flashcardsMaxGradeFilterApplied>
  | ReturnType<typeof flashcardsMinGradeFilterApplied>
  | ReturnType<typeof flashcardsCurrentPageChanged>
  | ReturnType<typeof flashcardsItemsPerPageChanged>
  | ReturnType<typeof flashcardsQuestionKeywordsFilterApplied>
  | ReturnType<typeof flashcardsSortingApplied>
  | ReturnType<typeof flashcardsAllFiltersCleared>
  | ReturnType<typeof flashcardsAllDataReset>
  | ReturnType<typeof flashcardsCardDataUpdated>
  | ReturnType<typeof flashcardsCardGradeUpdated>;

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
    case 'FLASHCARDS/QUESTION-KEYWORDS-FILTER-APPLIED':
      return { ...state, ...action.payload };
    case 'FLASHCARDS/SORTING-APPLIED':
      return { ...state, ...action.payload };
    case 'FLASHCARDS/ALL-FILTERS-CLEARED':
      return { ...state, ...action.payload };
    case 'FLASHCARDS/ALL-DATA-RESET':
      return { ...action.payload };
    case 'FLASHCARDS/CARD-DATA-UPDATED':
      return {
        ...state,
        cards: state.cards.map(card =>
          // eslint-disable-next-line no-underscore-dangle
          card._id === action.payload._id ? { ...card, ...action.payload } : card,
        ),
      };
    case 'FLASHCARDS/CARD-GRADE-UPDATED':
      return {
        ...state,
        cards: state.cards.map(card =>
          // eslint-disable-next-line no-underscore-dangle
          card._id === action.payload.card_id
            ? {
                ...card,
                grade: action.payload.grade,
                shots: action.payload.shots,
              }
            : card,
        ),
      };
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

export const flashcardsQuestionKeywordsFilterApplied = (questionKeywordsFilter: string) =>
  ({
    type: 'FLASHCARDS/QUESTION-KEYWORDS-FILTER-APPLIED',
    payload: {
      questionKeywordsFilter,
    },
  } as const);

export const flashcardsSortingApplied = (sorting: CardsSortParameterType) =>
  ({
    type: 'FLASHCARDS/SORTING-APPLIED',
    payload: {
      sorting,
    },
  } as const);

export const flashcardsAllFiltersCleared = () =>
  ({
    type: 'FLASHCARDS/ALL-FILTERS-CLEARED',
    payload: {
      questionKeywordsFilter: '',
      answerKeywordsFilter: '',
      minGradeFilter: 0,
      maxGradeFilter: 5,
    },
  } as const);

export const flashcardsAllDataReset = () =>
  ({
    type: 'FLASHCARDS/ALL-DATA-RESET',
    payload: initialState,
  } as const);

export const flashcardsCardDataUpdated = (data: PutFlashcardDataType) =>
  ({
    type: 'FLASHCARDS/CARD-DATA-UPDATED',
    payload: data,
  } as const);

export const flashcardsCardGradeUpdated = (data: PutFlashcardGradeResponseType) =>
  ({
    type: 'FLASHCARDS/CARD-GRADE-UPDATED',
    payload: { ...data.updatedGrade },
  } as const);
