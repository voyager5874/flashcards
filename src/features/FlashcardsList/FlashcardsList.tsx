import { FC, memo, MouseEvent, ReactElement, useEffect, useState } from 'react';

import styles from './FlashcardsList.module.scss';

import {
  CardsSortParameterType,
  GetFlashcardsParameterType,
  PutFlashcardDataType,
} from 'api/types';
import { ButtonFlatDesign } from 'features/ui/Button';
import { Modal } from 'features/ui/Modal';
import { SortingTable } from 'features/ui/SortingTable';
import { useAppDispatch, useAppSelector, useControlledPromise } from 'hooks';
import { FlashcardEditForm } from 'pages/Flashcards/FlashcardEditForm/FlashcardEditForm';
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
    const [editItemDialogActive, setEditItemDialogActive] = useState(false);

    const { controlledPromise, resetControlledPromise } = useControlledPromise();

    const { minGrade } = useAppSelector(state => state.flashcards);

    const appIsBusy = useAppSelector(state => state.appReducer.isBusy);

    useEffect(() => {
      dispatch(setFlashcardsData(cardsPack_id));
      // eslint-disable-next-line camelcase
    }, [cardsPack_id, page, pageCount, min, max, cardAnswer, cardQuestion, sortCards]);

    const flashcardsList = useAppSelector(state => state.flashcards.cards);

    const [currenCardId, setCurrentCardId] = useState('');

    const currentCard = useAppSelector(state => selectFlashcardById(state, currenCardId));

    const handleDeleteFlashcard = (id: string) => {
      dispatch(deleteFlashcard(id, cardsPack_id));
    };

    const isEmpty =
      min === minGrade &&
      max &&
      max >= 5 &&
      cardQuestion === '' &&
      cardAnswer === '' &&
      !flashcardsList.length;

    let pageContentReplacer: string;
    if (appIsBusy) {
      pageContentReplacer = '';
    } else {
      pageContentReplacer = isEmpty
        ? 'the pack is empty'
        : 'nothing found with current filters';
    }

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

    const handleEditFlashcard = (data: PutFlashcardDataType) => {
      dispatch(updateFlashcard(data, cardsPack_id));
    };

    const showEditFlashcardDialog = async (id: string) => {
      setCurrentCardId(id);
      setEditItemDialogActive(true);
      resetControlledPromise();
      await controlledPromise.promise;
      setEditItemDialogActive(false);
    };

    const changeSorting = (sortingField: CardsSortParameterType) => {
      dispatch(flashcardsSortingApplied(sortingField));
    };

    const flashcardHandlers = [showDeleteDialog, showEditFlashcardDialog];

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
          <p className={styles.defaultContent}>{pageContentReplacer}</p>
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
        {editItemDialogActive && (
          <Modal
            caption="Edit flashcard"
            active={editItemDialogActive}
            displayControlCallback={setEditItemDialogActive}
          >
            <FlashcardEditForm
              promiseToControl={controlledPromise}
              submitCallback={handleEditFlashcard}
              initialValues={currentCard}
            />
          </Modal>
        )}
      </div>
    );
  },
);
