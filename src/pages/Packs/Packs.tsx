import { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import styles from './Packs.module.scss';

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
import { Pagination } from 'features/ui/Pagination';
import { useAppDispatch, useAppSelector, useDebouncedValue } from 'hooks';
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

  const handleCreatePack = () => {
    dispatch(
      createPack(
        { name: 'v5874 new pack', private: true },
        {
          page,
          pageCount,
          user_id: (packsOfCurrentUserFilter && currentUserId) || '',
          min: minCardsCountFilter,
          max: maxCardsCountFilter,
          packName: packNameFilter,
        },
      ),
    );
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
        <ButtonFlatDesign onClick={handleCreatePack}>create new pack</ButtonFlatDesign>
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
    </div>
  );
};
