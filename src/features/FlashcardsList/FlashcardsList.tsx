import { FC, memo, MouseEvent, ReactElement, useEffect, useState } from 'react';

import styles from './FlashcardsList.module.scss';

import { CardsSortParameterType, GetFlashcardsParameterType } from 'api/types';
import { ButtonFlatDesign } from 'features/ui/Button';
import { Modal } from 'features/ui/Modal';
import { SortingTable } from 'features/ui/SortingTable';
import { useAppDispatch, useAppSelector, useControlledPromise } from 'hooks';
import {
  deleteFlashcard,
  setFlashcardsData,
  updateFlashcard,
} from 'store/asyncActions/flashcards';
import { flashcardsSortingApplied } from 'store/reducers/flashcards';
import { selectFlashcardById } from 'store/selectors';

type FlashcardsListPropsType = GetFlashcardsParameterType;

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
    sortCards,
  }): ReactElement => {
    const dispatch = useAppDispatch();

    const [deleteItemDialogActive, setDeleteItemDialogActive] = useState(false);

    const { controlledPromise, resetControlledPromise } = useControlledPromise();

    useEffect(() => {
      const queryObject: GetFlashcardsParameterType = {
        // eslint-disable-next-line camelcase
        cardsPack_id,
        page,
        pageCount,
        min,
        max,
        cardAnswer,
        cardQuestion,
        sortCards,
      };
      dispatch(setFlashcardsData(queryObject));
      // eslint-disable-next-line camelcase
    }, [cardsPack_id, page, pageCount, min, max, cardAnswer, cardQuestion, sortCards]);

    const flashcardsList = useAppSelector(state => state.flashcards.cards);

    const [currenCardId, setCurrentCardId] = useState('');

    const currentCard = useAppSelector(state => selectFlashcardById(state, currenCardId));

    const handleDeleteFlashcard = (id: string) => {
      dispatch(
        deleteFlashcard(id, {
          page,
          pageCount,
          min,
          max,
          cardAnswer,
          cardQuestion,
          // eslint-disable-next-line camelcase
          cardsPack_id,
          sortCards,
        }),
      );
    };

    const respondFromModal = (event: MouseEvent<HTMLButtonElement>): void => {
      if (!controlledPromise.resolve) return;
      if (
        event.currentTarget.textContent === 'Yes' ||
        event.currentTarget.textContent === 'Save'
      ) {
        controlledPromise.resolve(true);
      } else {
        controlledPromise.resolve(false);
      }
    };

    const showDeleteDialog = async (id: string) => {
      setCurrentCardId(id);
      setDeleteItemDialogActive(true);
      resetControlledPromise();
      const command = await controlledPromise.promise;
      if (command) {
        handleDeleteFlashcard(id);
      }
      setDeleteItemDialogActive(false);
    };

    const handleEditFlashcard = (id: string) => {
      setCurrentCardId(id);
      dispatch(
        updateFlashcard(
          { _id: id, question: `${new Date()} updated question` },
          {
            page,
            pageCount,
            min,
            max,
            cardAnswer,
            cardQuestion,
            // eslint-disable-next-line camelcase
            cardsPack_id,
            sortCards,
          },
        ),
      );
    };

    const changeSorting = (sortingField: CardsSortParameterType) => {
      dispatch(flashcardsSortingApplied(sortingField));
    };

    const flashcardHandlers = [showDeleteDialog, handleEditFlashcard];

    return (
      <div className={styles.wrapper}>
        {flashcardsList.length ? (
          <SortingTable
            caption="flashcards list"
            items={flashcardsList}
            itemActionsNames={['delete', 'edit']}
            itemActionsHandlers={flashcardHandlers}
            tableHeaders={['question', 'answer', 'updated', 'grade']}
            changeSorting={changeSorting}
            sorting={sortCards || '0updated'}
          />
        ) : (
          <p className={styles.defaultContent}>
            This pack is empty. Click add new flashcard to fill it
          </p>
        )}
        {deleteItemDialogActive && (
          <Modal
            caption="Delete flashcard"
            active={deleteItemDialogActive}
            displayControlCallback={setDeleteItemDialogActive}
          >
            <p>Do you really wanna delete {currentCard.question}?</p>
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
