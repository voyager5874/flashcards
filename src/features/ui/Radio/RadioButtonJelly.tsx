import { FC, ReactElement, useId, ChangeEvent } from 'react';

import styles from 'features/ui/Radio/RadioButtonJelly.module.scss';
import { RadioPropsType } from 'features/ui/Radio/types';

export const RadioButtonJelly: FC<RadioPropsType> = ({
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

  const elementWrapperStyle = `${styles.radioWrapper} ${className}`;
  return (
    <ul className={elementWrapperStyle}>
      {options
        ? options.map(option => (
            <li className={styles.option} key={`${option}-${radioElementId}`}>
              <input
                id={`${option}-${radioElementId}`}
                className={styles.input}
                onChange={onChangeCallback}
                name={name}
                value={option}
                checked={value === option}
                {...restProps}
                type="radio"
              />
              <label htmlFor={`${option}-${radioElementId}`} className={styles.label}>
                {option}
              </label>
              <div className={styles.bullet}>
                <div className={`${styles.line} ${styles.line0}`} />
                <div className={`${styles.line} ${styles.line1}`} />
                <div className={`${styles.line} ${styles.line2}`} />
                <div className={`${styles.line} ${styles.line3}`} />
                <div className={`${styles.line} ${styles.line4}`} />
                <div className={`${styles.line} ${styles.line5}`} />
                <div className={`${styles.line} ${styles.line6}`} />
                <div className={`${styles.line} ${styles.line7}`} />
              </div>
            </li>
          ))
        : []}
    </ul>
  );
};
