import { UserType } from 'features/user/types';

// type InitialStateType = Omit<UserType, "__v" | "rememberMe">
type InitialStateType = UserType;

const initialState: InitialStateType = {
  _id: null,
  email: null,
  rememberMe: null,
  isAdmin: null,
  name: null,
  verified: null,
  publicCardPacksCount: null,
  created: null,
  updated: null,
  __v: null,
  token: null,
  tokenDeathTime: null,
};

type ProfileActionType = ReturnType<typeof profileDataReceived>;

export const profile = (
  state: InitialStateType = initialState,
  action: ProfileActionType,
): InitialStateType => {
  switch (action.type) {
    case 'PROFILE/DATA-RECEIVED':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const profileDataReceived = (data: UserType) =>
  ({
    type: 'PROFILE/DATA-RECEIVED',
    payload: {
      ...data,
    },
  } as const);
