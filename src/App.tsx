import './App.css';
import { ReactElement } from 'react';

import { ComponentsTest } from 'pages/ComponentsTest';
import { FlatDesignTestPage } from 'pages/FlatDesignTest/FlatDesignTestPage';
// import './assets/fonts/JosefinSans-VariableFont_wght.ttf';

const App = (): ReactElement => (
  <div className="app">
    <ComponentsTest />
    <FlatDesignTestPage />
  </div>
);

export default App;
