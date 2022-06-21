import { ChangeEvent, CSSProperties, FC, ReactElement, useEffect, useRef } from 'react';

import { DEFAULT_MIN, HUNDRED_PERCENTS } from 'features/ui/Range/const';
import styles from 'features/ui/Range/RangeSlider.module.scss';
import { SuperRangePropsType } from 'features/ui/Range/types';

export const RangeSlider: FC<SuperRangePropsType> = ({
  onChange,
  onChangeRange,
  className,
  value,
  max,
  min,
  ...restProps // все остальные пропсы попадут в объект restProps
}): ReactElement => {
  const rangeRef = useRef<HTMLInputElement>(null);

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) onChange(e);

    if (onChangeRange) onChangeRange(Number(e.currentTarget.value));
  };

  const getUnfilledRangeTrackPercents = (): number =>
    (Number(value) * HUNDRED_PERCENTS) / max;
  const getUnfilledRangeTrackCSSProperty = (): CSSProperties => ({
    backgroundSize: `${getUnfilledRangeTrackPercents()}% 100%`,
  });

  // useEffect(() => {
  //   if (!rangeRef.current) return;
  //   rangeRef.current.style.backgroundSize = `${getUnfilledRangeTrackPercents()}% 100%`;
  // }, [value, max, getUnfilledRangeTrackPercents]);

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
        ref={rangeRef}
        style={getUnfilledRangeTrackCSSProperty()}
      />
      <span>{value}</span>
    </div>
  );
};
