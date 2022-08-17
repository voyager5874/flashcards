import 'App.scss';
import { ReactElement, useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { AppMessagesPopup } from 'components/AppMessagesPopup';
import { Loader } from 'components/Loader';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Flashcards } from 'pages/Flashcards/Flashcards';
import { InfoOnPasswordRecovery } from 'pages/InfoOnPasswordRecovery';
import { Layout } from 'pages/Layout';
import { Learn } from 'pages/Learn/Learn';
import { Login } from 'pages/Login';
import { NotFound } from 'pages/NotFound';
import { Packs } from 'pages/Packs/Packs';
import { PasswordForgotten } from 'pages/PasswordForgotten';
import { PasswordReset } from 'pages/PasswordReset';
import { Profile } from 'pages/Profile';
import { Register } from 'pages/Register';
import { initializeApp } from 'store/asyncActions/app';

const App = (): ReactElement => {
  const error = useAppSelector(state => state.appReducer.error);
  const message = useAppSelector(state => state.appReducer.message);
  const appIsBusy = useAppSelector(state => state.appReducer.isBusy);
  const appIsInitialized = useAppSelector(state => state.appReducer.isInitialized);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('initialization attempt');
    if (appIsInitialized) return;
    dispatch(initializeApp());
  }, []);

  if (!appIsInitialized) {
    return (
      <div className="app">
        <Loader />
      </div>
    );
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={isLoggedIn ? <Layout /> : <Navigate to="login" />}>
          <Route index element={<Navigate to="profile" />} />
          <Route path="profile" element={<Profile />} />
          <Route path="packs" element={<Packs />} />
          <Route path="flashcards">
            <Route path=":packId" element={<Flashcards />} />
          </Route>
          <Route path="learn/:packId" element={<Learn />} />
        </Route>
        <Route path="password-reset">
          <Route index element={<NotFound />} />
          <Route path=":token" element={<PasswordReset />} />
        </Route>
        <Route path="password-forgotten" element={<PasswordForgotten />} />
        <Route path="instructions/:email" element={<InfoOnPasswordRecovery />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      {error && <AppMessagesPopup message={error} error />}
      {message && <AppMessagesPopup message={message} />}
      {appIsBusy && <Loader />}
    </div>
  );
};

export default App;
