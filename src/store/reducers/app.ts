const initialState = {
  isBusy: false,
  error: '',
};

type InitialStateType = typeof initialState;
type AppActionType = ReturnType<typeof setAppBusyState> | ReturnType<typeof setAppError>;

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionType,
) => {
  switch (action.type) {
    case 'APP/SET-BUSY-STATE':
      return { ...state, ...action.payload };
    case 'APP/SET-ERROR':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const setAppBusyState = (isBusy: boolean) =>
  ({
    type: 'APP/SET-BUSY-STATE',
    payload: {
      isBusy,
    },
  } as const);

export const setAppError = (error: string) =>
  ({
    type: 'APP/SET-ERROR',
    payload: {
      error,
    },
  } as const);

export const resetAppError = () =>
  ({
    type: 'APP/RESET-ERROR',
    payload: {
      error: '',
    },
  } as const);
