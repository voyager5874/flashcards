import { ReactElement } from 'react';

import styles from './Packs.module.scss';

import { PacksList } from 'features/PacksList';
import { ButtonFlatDesign } from 'features/ui/Button';
import { CheckboxFlatDesign } from 'features/ui/Checkbox/CheckboxFlatDesign';
import { TextInput } from 'features/ui/flat-design';
import { RangeDoubleSlider } from 'features/ui/flat-design/RangeDoubleSlider';

// eslint-disable-next-line no-undef
export const Packs = (): ReactElement => {
  const someFunc = () => {};
  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <h1>Packs page</h1>
        <TextInput placeholder="enter a pack name" className={styles.textInput} />
        <ButtonFlatDesign>create new pack</ButtonFlatDesign>
      </div>

      <div className={styles.controls}>
        <CheckboxFlatDesign>show only my packs</CheckboxFlatDesign>
        <RangeDoubleSlider
          onChangeRange={someFunc}
          lowerValue={0}
          upperValue={50}
          gap={1}
          step={5}
          max={100}
          min={0}
        />
      </div>

      {/* <PacksList packsList={} /> */}
    </div>
  );
};
