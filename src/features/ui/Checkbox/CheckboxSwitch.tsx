import { ChangeEvent, FC, ReactElement, useId } from 'react';

import styles from 'features/ui/Checkbox/CheckboxSwitch.module.scss';
import { CheckboxPropsType } from 'features/ui/Checkbox/types';

export const CheckboxSwitch: FC<CheckboxPropsType> = ({
  onChange,
  onChangeChecked,
  className,
  spanClassName,
  children,
  slider,
  ...restProps
}): ReactElement => {
  const id = useId();
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onChangeChecked) onChangeChecked(e.currentTarget.checked);
  };

  const finalInputClassName = `${
    slider ? styles.sliderCheckbox : styles.checkbox
  } ${className}`;
  const spanStyle = `${styles.defaultSpan} ${spanClassName}`;

  return (
    <label htmlFor={id} className={styles.wrapper}>
      <input
        id={id}
        onChange={onChangeCallback}
        className={finalInputClassName}
        {...restProps}
        type="checkbox"
      />
      {children && <span className={spanStyle}>{children}</span>}
    </label>
  );
};
