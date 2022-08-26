import { ChangeEvent, FC, KeyboardEvent, useEffect, useId, useRef } from 'react';

import styles from './TextArea.module.scss';
import { TextAreaPropsType } from './types';

export const TextArea: FC<TextAreaPropsType> = ({
  onChange,
  onChangeText,
  onEnter,
  value,
  error,
  className,
  placeholder,
  autoHeight = false,
  resizeable = 'none',
  ...restProps
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const id = useId();

  useEffect(() => {
    if (!autoHeight) return;
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0px';
      const { scrollHeight } = textAreaRef.current;
      textAreaRef.current.style.height = `${scrollHeight + 3}px`;
    }
  }, [textAreaRef, value]);

  const handleAreaTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    if (onChange) onChange(event);
    if (onChangeText) onChangeText(event.currentTarget.value);
  };

  const handleEnterKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (onEnter && event.key === 'Enter') onEnter();
  };

  const finalInputStyle = `${styles.input} ${error ? styles.errorInput : ''}`;
  const finalWrapperStyle = `${styles.wrapper} ${className}`;

  return (
    <label htmlFor={id} className={finalWrapperStyle}>
      <textarea
        id={id}
        ref={textAreaRef}
        placeholder={error || placeholder}
        onChange={handleAreaTextChange}
        onKeyDown={handleEnterKeyPress}
        className={finalInputStyle}
        value={value}
        rows={1}
        style={{ resize: resizeable }}
        {...restProps}
      />
    </label>
  );
};
