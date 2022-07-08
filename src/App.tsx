import 'App.scss';
import { ReactElement, useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { AppMessagesPopup } from 'features/AppMessagesPopup';
import { Layout } from 'features/ui/Layout';
import { useAppDispatch, useAppSelector } from 'hooks';
import { ComponentsTest } from 'pages/ComponentsTest';
import { FlatDesignTestPage } from 'pages/FlatDesignTest/FlatDesignTestPage';
import { InfoOnPasswordRecovery } from 'pages/InstructionsOnPasswordRecovery';
import { Loader } from 'pages/Loader/Loader';
import { Login } from 'pages/Login';
import { NotFound } from 'pages/NotFound';
import { Packs } from 'pages/Packs/Packs';
import { PasswordCreateNew } from 'pages/PasswordCreateNew';
import { PasswordRecovery } from 'pages/PasswordRecovery';
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
        <Route path="/" element={isLoggedIn ? <Layout /> : <Navigate to="login" />}>
          {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="packs" element={<Packs />} />
          <Route path="heap-test" element={<ComponentsTest />} />
          <Route path="flat-test" element={<FlatDesignTestPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="password-set" element={<PasswordCreateNew />} />
        <Route path="password-reset" element={<PasswordRecovery />} />
        <Route path="instructions" element={<InfoOnPasswordRecovery />} />
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
