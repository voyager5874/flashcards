import { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import styles from './Packs.module.scss';

import { CreatePackParameterType } from 'api/types';
import { ButtonFlatDesign } from 'components/Button';
import { Checkbox } from 'components/Checkbox/Checkbox';
import { Modal } from 'components/Modal';
import { Pagination } from 'components/Pagination';
import { RangeDoubleSlider } from 'components/RangeDoubleSlider/RangeDoubleSlider';
import { TextInput } from 'components/TextInput';
import {
  DEFAULT_MAX_ITEMS_FILTER_VALUE,
  DEFAULT_MIN,
  FIRST_ITEM_INDEX,
  SECOND_ITEM_INDEX,
  SERVER_MAX_ITEMS_PER_REQUEST,
} from 'const';
import { PacksList } from 'features/PacksList';
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

  const changePacksPerPageCount = (perPageCount: number | string) => {
    dispatch(packsSetItemsPerPage(Number(perPageCount)));
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

  // useEffect(() => {
  //   dispatch(packsSetMinCardsCountFilter(0));
  //   if (!maxCardsCountFilter) return;
  //   dispatch(packsSetMaxCardsCountFilter(maxCardsCountFilter));
  // }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Packs page</h1>
      <div className={styles.form}>
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
        <div className={styles.filters}>
          <Checkbox
            disabled={appIsBusy}
            checked={packsOfCurrentUserFilter}
            onChange={flipPacksOfCurrentUserFilter}
          >
            show only my packs
          </Checkbox>
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
        </div>

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
