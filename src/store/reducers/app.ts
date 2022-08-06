const initialState = {
  isInitialized: false,
  isBusy: false,
  error: '',
  message: '',
  isFetchingData: false,
  isSendingData: false,
};

type InitialStateType = typeof initialState;

type AppActionType =
  | ReturnType<typeof appIsBusy>
  | ReturnType<typeof appErrorOccurred>
  | ReturnType<typeof setAppMessage>
  | ReturnType<typeof appInitialized>
  | ReturnType<typeof appIsFetchingData>
  | ReturnType<typeof appIsSendingData>;

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionType,
) => {
  switch (action.type) {
    case 'APP/SET-BUSY-STATE':
      return { ...state, ...action.payload };
    case 'APP/SET-ERROR':
      return { ...state, ...action.payload };
    case 'APP/SET-MESSAGE':
      return { ...state, ...action.payload };
    case 'APP/INITIALIZED':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const appIsBusy = (isBusy: boolean) =>
  ({
    type: 'APP/SET-BUSY-STATE',
    payload: {
      isBusy,
    },
  } as const);

export const appErrorOccurred = (error: string) =>
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

export const appInitialized = (isInitialized: boolean) =>
  ({
    type: 'APP/INITIALIZED',
    payload: {
      isInitialized,
    },
  } as const);

export const setAppMessage = (message: string) =>
  ({
    type: 'APP/SET-MESSAGE',
    payload: {
      message,
    },
  } as const);

export const appIsFetchingData = (isFetchingData: boolean) =>
  ({
    type: 'APP/SET-FETCHING-STATE',
    payload: {
      isFetchingData,
    },
  } as const);

export const appIsSendingData = (isSendingData: boolean) =>
  ({
    type: 'APP/SET-SENDING-STATE',
    payload: {
      isSendingData,
    },
  } as const);
