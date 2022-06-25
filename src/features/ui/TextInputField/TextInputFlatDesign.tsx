import React, { ChangeEvent, KeyboardEvent } from 'react';

import styles from 'features/ui/TextInputField/TextInputFlatDesign.module.scss';
import { TextInputPropsType } from 'features/ui/TextInputField/types';

export const TextInputFLatDesign: React.FC<TextInputPropsType> = ({
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  ...restProps
}) => {
  const onChangeCallback = (event: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) onChange(event);

    if (onChangeText) onChangeText(event.currentTarget.value);
  };
  const onKeyPressCallback = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (onKeyPress) onKeyPress(event);

    if (onEnter && event.key === 'Enter') onEnter();
  };

  const finalSpanStyle = `${styles.error} ${spanClassName}`;
  const finalInputStyle = `${styles.input} ${onEnter ? styles.superInput : ''} ${
    error ? styles.errorInput : ''
  } ${className}`;

  return (
    <div className={styles.wrapper}>
      <input
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        className={finalInputStyle}
        {...restProps}
        type="text"
      />
      {error && <span className={finalSpanStyle}>{error}</span>}
    </div>
  );
};
