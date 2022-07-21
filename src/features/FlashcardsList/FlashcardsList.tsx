import { FC, memo, ReactElement, useEffect } from 'react';

import styles from './FlashcardsList.module.scss';

import { GetFlashcardParameterType, GetPacksParameterType } from 'api/types';
import { SortingTable } from 'features/ui/SortingTable';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setFlashcardsData } from 'store/asyncActions/flashcards';
import { setPacksData } from 'store/asyncActions/packs';

type FlashcardsListPropsType = GetFlashcardParameterType;

export const FlashcardsList: FC<FlashcardsListPropsType> = memo(
  ({
    // eslint-disable-next-line camelcase
    cardsPack_id,
    page,
    pageCount,
    min,
    max,
    cardAnswer,
    cardQuestion,

    // ...restProps
  }): ReactElement => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      const queryObject: GetFlashcardParameterType = {
        // eslint-disable-next-line camelcase
        cardsPack_id,
        page,
        pageCount,
        min,
        max,
        cardAnswer,
        cardQuestion,
        // ...restProps,
      };
      dispatch(setFlashcardsData(queryObject));
      // eslint-disable-next-line camelcase
    }, [cardsPack_id, page, pageCount, min, max, cardAnswer, cardQuestion]);

    const flashcardsList = useAppSelector(state => state.flashcards.cards);

    const flashcardHandlers = [() => {}, () => {}];

    return (
      <div className={styles.wrapper}>
        <SortingTable
          caption="flashcards list"
          items={flashcardsList}
          itemActionsNames={['delete', 'edit']}
          itemActionsHandlers={flashcardHandlers}
          tableHeaders={['question', 'answer', 'updated', 'grade']}
        />
      </div>
    );
  },
);
