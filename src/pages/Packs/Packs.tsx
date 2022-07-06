import { ReactElement } from 'react';

import styles from './Packs.module.scss';

import { PacksList } from 'features/PacksList';
import { RangeDoubleSlider } from 'features/ui/flat-design/RangeDoubleSlider';

// eslint-disable-next-line no-undef
export const Packs = (): ReactElement => {
  const someFunc = () => {};
  return (
    <div className={styles.wrapper}>
      <h1>Packs page</h1>
      <RangeDoubleSlider
        onChangeRange={someFunc}
        lowerValue={0}
        upperValue={50}
        gap={1}
        step={5}
        max={100}
        min={0}
      />
      {/* <PacksList packsList={} /> */}
    </div>
  );
};
