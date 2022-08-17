import { ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from 'pages/Header/Header';
import styles from 'pages/Layout/Layout.module.scss';

export const Layout = (): ReactElement => (
  <>
    <Header />
    <div className={styles.page}>
      <Outlet />
    </div>
  </>
);
