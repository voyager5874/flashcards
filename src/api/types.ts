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
};

export type LogoutResponseType = {
  info: string;
  error: string;
};
