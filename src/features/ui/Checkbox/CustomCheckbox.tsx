import { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import styles from 'features/ui/Checkbox/CustomCheckbox.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type CustomCheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void;
  spanClassName?: string;
  slider?: boolean;
};

export const CustomCheckbox: FC<CustomCheckboxPropsType> = ({
  onChange,
  onChangeChecked,
  className,
  spanClassName,
  children,
  slider,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onChangeChecked) onChangeChecked(e.currentTarget.checked);
  };

  const finalInputClassName = `${slider ? styles.switch : styles.checkbox} ${className}`;
  const spanStyle = `${styles.defaultSpan} ${spanClassName}`;

  return (
    <label htmlFor="custom-checkbox" className={styles.wrapper}>
      <input
        id="custom-checkbox"
        onChange={onChangeCallback}
        className={finalInputClassName}
        {...restProps}
        type="checkbox"
      />
      {children && <span className={spanStyle}>{children}</span>}
    </label>
  );
};
