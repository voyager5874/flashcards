import { ChangeEvent, FC, ReactElement, useEffect, useRef } from 'react';

import { DEFAULT_MIN, HUNDRED_PERCENTS } from 'features/ui/Range/const';
import styles from 'features/ui/Range/RangeFlatDesign.module.scss';
import { RangePropsType } from 'features/ui/Range/types';

export const RangeFlatDesign: FC<RangePropsType> = ({
  onChange,
  onChangeRange,
  className,
  value,
  max,
  min,
  ...restProps // все остальные пропсы попадут в объект restProps
}): ReactElement => {
  const rangeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!rangeRef.current) return;
    rangeRef.current.value = `${value}`;
    rangeRef.current.style.backgroundSize = `${
      (Number(rangeRef.current.value) * HUNDRED_PERCENTS) / max
    }% 100%`;
  }, [value]);

  const setNewRange = (): void => {
    if (!rangeRef.current) return;
    if (onChangeRange) onChangeRange(Number(rangeRef.current.value));
  };

  const handleInputOnChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
    if (!rangeRef.current) return;
    rangeRef.current.style.backgroundSize = `${
      (Number(rangeRef.current.value) * HUNDRED_PERCENTS) / max
    }% 100%`;
    rangeRef.current.setAttribute('data-value', rangeRef.current.value);
  };

  const finalRangeClassName = `${styles.slider} ${className}`;

  return (
    <div className={styles.wrapper}>
      <input
        data-value={value}
        min={min || DEFAULT_MIN}
        max={max}
        onMouseUp={setNewRange}
        onChange={handleInputOnChangeEvent}
        className={finalRangeClassName}
        {...restProps}
        type="range"
        ref={rangeRef}
      />
    </div>
  );
};
