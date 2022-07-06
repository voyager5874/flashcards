import { ReactElement } from 'react';

import styles from './Loader.module.scss';

export const Loader = (): ReactElement => (
  <div className={styles.wrapper}>please wait ...</div>
);
