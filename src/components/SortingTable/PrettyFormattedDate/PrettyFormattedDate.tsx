import { FC, ReactElement } from 'react';

import styles from 'components/SortingTable/PrettyFormattedDate/PrettyFormattedDate.module.scss';
import { formatDate } from 'utils';

type PrettyFormattedDatePropsType = {
  updated: string;
};

export const PrettyFormattedDate: FC<PrettyFormattedDatePropsType> = ({
  updated,
}): ReactElement => {
  const formattedDate = updated ? formatDate(updated).date : 'unknown date';
  return <div className={styles.wrapper}>{formattedDate}</div>;
};
