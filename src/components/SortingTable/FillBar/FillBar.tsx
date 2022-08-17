import { ReactElement } from 'react';

import styles from 'components/SortingTable/FillBar/FillBar.module.scss';

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
