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

  // useEffect(() => {
  //   dispatch(setPacksData({}));
  // }, []);

  const currentPage = useAppSelector(state => state.packs.page);
  const packsPerPage = useAppSelector(state => state.packs.pageCount);
  const packsTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
  const minCardsCountFilter = useAppSelector(state => state.packs.minCardsCountFilter);
  const maxCardsCountFilter = useAppSelector(state => state.packs.maxCardsCountFilter);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  // eslint-disable-next-line no-underscore-dangle
  const currentUserId = useAppSelector(state => state.profile._id);
  const packsOfCurrentUserFilter = useAppSelector(
    state => state.packs.packsOfCurrentUserFilter,
  );
  const appIsBusy = useAppSelector(state => state.appReducer.isBusy);
  const packNameFilter = useAppSelector(state => state.packs.packNameFilter);

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

  const changeCurrentPage = (page: number) => {
    dispatch(packsCurrentPageChanged(page));
  };

  const handleCreatePack = () => {
    dispatch(
      createPack(
        { cardsPack: { name: 'v5874 new pack', private: true } },
        {
          page: currentPage,
          pageCount: packsPerPage,
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
          currentPage={currentPage}
          onPageChange={changeCurrentPage}
          onItemsPerPageChange={changePacksPerPageCount}
          currentItemsPerPageValue={packsPerPage}
          totalItemsCount={packsTotalCount || DEFAULT_MIN}
          disabled={appIsBusy}
        />
      </div>
      <PacksList
        min={minCardsCountFilter}
        max={maxCardsCountFilter}
        pageCount={packsPerPage}
        user_id={(packsOfCurrentUserFilter && currentUserId) || ''}
        page={currentPage}
        packName={packNameFilter}
      />
    </div>
  );
};
