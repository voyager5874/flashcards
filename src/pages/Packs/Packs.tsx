import { ReactElement } from 'react';

import styles from './Packs.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';
import { CheckboxFlatDesign } from 'features/ui/Checkbox/CheckboxFlatDesign';
import { TextInput } from 'features/ui/flat-design';
import { RangeDoubleSlider } from 'features/ui/flat-design/RangeDoubleSlider';
import { useAppDispatch } from 'hooks';
import { setPacksData } from 'store/asyncActions/packs';

export const Packs = (): ReactElement => {
  const dispatch = useAppDispatch();
  const getPacks = () => {
    dispatch(setPacksData());
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <h1>Packs page</h1>
        <TextInput placeholder="enter a pack name" className={styles.textInput} />
        <ButtonFlatDesign onClick={getPacks}>create new pack</ButtonFlatDesign>
      </div>

      <div className={styles.controls}>
        <CheckboxFlatDesign>show only my packs</CheckboxFlatDesign>
        <RangeDoubleSlider
          onChangeRange={() => {}}
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
