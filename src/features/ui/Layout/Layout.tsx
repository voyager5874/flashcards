import { ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from 'features/ui/Header/Header';
import styles from 'features/ui/Layout/Layout.module.scss';

export const Layout = (): ReactElement => (
  <>
    <Header />
    <div className={styles.page}>
      <Outlet />
    </div>
  </>
);
