import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
} from 'react';

import s from 'features/ui/TextInputField/TextInputField.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type TextInputFieldPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
};

const TextInputField: React.FC<TextInputFieldPropsType> = ({
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
