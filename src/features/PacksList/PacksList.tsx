import { FC, ReactElement, useEffect } from 'react';

import styles from './PacksList.module.scss';

import { GetPacksRequestParametersType, SortParameterType } from 'api/types';
import { PackInAppType } from 'features/Pack/types';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setPacksData } from 'store/asyncActions/packs';

type PacksListPropsType = GetPacksRequestParametersType;

export const PacksList: FC<PacksListPropsType> = ({
  min,
  max,
  ...restProps
}): ReactElement => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPacksData({ min, max, ...restProps }));
  }, [min, max]);

  const packsList = useAppSelector(state => state.packs.cardPacks);

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
