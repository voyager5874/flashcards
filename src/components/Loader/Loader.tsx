import { ReactElement } from 'react';

import styles from 'components/Loader/Loader.module.scss';

export const Loader = (): ReactElement => (
  <div className={styles.wrapper}>
    <h1>please wait ...</h1>
  </div>
);
