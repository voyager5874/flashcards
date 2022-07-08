import React from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { store } from 'store';

import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your hooks, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
