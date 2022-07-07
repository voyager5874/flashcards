import { Nullable } from 'types';

export type PackInAppType = {
  _id: Nullable<string>;
  user_id: Nullable<string>;
  user_name: Nullable<string>;
  private: Nullable<boolean>;
  name: Nullable<string>;
  path: Nullable<string>;
  grade: Nullable<number>;
  shots: Nullable<number>;
  cardsCount: Nullable<number>;
  type: Nullable<string>;
  rating: Nullable<number>;
  created: Nullable<string>;
  updated: Nullable<string>;
  more_id: Nullable<string>;
  __v: Nullable<number>;
};
