import { FC, memo, ReactElement, useEffect, useState, MouseEvent } from 'react';

import styles from './FlashcardsList.module.scss';

import { GetFlashcardParameterType } from 'api/types';
import { ButtonFlatDesign } from 'features/ui/Button';
import { Modal } from 'features/ui/Modal';
import { SortingTable } from 'features/ui/SortingTable';
import { useAppDispatch, useAppSelector, useControlledPromise } from 'hooks';
import {
  deleteFlashcard,
  setFlashcardsData,
  updateFlashcard,
} from 'store/asyncActions/flashcards';

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

    const [deleteItemDialogActive, setDeleteItemDialogActive] = useState(false);

    const { controlledPromise, resetControlledPromise } = useControlledPromise();

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
        }),
      );
    };

    const respondFromModal = (event: MouseEvent<HTMLButtonElement>): void => {
      if (!controlledPromise.resolve) return;
      if (event.currentTarget.textContent === 'Yes') {
        controlledPromise.resolve(true);
      } else {
        controlledPromise.resolve(false);
      }
      setDeleteItemDialogActive(false);
    };

    const showDeleteDialog = async (id: string) => {
      setDeleteItemDialogActive(true);
      resetControlledPromise();
      const command = await controlledPromise.promise;
      if (command) {
        handleDeleteFlashcard(id);
      }
    };

    const handleEditFlashcard = (id: string) => {
      dispatch(
        updateFlashcard(
          { _id: id, question: `${new Date()} updated question` },
          // eslint-disable-next-line camelcase
          { page, pageCount, min, max, cardAnswer, cardQuestion, cardsPack_id },
        ),
      );
    };

    const flashcardHandlers = [showDeleteDialog, handleEditFlashcard];

    return (
      <div className={styles.wrapper}>
        <Modal
          caption="delete this?"
          active={deleteItemDialogActive}
          displayControlCallback={setDeleteItemDialogActive}
        >
          <ButtonFlatDesign className={styles.button} onClick={respondFromModal}>
            Yes
          </ButtonFlatDesign>
          <ButtonFlatDesign onClick={respondFromModal}>
            No, I changed my mind
          </ButtonFlatDesign>
        </Modal>
        {flashcardsList.length ? (
          <SortingTable
            caption="flashcards list"
            items={flashcardsList}
            itemActionsNames={['delete', 'edit']}
            itemActionsHandlers={flashcardHandlers}
            tableHeaders={['question', 'answer', 'updated', 'grade']}
          />
        ) : (
          <p>This pack is empty. Click add new flashcard to fill it</p>
        )}
      </div>
    );
  },
);
