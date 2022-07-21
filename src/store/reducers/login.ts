const initialState = {
  isLoggedIn: false,
};

type LoginReducerStateType = typeof initialState;

export type LoginReducerActionType = ReturnType<typeof userLoggedIn>;

export const login = (
  state: LoginReducerStateType = initialState,
  action: LoginReducerActionType,
) => {
  switch (action.type) {
    case 'LOGIN/LOGIN-STATE-CHANGED':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const userLoggedIn = (isLoggedIn: boolean) =>
  ({
    type: 'LOGIN/LOGIN-STATE-CHANGED',
    payload: {
      isLoggedIn,
    },
  } as const);
