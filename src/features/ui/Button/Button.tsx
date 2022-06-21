import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactElement } from 'react';

import styles from 'features/ui/Button/Button.module.scss';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonPropsType = DefaultButtonPropsType & {
  red?: boolean;
};

export const Button: FC<ButtonPropsType> = ({
  red,
  className,
  ...restProps
}): ReactElement => {
  const colorTheme = 'greenButton';
  const shapeConfig = '';
  const elementStyle = `${styles.default} ${className}  ${red ? styles.redButton : ''} ${
    styles[colorTheme]
  } ${styles[shapeConfig]}`;

  return <button className={elementStyle} {...restProps} type="button" />;
};
