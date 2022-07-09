import { FC, ReactElement, useEffect } from 'react';

import styles from './PacksList.module.scss';

import { GetPacksRequestParametersType } from 'api/types';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setPacksData } from 'store/asyncActions/packs';

type PacksListPropsType = GetPacksRequestParametersType;

export const PacksList: FC<PacksListPropsType> = ({
  min,
  max,
  // eslint-disable-next-line camelcase
  user_id,
  pageCount,
  page,
  ...restProps
}): ReactElement => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // eslint-disable-next-line no-debugger
    debugger;
    const queryObject: GetPacksRequestParametersType = {
      max,
      min,
      // eslint-disable-next-line camelcase
      user_id,
      pageCount,
      page,
      ...restProps,
    };
    dispatch(setPacksData(queryObject));
    // eslint-disable-next-line camelcase
  }, [min, max, user_id, pageCount, page]);

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
