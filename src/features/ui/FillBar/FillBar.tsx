import { ReactElement } from 'react';

import styles from './FillBar.module.scss';

type PropsType = {
  grade: number;
};

export const FillBar = ({ grade }: PropsType): ReactElement => (
  <div className={styles.wrapper}>
    <div className={styles.bar}>
      <div className={styles.fill} style={{ width: `${grade * 20}%` }} />
    </div>
  </div>
);
