import { Nullable } from 'types';

export type UserType = {
  _id: Nullable<string>;
  email: Nullable<string>;
  rememberMe: Nullable<boolean>;
  isAdmin: Nullable<boolean>;
  name: Nullable<string>;
  verified: Nullable<boolean>;
  publicCardPacksCount: Nullable<number>;
  created: Nullable<string>;
  updated: Nullable<string>;
  __v: Nullable<number>;
  token: Nullable<string>;
  tokenDeathTime: Nullable<number>;
  avatar?: string;
};
