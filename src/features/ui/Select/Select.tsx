import { SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent, FC } from 'react';

import styles from 'features/ui/Select/Select.module.css';

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type SelectPropsType = DefaultSelectPropsType & {
  options?: any[];
  onChangeOption?: (option: any) => void;
};

export const Select: FC<SelectPropsType> = ({
  options,
  onChange,
  onChangeOption,
  value,
  ...restProps
}) => {
  const colorTheme = 'dark';
  const combinedClassName = `${styles.select} ${styles[colorTheme]}`;

  const mappedOptions: any[] = options
    ? options.map(item => (
        <option key={`${item}`} value={item}>
          {item}
        </option>
      ))
    : [];

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e);
    if (onChangeOption) onChangeOption(e.currentTarget.value);
  };

  return (
    <select
      className={combinedClassName}
      value={value}
      onChange={onChangeCallback}
      {...restProps}
    >
      {mappedOptions}
    </select>
  );
};
