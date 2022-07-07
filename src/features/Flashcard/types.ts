import { Nullable } from 'types';

export type FlashcardType = {
  _id: Nullable<string>;
  cardsPack_id: Nullable<string>;
  user_id: Nullable<string>;
  answer: Nullable<string>;
  question: Nullable<string>;
  grade: Nullable<number>;
  shots: Nullable<number>;
  comments: Nullable<string>;
  type: Nullable<string>;
  rating: Nullable<number>;
  more_id: Nullable<string>;
  created: Nullable<string>;
  updated: Nullable<string>;
  __v: Nullable<number>;
};
