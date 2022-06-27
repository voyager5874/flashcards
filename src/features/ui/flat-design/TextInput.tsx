import React, { ChangeEvent, KeyboardEvent, useRef } from 'react';

import styles from './TextInput.module.scss';

import { TextInputPropsType } from 'features/ui/TextInputField/types';

export const TextInput: React.FC<TextInputPropsType> = ({
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  placeholder,
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // let helperText = error || placeholder || '';

  const onChangeCallback = (event: ChangeEvent<HTMLInputElement>): void => {
    if (inputRef.current) {
      // inputRef.current.helperText = '';
    }
    if (onChange) onChange(event);

    if (onChangeText) onChangeText(event.currentTarget.value);
  };
  const onKeyPressCallback = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (onKeyPress) onKeyPress(event);

    if (onEnter && event.key === 'Enter') onEnter();
  };

  // const finalSpanStyle = `${styles.helperText} ${spanClassName} ${
  //   error ? styles.errorText : ''
  // }`;
  const finalInputStyle = `${styles.input} ${onEnter ? styles.superInput : ''} ${
    error ? styles.errorInput : ''
  } ${className}`;

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        placeholder={error || placeholder}
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        className={finalInputStyle}
        {...restProps}
        type="text"
      />
      {/* {helperText && <span className={finalSpanStyle}>{helperText}</span>} */}
    </div>
  );
};
