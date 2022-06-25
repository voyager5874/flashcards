import { ChangeEvent, FC, ReactElement, useId } from 'react';

import styles from './CheckcoxFlatDesign.module.scss';

import { CheckboxPropsType } from 'features/ui/Checkbox/types';

export const CheckboxFlatDesign: FC<CheckboxPropsType> = ({
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

  const finalInputClassName = `${slider ? styles.switch : ''} ${className}`;
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
