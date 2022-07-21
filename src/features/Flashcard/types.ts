import { Nullable } from 'types';

// export type FlashcardInAppType = {
//   _id: Nullable<string>;
//   cardsPack_id: Nullable<string>;
//   user_id: Nullable<string>;
//   answer: Nullable<string>;
//   question: Nullable<string>;
//   grade: Nullable<number>;
//   shots: Nullable<number>;
//   comments: Nullable<string>;
//   type: Nullable<string>;
//   rating: Nullable<number>;
//   more_id: Nullable<string>;
//   created: Nullable<string>;
//   updated: Nullable<string>;
//   __v: Nullable<number>;
// };

export type FlashcardInAppType = {
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
};
