import { FC, ReactElement } from 'react';

import styles from 'features/ui/PrettyFormattedDate/PrettyFormattedDate.module.scss';
import { Nullable } from 'types';
import { formatDate } from 'utils';

type PrettyFormattedDatePropsType = {
  updated: Nullable<string>;
};

export const PrettyFormattedDate: FC<PrettyFormattedDatePropsType> = ({
  updated,
}): ReactElement => {
  const formattedDate = updated ? formatDate(updated).date : 'unknown date';
  return <div className={styles.wrapper}>{formattedDate}</div>;
};
