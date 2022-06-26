import { useCallback, useState } from 'react';

import styles from './FlatDesignTestPage.module.scss';

import {
  arr,
  FIRST_ITEM_INDEX,
  INITIAL_VALUE_LOWER,
  INITIAL_VALUE_UPPER,
  MAX_VALUE,
  MIN_VALUE,
  SECOND_ITEM_INDEX,
} from 'const';
import { ButtonFlatDesign } from 'features/ui/Button';
import { CheckboxFlatDesign } from 'features/ui/Checkbox/CheckboxFlatDesign';
import { RadioGroupFlatDesign } from 'features/ui/Radio/RadioGroupFlatDesign';
import { RangeDoubleSliderFlat } from 'features/ui/Range/RangeDoubleSliderFlat';
import { RangeFlatDesign } from 'features/ui/Range/RangeFlatDesign';
import { TextInputFLatDesign } from 'features/ui/TextInputField/TextInputFlatDesign';

export const FlatDesignTestPage = () => {
  const [value, onChangeOption] = useState(arr[FIRST_ITEM_INDEX]);
  const [value1, setValue1] = useState(INITIAL_VALUE_LOWER);
  const [value2, setValue2] = useState(INITIAL_VALUE_UPPER);

  const doubleRangeChangeHandler = useCallback(
    (values: [number, number]): void => {
      setValue1(values[FIRST_ITEM_INDEX]);
      setValue2(values[SECOND_ITEM_INDEX]);
    },
    [value1, value2],
  );
  return (
    <div className={styles.page}>
      <h1>Flat Design</h1>
      <h2>Buttons</h2>
      <h3>Design 1</h3>
      <div className={styles.elementTypeContainer}>
        <ButtonFlatDesign>start new</ButtonFlatDesign>
        <ButtonFlatDesign color="green">start new</ButtonFlatDesign>
        <ButtonFlatDesign color="red">start new</ButtonFlatDesign>
      </div>
      <h2>Checkbox</h2>
      <h3>Design 1</h3>
      <div className={styles.elementTypeContainer}>
        <CheckboxFlatDesign>check it</CheckboxFlatDesign>
      </div>
      <h2>Radio</h2>
      <h3>Design 1</h3>
      <div className={styles.elementTypeContainer}>
        <RadioGroupFlatDesign
          value={value}
          options={arr}
          onChangeOption={onChangeOption}
          name="flat-design-radio-test"
        />
      </div>
      <h2>Dropdown</h2>
      <h3>Design 1</h3>
      <h2>Text Input</h2>
      <h3>Design 1</h3>
      <div className={styles.elementTypeContainer}>
        <TextInputFLatDesign placeholder="flat design input test" />
      </div>
      <h2>Range Input</h2>
      <h3>Design 1</h3>
      <div className={styles.elementTypeContainer}>
        <RangeFlatDesign
          value={value1}
          name="range-flat-test"
          max={MAX_VALUE}
          onChangeRange={setValue1}
        />
        <RangeDoubleSliderFlat
          lowerValue={value1}
          upperValue={value2}
          gap={20}
          step={10}
          max={MAX_VALUE}
          min={MIN_VALUE}
          onChangeRange={doubleRangeChangeHandler}
        />
      </div>
    </div>
  );
};
