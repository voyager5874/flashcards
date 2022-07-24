import { FC, memo, ReactElement, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './PacksList.module.scss';

import { GetPacksParameterType } from 'api/types';
import { SortingTable } from 'features/ui/SortingTable';
import { useAppDispatch, useAppSelector } from 'hooks';
import { deletePack, setPacksData, updatePack } from 'store/asyncActions/packs';

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

    const navigate = useNavigate();

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

    const openPack = (id: string) => {
      navigate(`/flashcards/${id}`);
    };

    const editPack = (id: string) => {
      dispatch(
        updatePack(
          { _id: id, name: `updated ${new Date()}` },
          // eslint-disable-next-line camelcase
          { page, pageCount, min, max, user_id, packName },
        ),
      );
    };

    const handleDeletePack = (id: string) => {
      // eslint-disable-next-line camelcase
      dispatch(deletePack(id, { page, pageCount, min, max, user_id, packName }));
    };

    const packHandlers = [openPack, () => {}, editPack, handleDeletePack];

    return (
      <div className={styles.wrapper}>
        <SortingTable
          caption="packs list"
          items={packsList}
          itemActionsNames={['open', 'learn', 'edit name', 'delete']}
          itemActionsHandlers={packHandlers}
          // tableHeaders={['Name', 'Cards', 'Last updated', 'Created by', 'Actions']}
          tableHeaders={['name', 'cardsCount', 'updated', 'user_name', 'grade']}
        />
      </div>
    );
  },
);
