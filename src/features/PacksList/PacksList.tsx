import { FC, memo, MouseEvent, ReactElement, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './PacksList.module.scss';

import { GetPacksParameterType, PacksSortParameterType } from 'api/types';
import { ButtonFlatDesign } from 'features/ui/Button';
import { Modal } from 'features/ui/Modal';
import { SortingTable } from 'features/ui/SortingTable';
import { useAppDispatch, useAppSelector, useControlledPromise } from 'hooks';
import { deletePack, setPacksData, updatePack } from 'store/asyncActions/packs';
import { packsSortingApplied } from 'store/reducers/packs';
import { selectPackById } from 'store/selectors';

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
    sortPacks,
    // ...restProps
  }): ReactElement => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { controlledPromise, resetControlledPromise } = useControlledPromise();

    const [deleteItemDialogActive, setDeleteItemDialogActive] = useState(false);

    const [underActionItemId, setUnderActionItemId] = useState('');

    const underActionPack = useAppSelector(state =>
      selectPackById(state, underActionItemId),
    );

    useEffect(() => {
      dispatch(setPacksData());
      // eslint-disable-next-line camelcase
    }, [min, max, user_id, pageCount, page, packName, sortPacks]);

    const packsList = useAppSelector(state => state.packs.cardPacks);

    const openPack = (id: string) => {
      navigate(`/flashcards/${id}`);
    };

    const editPack = (id: string) => {
      dispatch(updatePack({ _id: id, name: `updated ${new Date()}` }));
    };

    const handleDeletePack = (id: string) => {
      dispatch(deletePack(id));
    };

    const showDeleteDialog = async (id: string) => {
      setUnderActionItemId(id);
      setDeleteItemDialogActive(true);
      resetControlledPromise();
      const command = await controlledPromise.promise;
      if (command) {
        handleDeletePack(id);
      }
      setDeleteItemDialogActive(false);
    };

    const changeSorting = (sortingField: PacksSortParameterType) => {
      dispatch(packsSortingApplied(sortingField));
    };

    const respondFromModal = (event: MouseEvent<HTMLButtonElement>): void => {
      if (!controlledPromise.resolve) return;
      if (event.currentTarget.textContent === 'Yes') {
        controlledPromise.resolve(true);
      } else {
        controlledPromise.resolve(false);
      }
    };

    const packHandlers = [openPack, () => {}, editPack, showDeleteDialog];

    return (
      <div className={styles.wrapper}>
        <SortingTable
          caption="packs list"
          items={packsList}
          itemActionsNames={['open', 'learn', 'edit name', 'delete']}
          itemActionsHandlers={packHandlers}
          // tableHeaders={['Name', 'Cards', 'Last updated', 'Created by', 'Actions']}
          tableHeaders={['name', 'cardsCount', 'updated', 'user_name', 'grade']}
          changeSorting={changeSorting}
          sorting={sortPacks || '0updated'}
        />
        {deleteItemDialogActive && (
          <Modal
            caption="Delete flashcard"
            active={deleteItemDialogActive}
            displayControlCallback={setDeleteItemDialogActive}
          >
            <p>Do you really wanna delete {underActionPack.name} pack?</p>
            <div>
              <ButtonFlatDesign className={styles.button} onClick={respondFromModal}>
                Yes
              </ButtonFlatDesign>
              <ButtonFlatDesign onClick={respondFromModal}>
                No, I changed my mind
              </ButtonFlatDesign>
            </div>
          </Modal>
        )}
      </div>
    );
  },
);
