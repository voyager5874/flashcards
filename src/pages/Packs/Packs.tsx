import { ChangeEvent, ReactElement } from 'react';

import styles from './Packs.module.scss';

import { PacksList } from 'features/PacksList';
import { ButtonFlatDesign } from 'features/ui/Button';
import { CheckboxFlatDesign } from 'features/ui/Checkbox/CheckboxFlatDesign';
import { TextInput } from 'features/ui/flat-design';
import { RangeDoubleSlider } from 'features/ui/flat-design/RangeDoubleSlider';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  packsSetCurrentUserPacksFilter,
  packsSetMaxCardsCountFilter,
  packsSetMinCardsCountFilter,
} from 'store/reducers/packs';

export const Packs = (): ReactElement => {
  const dispatch = useAppDispatch();
  const minCardsCountFilter = useAppSelector(state => state.packs.minCardsCountFilter);
  const maxCardsCountFilter = useAppSelector(state => state.packs.maxCardsCountFilter);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  // eslint-disable-next-line no-underscore-dangle
  const currentUserId = useAppSelector(state => state.profile._id);
  const packsOfCurrentUserFilter = useAppSelector(
    state => state.packs.packsOfCurrentUserFilter,
  );

  const changePacksFilterValues = (newFilterValues: [number, number]) => {
    dispatch(packsSetMaxCardsCountFilter(newFilterValues[1]));
    dispatch(packsSetMinCardsCountFilter(newFilterValues[0]));
  };

  const flipPacksOfCurrentUserFilter = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(packsSetCurrentUserPacksFilter(event.currentTarget.checked));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <h1>Packs page</h1>
        <TextInput placeholder="enter a pack name" className={styles.textInput} />
        <ButtonFlatDesign>create new pack</ButtonFlatDesign>
      </div>

      <div className={styles.controls}>
        <CheckboxFlatDesign
          checked={packsOfCurrentUserFilter}
          onChange={flipPacksOfCurrentUserFilter}
        >
          show only my packs
        </CheckboxFlatDesign>
        <RangeDoubleSlider
          onChangeRange={changePacksFilterValues}
          lowerValue={minCardsCountFilter || 0}
          upperValue={maxCardsCountFilter || 10}
          gap={1}
          step={1}
          max={maxCardsCount || 100}
          min={minCardsCount || 0}
        />
      </div>
      <PacksList
        min={minCardsCountFilter}
        max={maxCardsCountFilter}
        pageCount={20}
        user_id={(packsOfCurrentUserFilter && currentUserId) || ''}
      />
    </div>
  );
};
