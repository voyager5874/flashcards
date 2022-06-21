import { useState, FC, ReactElement, ChangeEvent, useEffect, useRef } from 'react';

import { FIRST_ITEM_INDEX, SECOND_ITEM_INDEX } from 'const';
import { DEFAULT_MIN, HUNDRED_PERCENTS } from 'features/ui/Range/const';
import styles from 'features/ui/Range/SuperDoubleRange.module.scss';

type SuperDoubleRangePropsType = {
  onChangeRange?: (value: [number, number]) => void;
  value: [number, number];
  gap: number;
  max: number;
  min: number;

  // min, max, step, disable, ...
};

export const SuperDoubleRange: FC<SuperDoubleRangePropsType> = ({
  onChangeRange,
  value,
  min,
  max,
  gap,
  ...restProps
  // min, max, step, disable, ...
}): ReactElement => {
  const colorTheme = '';
  const rangeLeftPartRef = useRef<HTMLInputElement>(null);
  const rangeRightPartRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // some
  }, []);
  const getBarFillPercent = (leftThumbPos: number, rightThumbPos: number) => {
    const barFillLeftShift = ((leftThumbPos - min) / (max - min)) * HUNDRED_PERCENTS;
    const barFillWidth =
      ((rightThumbPos - min) / (max - min)) * HUNDRED_PERCENTS - barFillLeftShift;
    return [barFillLeftShift, barFillWidth];
  };

  const [barFillState, setBarFillState] = useState(
    getBarFillPercent(value[FIRST_ITEM_INDEX], value[SECOND_ITEM_INDEX]),
  );

  // make sure minVal does not exceed maxVal
  const handleLeftThumbMove = (event: ChangeEvent<HTMLInputElement>) => {
    const newLeftThumbPos = Number(event.currentTarget.value);
    if (newLeftThumbPos < value[SECOND_ITEM_INDEX] - gap) {
      if (onChangeRange) onChangeRange([newLeftThumbPos, value[SECOND_ITEM_INDEX]]);
      setBarFillState(getBarFillPercent(newLeftThumbPos, value[SECOND_ITEM_INDEX]));
    }
  };

  // make sure maxVal does not fall below minVal
  const handleRightThumbMove = (event: ChangeEvent<HTMLInputElement>) => {
    const newRightThumbValue = Number(event.currentTarget.value);
    if (newRightThumbValue > value[FIRST_ITEM_INDEX] + gap) {
      if (onChangeRange) onChangeRange([value[FIRST_ITEM_INDEX], newRightThumbValue]);
      setBarFillState(getBarFillPercent(value[FIRST_ITEM_INDEX], newRightThumbValue));
    }
  };

  // fix for left thumb unable to move when both thumbs pressed to the right (right thumb is above by default)
  const leftThumbClassName =
    value[FIRST_ITEM_INDEX] > max - HUNDRED_PERCENTS
      ? `${styles.thumb} ${styles.thumbZindex5} ${styles[colorTheme]}`
      : `${styles.thumb} ${styles.thumbZindex3} ${styles[colorTheme]}`;

  return (
    <div className={styles.wrapper}>
      <input
        min={min}
        max={max}
        // value={value[FIRST_ITEM_INDEX]}
        onChange={handleLeftThumbMove}
        className={leftThumbClassName}
        {...restProps}
        type="range"
        ref={rangeLeftPartRef}
      />
      <input
        min={min || DEFAULT_MIN}
        max={max}
        // value={value[SECOND_ITEM_INDEX]}
        onChange={handleRightThumbMove}
        className={`${styles.thumb} ${styles.thumbZindex4} ${styles[colorTheme]}`}
        {...restProps}
        type="range"
        ref={rangeRightPartRef}
      />
      <div className={`${styles.slider} ${styles[colorTheme]}`}>
        <div className={styles.sliderTrack} />
        <div
          style={{
            left: `${barFillState[FIRST_ITEM_INDEX]}%`,
            width: `${barFillState[SECOND_ITEM_INDEX]}%`,
          }}
          className={`${styles.sliderRange} ${styles[colorTheme]}`}
        />
      </div>
      <span className={styles.minValue}>{value[FIRST_ITEM_INDEX]}</span>
      <span className={styles.maxValue}>{value[SECOND_ITEM_INDEX]}</span>
    </div>
  );
};
