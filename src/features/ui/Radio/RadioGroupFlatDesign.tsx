import { ChangeEvent, FC, ReactElement, useId } from 'react';

import styles from './RadioGroupFlatDesign.module.scss';

import { RadioPropsType } from 'features/ui/Radio/types';

export const RadioGroupFlatDesign: FC<RadioPropsType> = ({
  name,
  options,
  value,
  onChange,
  className,
  onChangeOption,
  ...restProps
}): ReactElement => {
  const radioElementId = useId();
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onChangeOption) onChangeOption(e.currentTarget.value);
  };

  const elementWrapperStyles = `${styles.wrapper} ${className}`;

  return (
    <div className={elementWrapperStyles}>
      {options
        ? options.map(option => (
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
              {option}
            </label>
          ))
        : []}
    </div>
  );
};
