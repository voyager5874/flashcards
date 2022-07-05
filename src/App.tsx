import './App.css';
import { ReactElement } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from 'features/ui/Layout';
import { ComponentsTest } from 'pages/ComponentsTest';
import { FlatDesignTestPage } from 'pages/FlatDesignTest/FlatDesignTestPage';
import { InfoOnPasswordRecovery } from 'pages/InstructionsOnPasswordRecovery';
import { Login } from 'pages/Login';
import { NotFound } from 'pages/NotFound';
import { PasswordCreateNew } from 'pages/PasswordCreateNew';
import { PasswordRecovery } from 'pages/PasswordRecovery';
import { Profile } from 'pages/Profile';
import { Register } from 'pages/Register';
// import './assets/fonts/JosefinSans-VariableFont_wght.ttf';

const App = (): ReactElement => (
  <div className="app">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="pack-list" element={<PacksList />} /> */}
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
    </BrowserRouter>
  </div>
);

export default App;
