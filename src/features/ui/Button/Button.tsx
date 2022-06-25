import { FC, ReactElement } from 'react';

import styles from 'features/ui/Button/Button.module.scss';
import { ButtonPropsType } from 'features/ui/Button/types';

export const Button: FC<ButtonPropsType> = ({
  color,
  className,
  ...restProps
}): ReactElement => {
  const colorTheme = 'greenButton';
  const shapeConfig = '';
  const elementStyle = `${styles.default} ${className}  ${color ? styles[color] : ''} ${
    styles[colorTheme]
  } ${styles[shapeConfig]}`;

  return <button className={elementStyle} {...restProps} type="button" />;
};
