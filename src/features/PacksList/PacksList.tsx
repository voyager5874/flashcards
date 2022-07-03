import { FC, ReactElement } from 'react';

import styles from './PacksList.module.scss';

import { PackType } from 'features/Pack/types';

type PacksListPropsType = {
  packsList: PackType[];
};

export const PacksList: FC<PacksListPropsType> = ({ packsList }): ReactElement => {
  const someFunc = () => {};
  return (
    <div className={styles.wrapper}>
      <h2>PacksList</h2>
      <ul>
        {packsList.map(pack => (
          <li key={pack.id}>{pack.name}</li>
        ))}
      </ul>
    </div>
  );
};
