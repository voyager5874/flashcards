import { ReactElement } from 'react';

import styles from 'features/ui/lab/UILab.module.scss';

export const UILab = (): ReactElement => (
  <ul className={styles.wrapper}>
    <li>
      <input id="c111" type="checkbox" />
      <label htmlFor="c111">Checkbox</label>
    </li>
    <li>
      <input id="c2" type="checkbox" checked />
      <label htmlFor="c2">Checkbox</label>
    </li>
    <li>
      <input id="r1" type="radio" name="radio" value="1" />
      <label htmlFor="r1">Radio</label>
    </li>
    <li>
      <input id="r2" type="radio" name="radio" value="2" checked />
      <label htmlFor="r2">Radio</label>
    </li>
    <li>
      <input id="s1" type="checkbox" className={styles.switch} />
      <label htmlFor="s1">Switch</label>
    </li>
    <li>
      <input id="s2" type="checkbox" className={styles.switch} checked />
      <label htmlFor="s2">Switch</label>
    </li>
  </ul>
);
