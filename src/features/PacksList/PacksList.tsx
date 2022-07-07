import { FC, ReactElement } from 'react';

import styles from './PacksList.module.scss';

import { PackInAppType } from 'features/Pack/types';

type PacksListPropsType = {
  packsList: PackInAppType[];
};

export const PacksList: FC<PacksListPropsType> = ({ packsList }): ReactElement => {
  const someFunc = () => {};
  return (
    <div className={styles.wrapper}>
      <h2>PacksList</h2>
      <ul>
        {packsList.map(pack => (
          // eslint-disable-next-line no-underscore-dangle
          <li key={pack._id}>{pack.name}</li>
        ))}
      </ul>
    </div>
  );
};
