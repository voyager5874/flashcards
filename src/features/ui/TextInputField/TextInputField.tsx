import React, { ChangeEvent, KeyboardEvent } from 'react';

import s from 'features/ui/TextInputField/TextInputField.module.scss';
import { TextInputPropsType } from 'features/ui/TextInputField/types';

const TextInputField: React.FC<TextInputPropsType> = ({
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

  const finalSpanStyle = `${s.error} ${spanClassName}`;
  const finalInputStyle = `${s.input} ${onEnter ? s.superInput : ''} ${
    error ? s.errorInput : ''
  } ${className}`;

  return (
    <div className={s.componentContainer}>
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

export default TextInputField;
