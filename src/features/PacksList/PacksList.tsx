import { FC, ReactElement, useEffect } from 'react';

import styles from './PacksList.module.scss';

import { GetPacksParameterType } from 'api/types';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setPacksData } from 'store/asyncActions/packs';

type PacksListPropsType = GetPacksParameterType;

export const PacksList: FC<PacksListPropsType> = ({
  min,
  max,
  // eslint-disable-next-line camelcase
  user_id,
  pageCount,
  page,
  packName,
  ...restProps
}): ReactElement => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const queryObject: GetPacksParameterType = {
      max,
      min,
      // eslint-disable-next-line camelcase
      user_id,
      pageCount,
      page,
      packName,
      ...restProps,
    };
    dispatch(setPacksData(queryObject));
    // eslint-disable-next-line camelcase
  }, [min, max, user_id, pageCount, page, packName]);

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
