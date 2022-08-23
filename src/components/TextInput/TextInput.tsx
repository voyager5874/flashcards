import React, { ChangeEvent, KeyboardEvent, useId, useRef, useState } from 'react';

import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TextInputPropsType } from './types';

import styles from 'components/TextInput/TextInput.module.scss';

export const TextInput: React.FC<TextInputPropsType> = ({
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  placeholder,
  type = 'text',
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const helperText = error || '';

  const [textVisible, setTextVisible] = useState(type === 'text');

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

  const toggleTextVisible = () => {
    setTextVisible(prev => !prev);
  };

  const finalSpanStyle = `${styles.helperText} ${spanClassName} ${
    error ? styles.errorText : ''
  }`;
  const finalInputStyle = `${styles.input} ${error ? styles.errorInput : ''}`;
  const finalWrapperStyle = `${styles.wrapper} ${className}`;

  return (
    <label htmlFor={id} className={finalWrapperStyle}>
      <input
        id={id}
        ref={inputRef}
        placeholder={error ? '' : placeholder}
        onChange={onChangeCallback}
        onKeyDown={onKeyPressCallback}
        className={finalInputStyle}
        {...restProps}
        type={textVisible ? 'text' : 'password'}
      />
      {helperText && <span className={finalSpanStyle}>{helperText}</span>}
      {type === 'password' && (
        <button type="button" className={styles.inputControl} onClick={toggleTextVisible}>
          {textVisible ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </button>
      )}
    </label>
  );
};
