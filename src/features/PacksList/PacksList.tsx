import { FC, memo, ReactElement, useEffect } from 'react';

import styles from './PacksList.module.scss';

import { GetPacksParameterType } from 'api/types';
import { SortingTable } from 'features/ui/SortingTable';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setPacksData } from 'store/asyncActions/packs';

type PacksListPropsType = GetPacksParameterType;

export const PacksList: FC<PacksListPropsType> = memo(
  ({
    min,
    max,
    // eslint-disable-next-line camelcase
    user_id,
    pageCount,
    page,
    packName,
    // ...restProps
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
        // ...restProps,
      };
      dispatch(setPacksData(queryObject));
      // eslint-disable-next-line camelcase
    }, [min, max, user_id, pageCount, page, packName]);

    const packsList = useAppSelector(state => state.packs.cardPacks);

    return (
      <div className={styles.wrapper}>
        <SortingTable
          caption="packs list"
          items={packsList}
          itemActions={['delete', 'edit', 'learn']}
        />
      </div>
    );
  },
);
