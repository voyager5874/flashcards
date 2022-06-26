import { ChangeEvent, FC, ReactElement, useEffect, useRef } from 'react';

import { DEFAULT_MIN, HUNDRED_PERCENTS } from 'features/ui/Range/const';
import styles from 'features/ui/Range/RangeDoubleSliderFlat.module.scss';

type SuperDoubleRangePropsType = {
  onChangeRange: (value: [number, number]) => void;
  lowerValue: number;
  upperValue: number;
  gap: number;
  step?: number;
  max: number;
  min: number;

  // min, max, step, disable, ...
};

const INDENT_FROM_BOUND = 100; // arbitrary value (two thumbs overlap and pressed to one of the edges)

export const RangeDoubleSliderFlat: FC<SuperDoubleRangePropsType> = ({
  onChangeRange,
  lowerValue,
  upperValue,
  min,
  max,
  gap = 1,
  ...restProps
  // min, max, step, disable, ...
}): ReactElement => {
  const colorTheme = '';
  const rangeLeftPartRef = useRef<HTMLInputElement>(null);
  const rangeRightPartRef = useRef<HTMLInputElement>(null);
  const trackFillRef = useRef<HTMLDivElement>(null);

  const changeTrackFillState = (leftThumbPos: number, rightThumbPos: number) => {
    if (!trackFillRef.current) return;
    const barFillLeftShift = ((leftThumbPos - min) / (max - min)) * HUNDRED_PERCENTS;
    const barFillWidth =
      ((rightThumbPos - min) / (max - min)) * HUNDRED_PERCENTS - barFillLeftShift;
    trackFillRef.current.style.left = `${barFillLeftShift}%`;
    trackFillRef.current.style.width = `${barFillWidth}%`;
  };

  useEffect(() => {
    if (!rangeLeftPartRef.current || !rangeRightPartRef.current) return;
    rangeLeftPartRef.current.value = String(lowerValue);
    rangeRightPartRef.current.value = String(upperValue);
    changeTrackFillState(lowerValue, upperValue);
  }, [lowerValue, upperValue]);

  const setNewRange = () => {
    if (!rangeLeftPartRef.current || !rangeRightPartRef.current) return;
    if (onChangeRange) {
      onChangeRange([
        Number(rangeLeftPartRef.current.value),
        Number(rangeRightPartRef.current.value),
      ]);
    }
  };

  const handleLeftThumbMove = (event: ChangeEvent<HTMLInputElement>) => {
    if (!rangeLeftPartRef.current || !rangeRightPartRef.current) return;
    const newLeftThumbPos = Number(event.currentTarget.value);
    const rightThumbPos = Number(rangeRightPartRef.current.value);
    if (newLeftThumbPos >= rightThumbPos - gap) {
      rangeLeftPartRef.current.value = `${rightThumbPos - gap}`;
    }
    if (newLeftThumbPos < rightThumbPos - gap) {
      changeTrackFillState(newLeftThumbPos, rightThumbPos);
      rangeLeftPartRef.current.setAttribute('data-value', rangeLeftPartRef.current.value);
    }
    // fix for left thumb unable to move when both thumbs pressed to the right
    if (newLeftThumbPos > max - INDENT_FROM_BOUND) {
      rangeLeftPartRef.current.style.zIndex = '5';
      rangeRightPartRef.current.style.zIndex = '4';
      // rangeLeftPartRef.current.style.backgroundColor = 'transparent';
      // rangeRightPartRef.current.style.backgroundColor = 'salmon';
      // rangeRightPartRef.current.classList.add(styles.onTop);
    }
  };

  // make sure maxVal does not fall below minVal
  const handleRightThumbMove = (event: ChangeEvent<HTMLInputElement>) => {
    if (!rangeLeftPartRef.current || !rangeRightPartRef.current) return;
    const newRightThumbPos = Number(event.currentTarget.value);
    const leftThumbPos = Number(rangeLeftPartRef.current.value);
    if (newRightThumbPos <= leftThumbPos + gap) {
      rangeRightPartRef.current.value = `${Number(rangeLeftPartRef.current.value) + gap}`;
    }
    if (newRightThumbPos > leftThumbPos + gap) {
      changeTrackFillState(leftThumbPos, newRightThumbPos);
      rangeRightPartRef.current.setAttribute(
        'data-value',
        rangeRightPartRef.current.value,
      );
    }
    if (newRightThumbPos < min + INDENT_FROM_BOUND) {
      rangeRightPartRef.current.style.zIndex = '5';
      rangeLeftPartRef.current.style.zIndex = '4';
      // rangeRightPartRef.current.style.backgroundColor = 'transparent';
      // rangeLeftPartRef.current.style.backgroundColor = 'salmon';
      // rangeLeftPartRef.current.classList.add(styles.onTop);
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        min={min}
        max={max}
        data-value={lowerValue}
        onChange={handleLeftThumbMove}
        onMouseUp={setNewRange}
        className={`${styles.thumb} ${styles.rangeLeftPart}`}
        {...restProps}
        type="range"
        ref={rangeLeftPartRef}
      />
      <input
        min={min || DEFAULT_MIN}
        max={max}
        data-value={upperValue}
        onChange={handleRightThumbMove}
        onMouseUp={setNewRange}
        className={`${styles.thumb} ${styles.rangeRightPart} ${styles[colorTheme]}`}
        {...restProps}
        type="range"
        ref={rangeRightPartRef}
      />
      <div className={`${styles.slider} ${styles[colorTheme]}`}>
        <div className={styles.sliderTrack} />
        <div
          ref={trackFillRef}
          className={`${styles.sliderRange} ${styles[colorTheme]}`}
        />
      </div>
    </div>
  );
};
