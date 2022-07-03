import { ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';

import { Header } from 'features/ui/Header/Header';

export const Layout = (): ReactElement => (
  <>
    <Header />
    <div className={styles.page}>
      <Outlet />
    </div>
  </>
);
