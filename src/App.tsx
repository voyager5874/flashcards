import './App.css';
import { ReactElement } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from 'features/Layout';
import { ComponentsTest } from 'pages/ComponentsTest';
import { FlatDesignTestPage } from 'pages/FlatDesignTest/FlatDesignTestPage';
import { Login } from 'pages/Login';
import { NotFound } from 'pages/NotFound';
import { PasswordReset } from 'pages/PasswordReset';
import { PasswordSet } from 'pages/PasswordSet';
import { Profile } from 'pages/Profile';
import { Register } from 'pages/Register';
// import './assets/fonts/JosefinSans-VariableFont_wght.ttf';

const App = (): ReactElement => (
  // <div className="app">
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="register" element={<Register />} />

        <Route path="flat-test" element={<FlatDesignTestPage />} />
        <Route path="heap-test" element={<ComponentsTest />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="password-set" element={<PasswordSet />} />
      <Route path="password-reset" element={<PasswordReset />} />
    </Routes>
  </BrowserRouter>
  // </div>
);

export default App;
