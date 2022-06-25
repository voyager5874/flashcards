import styles from './FlatDesignTestPage.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';
import { CheckboxFlatDesign } from 'features/ui/Checkbox/CheckboxFlatDesign';

export const FlatDesignTestPage = () => (
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
    <div className={styles.elementTypeContainer}>radio groups</div>
    <h2>Checkbox</h2>
    <h3>Design 1</h3>
    <div className={styles.elementTypeContainer}>checkboxes</div>
    <h2>Dropdown</h2>
    <h3>Design 1</h3>
    <div className={styles.elementTypeContainer}>dropdown</div>
    <h2>Checkbox</h2>
    <h3>Design 1</h3>
    <div className={styles.elementTypeContainer}>checkboxes</div>
    <h2>Text Input</h2>
    <h3>Design 1</h3>
    <div className={styles.elementTypeContainer}>text input</div>
  </div>
);
