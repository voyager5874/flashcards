const initialState = {
  isLoggedIn: false,
};

type LoginReducerStateType = typeof initialState;

export type LoginReducerActionType = ReturnType<typeof setLoginStatus>;

export const login = (
  state: LoginReducerStateType = initialState,
  action: LoginReducerActionType,
) => {
  switch (action.type) {
    case 'SET-LOGIN-STATE':
      return { ...state, isLoggedIn: action.loginStatus };
    default:
      return state;
  }
};

export const setLoginStatus = (loginStatus: boolean) =>
  ({
    type: 'SET-LOGIN-STATE',
    loginStatus,
  } as const);
