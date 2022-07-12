const initialState = {
  isLoggedIn: false,
};

type LoginReducerStateType = typeof initialState;

export type LoginReducerActionType = ReturnType<typeof loginStateChanged>;

export const login = (
  state: LoginReducerStateType = initialState,
  action: LoginReducerActionType,
) => {
  switch (action.type) {
    case 'LOGIN/LOGIN-STATE-CHANGED':
      return { ...state, isLoggedIn: action.loginStatus };
    default:
      return state;
  }
};

export const loginStateChanged = (loginStatus: boolean) =>
  ({
    type: 'LOGIN/LOGIN-STATE-CHANGED',
    loginStatus,
  } as const);
