import { FC, ReactElement } from 'react';

import styles from 'features/ui/Button/ButtonGlitchEffect.module.scss';
import { ButtonPropsType } from 'features/ui/Button/types';

export const ButtonGlitchEffect: FC<ButtonPropsType> = ({
  className,
  children,
  ...restProps
}): ReactElement => {
  const elementFinalStyle = `${styles.button} ${className}`;
  const buttonText = JSON.stringify(children);
  return (
    <button
      data-text={buttonText}
      className={elementFinalStyle}
      {...restProps}
      type="button"
    >
      {children}
    </button>
  );
};
