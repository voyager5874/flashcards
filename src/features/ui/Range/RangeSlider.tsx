import { ChangeEvent, FC, ReactElement, useEffect, useRef } from 'react';

import { DEFAULT_MIN, HUNDRED_PERCENTS } from 'features/ui/Range/const';
import styles from 'features/ui/Range/RangeSlider.module.scss';
import { RangePropsType } from 'features/ui/Range/types';

export const RangeSlider: FC<RangePropsType> = ({
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
    // rangeRef.current.setAttribute('data-value', event.currentTarget.value);
  };

  const finalRangeClassName = `${styles.slider} ${className}`;

  return (
    <div className={styles.wrapper}>
      <input
        // for displaying current value without rerender
        data-value={value}
        // less renders but kind of violation of flux
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
