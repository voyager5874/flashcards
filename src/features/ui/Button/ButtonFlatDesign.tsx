import { FC, ReactElement } from 'react';

import styles from 'features/ui/Button/ButtonFlatDesign.module.scss';
import { ButtonPropsType } from 'features/ui/Button/types';

export const ButtonFlatDesign: FC<ButtonPropsType> = ({
  color = 'blue',
  className,
  ...restProps
}): ReactElement => {
  const elementStyle = `${styles.button} ${styles[color]} ${className}`;

  return <button className={elementStyle} {...restProps} type="button" />;
};
