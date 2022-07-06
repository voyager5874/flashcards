const initialState = {
  isBusy: false,
  error: '',
};

type InitialStateType = typeof initialState;
type AppActionType = ReturnType<typeof setAppBusyState>;

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionType,
) => {
  switch (action.type) {
    case 'APP/SET-BUSY-STATE':
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
