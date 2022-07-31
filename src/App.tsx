import 'App.scss';
import { ReactElement, useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { AppMessagesPopup } from 'features/AppMessagesPopup';
import { Layout } from 'features/ui/Layout';
import { useAppDispatch, useAppSelector } from 'hooks';
import { ComponentsTest } from 'pages/ComponentsTest';
import { Flashcards } from 'pages/Flashcards/Flashcards';
import { FlatDesignTestPage } from 'pages/FlatDesignTest/FlatDesignTestPage';
import { InfoOnPasswordRecovery } from 'pages/InfoOnPasswordRecovery';
import { Loader } from 'pages/Loader';
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
          {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="packs" element={<Packs />} />
          <Route path="flashcards" element={<Flashcards />}>
            <Route path=":packId" element={<Flashcards />} />
          </Route>
          <Route path="heap-test" element={<ComponentsTest />} />
          <Route path="flat-test" element={<FlatDesignTestPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
        <Route path="password-reset/" element={<PasswordReset />}>
          <Route path=":token" element={<PasswordReset />} />
        </Route>
        <Route path="password-forgotten" element={<PasswordForgotten />} />
        <Route path="instructions" element={<InfoOnPasswordRecovery />}>
          <Route path=":email" element={<InfoOnPasswordRecovery />} />
        </Route>
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
