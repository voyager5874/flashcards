import { ChangeEvent, FC, ReactElement } from 'react';

import { DEFAULT_MIN } from 'features/ui/Range/const';
import styles from 'features/ui/Range/SuperRange.module.scss';
import { SuperRangePropsType } from 'features/ui/Range/types';

export const SuperRange: FC<SuperRangePropsType> = ({
  onChange,
  onChangeRange,
  className,
  value,
  max,
  min,
  ...restProps
}): ReactElement => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) onChange(e);

    if (onChangeRange) onChangeRange(Number(e.currentTarget.value));
  };

  const finalRangeClassName = `${styles.slider} ${className}`;

  return (
    <div className={styles.wrapper}>
      <input
        value={value}
        min={min || DEFAULT_MIN}
        max={max}
        onChange={onChangeCallback}
        className={finalRangeClassName}
        {...restProps}
        type="range"
      />
      <span>{value}</span>
    </div>
  );
};
