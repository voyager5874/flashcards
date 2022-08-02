import { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import styles from './Packs.module.scss';

import { CreatePackParameterType } from 'api/types';
import {
  DEFAULT_MAX_ITEMS_FILTER_VALUE,
  DEFAULT_MIN,
  FIRST_ITEM_INDEX,
  SECOND_ITEM_INDEX,
  SERVER_MAX_ITEMS_PER_REQUEST,
} from 'const';
import { PacksList } from 'features/PacksList';
import { ButtonFlatDesign } from 'features/ui/Button';
import { CheckboxFlatDesign } from 'features/ui/Checkbox/CheckboxFlatDesign';
import { TextInput } from 'features/ui/flat-design';
import { RangeDoubleSlider } from 'features/ui/flat-design/RangeDoubleSlider';
import { Modal } from 'features/ui/Modal';
import { Pagination } from 'features/ui/Pagination';
import {
  useAppDispatch,
  useAppSelector,
  useControlledPromise,
  useDebouncedValue,
} from 'hooks';
import { PackEditForm } from 'pages/Packs/PackEditForm/PackEditForm';
import { createPack } from 'store/asyncActions/packs';
import {
  packsCurrentPageChanged,
  packsSetCurrentUserPacksFilter,
  packsSetItemsPerPage,
  packsSetMaxCardsCountFilter,
  packsSetMinCardsCountFilter,
  packsSetPackNameFilter,
} from 'store/reducers/packs';

export const Packs = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { controlledPromise, resetControlledPromise } = useControlledPromise();

  const {
    pageCount,
    page,
    maxCardsCount,
    minCardsCount,
    maxCardsCountFilter,
    minCardsCountFilter,
    packNameFilter,
    packsOfCurrentUserFilter,
    cardPacksTotalCount,
    sorting,
  } = useAppSelector(state => state.packs);

  // eslint-disable-next-line no-underscore-dangle
  const currentUserId = useAppSelector(state => state.profile._id);

  const appIsBusy = useAppSelector(state => state.appReducer.isBusy);

  const [packName, setPackName] = useState(packNameFilter);

  const [addItemDialogActive, setAddItemDialogActive] = useState(false);

  const changePacksFilterValues = (newFilterValues: [number, number]) => {
    dispatch(packsSetMaxCardsCountFilter(newFilterValues[SECOND_ITEM_INDEX]));
    dispatch(packsSetMinCardsCountFilter(newFilterValues[FIRST_ITEM_INDEX]));
  };

  const flipPacksOfCurrentUserFilter = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(packsSetCurrentUserPacksFilter(event.currentTarget.checked));
  };

  const changePacksPerPageCount = (perPageCount: number) => {
    dispatch(packsSetItemsPerPage(+perPageCount));
  };

  const changeCurrentPage = (toPage: number) => {
    dispatch(packsCurrentPageChanged(toPage));
  };

  const handleCreatePack = (data: CreatePackParameterType) => {
    dispatch(createPack(data));
  };

  const showCreatePackDialog = async () => {
    setAddItemDialogActive(true);
    resetControlledPromise();
    await controlledPromise.promise;
    setAddItemDialogActive(false);
  };

  const debouncedSearchString = useDebouncedValue(packName);

  useEffect(() => {
    dispatch(packsSetPackNameFilter(debouncedSearchString));
  }, [debouncedSearchString]);

  const changePackNameFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setPackName(event.currentTarget.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <h1>Packs page</h1>
        <TextInput
          disabled={appIsBusy}
          placeholder="enter a pack name"
          className={styles.textInput}
          value={packName}
          onChange={changePackNameFilter}
        />
        <ButtonFlatDesign onClick={showCreatePackDialog}>
          create new pack
        </ButtonFlatDesign>
      </div>

      <div className={styles.controls}>
        <CheckboxFlatDesign
          disabled={appIsBusy}
          checked={packsOfCurrentUserFilter}
          onChange={flipPacksOfCurrentUserFilter}
        >
          show only my packs
        </CheckboxFlatDesign>
        <RangeDoubleSlider
          disabled={appIsBusy}
          onChangeRange={changePacksFilterValues}
          lowerValue={minCardsCountFilter || DEFAULT_MIN}
          upperValue={maxCardsCountFilter || DEFAULT_MAX_ITEMS_FILTER_VALUE}
          gap={1}
          step={1}
          max={maxCardsCount || SERVER_MAX_ITEMS_PER_REQUEST}
          min={minCardsCount || DEFAULT_MIN}
        />
        <Pagination
          name="packs-page-pagination"
          currentPage={page}
          onPageChange={changeCurrentPage}
          onItemsPerPageChange={changePacksPerPageCount}
          currentItemsPerPageValue={pageCount}
          totalItemsCount={cardPacksTotalCount || DEFAULT_MIN}
          disabled={appIsBusy}
        />
      </div>
      <PacksList
        min={minCardsCountFilter}
        max={maxCardsCountFilter}
        pageCount={pageCount}
        user_id={(packsOfCurrentUserFilter && currentUserId) || ''}
        page={page}
        packName={packNameFilter}
        sortPacks={sorting}
      />
      <Modal
        active={addItemDialogActive}
        displayControlCallback={setAddItemDialogActive}
        caption="Create new pack"
      >
        <PackEditForm
          promiseToControl={controlledPromise}
          submitCallback={handleCreatePack}
          initialValues={{ name: '', deckCover: '', private: true }}
        />
      </Modal>
    </div>
  );
};
