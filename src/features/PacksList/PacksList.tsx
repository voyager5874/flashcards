import { FC, memo, MouseEvent, ReactElement, useEffect, useState } from 'react';

import { createSearchParams, useNavigate } from 'react-router-dom';

import styles from './PacksList.module.scss';

import {
  GetPacksParameterType,
  PacksSortParameterType,
  PutPackDataType,
} from 'api/types';
import { PackInAppType } from 'features/Pack/types';
import { ButtonFlatDesign } from 'features/ui/Button';
import { Modal } from 'features/ui/Modal';
import { PrettyFormattedDate } from 'features/ui/PrettyFormattedDate/PrettyFormattedDate';
import { SortingTable } from 'features/ui/SortingTable';
import { TableColumnModifierType } from 'features/ui/SortingTable/types';
import { useAppDispatch, useAppSelector, useControlledPromise } from 'hooks';
import { PackEditForm } from 'pages/Packs/PackEditForm/PackEditForm';
import { deletePack, setPacksData, updatePack } from 'store/asyncActions/packs';
import { flashcardsItemsPerPageChanged } from 'store/reducers/flashcards';
import { packsSortingApplied } from 'store/reducers/packs';
import { Nullable } from 'types';
import { prettifyDate } from 'utils';

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
    const [editItemDialogActive, setEditItemDialogActive] = useState(false);
    const [underActionPack, setUnderActionPack] = useState<Nullable<PackInAppType>>(null);

    useEffect(() => {
      console.log(min, max, user_id, pageCount, page, packName, sortPacks);
      // eslint-disable-next-line no-debugger
      debugger;
      dispatch(setPacksData());
      // eslint-disable-next-line camelcase
    }, [min, max, user_id, pageCount, page, packName, sortPacks]);

    const packsList = useAppSelector(state => state.packs.cardPacks);

    const openPack = (data: PackInAppType) => {
      if (!data.name) return;
      navigate({
        pathname: `/flashcards/${data._id}`,
        search: `?${createSearchParams({ packName: data.name })}`,
      });
    };

    const learnPack = (data: PackInAppType) => {
      if (data.name === null || !data.cardsCount) return;
      dispatch(flashcardsItemsPerPageChanged(data.cardsCount));
      navigate({
        pathname: `/learn/${data._id}`,
        search: `?${createSearchParams({
          packName: data.name,
          cardsTotalCount: `${data.cardsCount}`,
        })}`,
      });
    };

    const handleEditPack = (data: PutPackDataType) => {
      dispatch(updatePack(data));
    };

    const showEditItemDialog = async (data: PackInAppType) => {
      setUnderActionPack(data);
      setEditItemDialogActive(true);
      resetControlledPromise();
      await controlledPromise.promise;
      setEditItemDialogActive(false);
    };

    const handleDeletePack = (id: string) => {
      dispatch(deletePack(id));
    };

    const showDeleteItemDialog = async (data: PackInAppType) => {
      setUnderActionPack(data);
      setDeleteItemDialogActive(true);
      resetControlledPromise();
      const command = await controlledPromise.promise;
      if (command) {
        handleDeletePack(data._id);
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

    const columns: TableColumnModifierType<PackInAppType> = {
      name: { headerName: 'Pack name' },
      cardsCount: { headerName: 'Number of flashcards' },
      updated: { headerName: 'Last updated', cellDataModifier: PrettyFormattedDate },
      user_name: { headerName: 'Created by' },
      // grade: { headerName: 'Grade' },
    };

    const packHandlers = [openPack, learnPack, showEditItemDialog, showDeleteItemDialog];

    return (
      <div className={styles.wrapper}>
        <SortingTable
          tableColumns={columns}
          caption="packs list"
          items={packsList}
          itemActionsNames={['open', 'learn', 'edit name', 'delete']}
          itemActionsHandlers={packHandlers}
          changeSorting={changeSorting}
          sorting={sortPacks || '0updated'}
        />
        {deleteItemDialogActive && (
          <Modal
            caption="Delete pack"
            active={deleteItemDialogActive}
            displayControlCallback={setDeleteItemDialogActive}
          >
            <p>
              Do you really wanna delete &apos;
              {underActionPack && underActionPack.name}&apos; pack?
            </p>
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
        {editItemDialogActive && (
          <Modal
            caption="Edit pack"
            active={editItemDialogActive}
            displayControlCallback={setEditItemDialogActive}
          >
            <PackEditForm
              promiseToControl={controlledPromise}
              submitCallback={handleEditPack}
              initialValues={{
                name: underActionPack?.name || '',
                _id: underActionPack?._id || '',
                private: underActionPack?.private ?? false,
              }}
            />
          </Modal>
        )}
      </div>
    );
  },
);
