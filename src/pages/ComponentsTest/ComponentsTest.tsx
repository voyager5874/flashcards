import { ReactElement, useCallback, useState } from 'react';

import { faBiking, faDumbbell, faHiking } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  arr,
  FIRST_ITEM_INDEX,
  GAP,
  INITIAL_VALUE_LOWER,
  INITIAL_VALUE_UPPER,
  MAX_VALUE,
  MIN_VALUE,
  SECOND_ITEM_INDEX,
} from 'const';
import { ButtonGlitchEffect } from 'features/ui/Button';
import { Button } from 'features/ui/Button/Button';
import { CheckboxSwitch, UniversalCheckbox } from 'features/ui/Checkbox';
import { CustomCheckbox } from 'features/ui/Checkbox/CustomCheckbox';
import { IconsRadioButtons } from 'features/ui/Radio/IconsRadioButtons';
import { Radio } from 'features/ui/Radio/Radio';
import { RadioButtonJelly } from 'features/ui/Radio/RadioButtonJelly';
import { RangeDoubleSlider } from 'features/ui/Range';
import { RangeSlider } from 'features/ui/Range/RangeSlider';
import { SuperDoubleRange } from 'features/ui/Range/SuperDoubleRange';
import { SuperRange } from 'features/ui/Range/SuperRange';
import { BackSlidingSelect, DropdownSelect } from 'features/ui/Select';
import { Select } from 'features/ui/Select/Select';
import TextInputField from 'features/ui/TextInputField/TextInputField';
import styles from 'pages/ComponentsTest/ComponentsTest.module.scss';

export const ComponentsTest = (): ReactElement => {
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
      <h1>TestPage</h1>
      <div className={styles.componentsContainer}>
        <TextInputField placeholder="super input" type="button" />
        <div className={styles.elementTypeContainer}>
          <Button>eat me</Button>
          <ButtonGlitchEffect>2077</ButtonGlitchEffect>
        </div>

        <div className={styles.elementTypeContainer}>
          <h2>Checkbox</h2>
          <CustomCheckbox slider> something switched</CustomCheckbox>
          <CustomCheckbox> super checkbox</CustomCheckbox>
          <CheckboxSwitch>switcher</CheckboxSwitch>
          <UniversalCheckbox>checkbox-transformer</UniversalCheckbox>
          <UniversalCheckbox slider>checkbox-transformer</UniversalCheckbox>
        </div>
        <div className={styles.elementTypeContainer}>
          <h2>Select</h2>
          <Select options={arr} value={value} onChangeOption={onChangeOption} />
          <h3>
            this is actually radio button set. Native select element is hard to style. The
            option part is practically impossible to restyle
          </h3>
          <DropdownSelect
            options={arr}
            value={value}
            onChangeOption={onChangeOption}
            name="select-box-test"
          />
          <BackSlidingSelect
            // name="backsliding-select-test"
            value={value}
            onChangeOption={onChangeOption}
            options={arr}
          >
            <FontAwesomeIcon icon={faBiking} />
            <FontAwesomeIcon icon={faHiking} />
            <FontAwesomeIcon icon={faDumbbell} />
          </BackSlidingSelect>
        </div>
        <div className={styles.elementTypeContainer}>
          <h2>Radio</h2>
          <Radio
            onChangeOption={onChangeOption}
            value={value}
            options={arr}
            name="radio-test"
            className={styles.vertical}
          />
          <RadioButtonJelly
            options={arr}
            value={value}
            onChangeOption={onChangeOption}
            name="jelly-test"
          />
          <IconsRadioButtons
            options={arr}
            value={value}
            onChangeOption={onChangeOption}
            name="icons-radio-test"
          >
            <FontAwesomeIcon icon={faBiking} />
            <FontAwesomeIcon icon={faHiking} />
            <FontAwesomeIcon icon={faDumbbell} />
          </IconsRadioButtons>
        </div>
        {/* <div> */}
        {/*  <UILab /> */}
        {/* </div> */}
      </div>
      <div className={styles.elementTypeContainer}>
        <h2>Range</h2>
        <h3>native element pure CSS restyling </h3>
        <SuperRange
          value={value1}
          onChangeRange={setValue1}
          max={MAX_VALUE}
          min={MIN_VALUE}
        />
        <h3>onRangeChange callback only called when slider thumb released</h3>
        <RangeSlider
          value={value1}
          max={MAX_VALUE}
          min={MIN_VALUE}
          onChangeRange={setValue1}
        />
        <h3>
          callback runs many times while thumb being moved which causes a lot of renders
        </h3>
        <SuperDoubleRange
          value={[value1, value2]}
          gap={GAP}
          max={MAX_VALUE}
          min={MIN_VALUE}
          onChangeRange={doubleRangeChangeHandler}
        />
        <h3>onRangeChange callback only called when slider thumb released (onMouseUp)</h3>
        <RangeDoubleSlider
          lowerValue={value1}
          upperValue={value2}
          gap={GAP}
          max={MAX_VALUE}
          min={MIN_VALUE}
          onChangeRange={doubleRangeChangeHandler}
        />
      </div>
    </div>
  );
};
