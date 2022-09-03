import { FC, ReactElement } from 'react';

import styles from 'components/Button/ButtonFlatDesign.module.scss';
import { ButtonPropsType } from 'components/Button/types';

export const ButtonFlatDesign: FC<ButtonPropsType> = ({
  color = 'normal',
  compact = false,
  className,
  children,
  ...restProps
}): ReactElement => {
  const elementStyle = `${styles.button} ${styles[color]} ${className} ${
    compact ? styles.compactButton : ''
  }`;

  return (
    <div className={styles.wrapper}>
      {/* type will be overwritten */}
      <button className={elementStyle} type="button" {...restProps}>
        <span>{children}</span>
      </button>
    </div>
  );
};
