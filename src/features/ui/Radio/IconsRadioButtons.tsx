import { ChangeEvent, Children, FC, ReactElement, useId } from 'react';

import styles from './IconsRadioButtons.module.scss';

import { RadioPropsType } from 'features/ui/Radio/types';

const STEP_TO_NEXT = 1;

export const IconsRadioButtons: FC<RadioPropsType> = ({
  name,
  options,
  value,
  onChange,
  className,
  onChangeOption,
  children,
  ...restProps
}): ReactElement => {
  const radioElementId = useId();
  const childrenArray = Children.toArray(children);
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onChangeOption) onChangeOption(e.currentTarget.value);
  };

  const elementWrapperStyle = `${styles.wrapper} ${className}`;

  return (
    <div className={elementWrapperStyle}>
      {options
        ? options.map((option, index) => (
            <label
              htmlFor={`${option}-${radioElementId}`}
              key={`${option}-${radioElementId}`}
            >
              <input
                id={`${option}-${radioElementId}`}
                onChange={onChangeCallback}
                name={name}
                value={option}
                checked={value === option}
                {...restProps}
                type="radio"
              />
              <span className={styles.icon}>
                {childrenArray.slice(index, index + STEP_TO_NEXT)}
              </span>
              <span className={styles.optionText}>{option}</span>
            </label>
          ))
        : []}
    </div>
  );
};
