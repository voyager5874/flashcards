import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import { appReducer } from 'store/reducers/app';
import { login } from 'store/reducers/login';
import { packs } from 'store/reducers/packs';
import { profile } from 'store/reducers/profile';

const rootReducer = combineReducers({
  login,
  appReducer,
  profile,
  packs,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});
