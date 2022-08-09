import { FC, memo, MouseEvent, ReactElement, useEffect, useState } from 'react';

import styles from './FlashcardsList.module.scss';

import {
  CardsSortParameterType,
  FlashcardOnServerType,
  GetFlashcardsParameterType,
  PutFlashcardDataType,
} from 'api/types';
import { ButtonFlatDesign } from 'features/ui/Button';
import { Modal } from 'features/ui/Modal';
import { SortingTable } from 'features/ui/SortingTable';
import { TableColumnModifierType } from 'features/ui/SortingTable/types';
import { useAppDispatch, useAppSelector, useControlledPromise } from 'hooks';
import { FlashcardEditForm } from 'pages/Flashcards/FlashcardEditForm/FlashcardEditForm';
import {
  deleteFlashcard,
  setFlashcardsData,
  updateFlashcard,
} from 'store/asyncActions/flashcards';
import { flashcardsSortingApplied } from 'store/reducers/flashcards';
import { Nullable } from 'types';
import { prettifyDate } from 'utils';

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
      console.log(
        cardsPack_id,
        page,
        pageCount,
        min,
        max,
        cardAnswer,
        cardQuestion,
        sortCards,
      );
      // eslint-disable-next-line no-debugger
      debugger;
      dispatch(setFlashcardsData(cardsPack_id));
      // eslint-disable-next-line camelcase
    }, [cardsPack_id, page, pageCount, min, max, cardAnswer, cardQuestion, sortCards]);

    const flashcardsList = useAppSelector(state => state.flashcards.cards);

    // const [currenCardId, setCurrentCardId] = useState('');
    const [underActionCard, setUnderActionCard] =
      useState<Nullable<FlashcardOnServerType>>(null);

    // const currentCard = useAppSelector(state => selectFlashcardById(state, currenCardId));

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

    const showDeleteDialog = async (data: FlashcardOnServerType) => {
      setUnderActionCard(data);
      setDeleteItemDialogActive(true);
      resetControlledPromise();
      const command = await controlledPromise.promise;
      if (command) {
        handleDeleteFlashcard(data._id);
      }
      setDeleteItemDialogActive(false);
    };

    const handleEditFlashcard = (data: PutFlashcardDataType) => {
      dispatch(updateFlashcard(data, cardsPack_id));
    };

    const showEditFlashcardDialog = async (data: FlashcardOnServerType) => {
      setUnderActionCard(data);
      setEditItemDialogActive(true);
      resetControlledPromise();
      await controlledPromise.promise;
      setEditItemDialogActive(false);
    };

    const changeSorting = (sortingField: CardsSortParameterType) => {
      dispatch(flashcardsSortingApplied(sortingField));
    };

    const flashcardHandlers = [showDeleteDialog, showEditFlashcardDialog];

    const columns: TableColumnModifierType<FlashcardOnServerType> = {
      question: { headerName: 'Question' },
      answer: { headerName: 'Answer' },
      updated: { headerName: 'Last updated', cellDataModifier: prettifyDate },
      grade: { headerName: 'Grade' },
    };

    return (
      <div className={styles.wrapper}>
        {flashcardsList.length ? (
          <SortingTable
            tableColumns={columns}
            caption="flashcards list"
            items={flashcardsList}
            itemActionsNames={['delete', 'edit']}
            itemActionsHandlers={flashcardHandlers}
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
            <p>
              Do you really wanna delete
              {underActionCard && underActionCard.question}?
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
            caption="Edit flashcard"
            active={editItemDialogActive}
            displayControlCallback={setEditItemDialogActive}
          >
            <FlashcardEditForm
              promiseToControl={controlledPromise}
              submitCallback={handleEditFlashcard}
              initialValues={{
                _id: underActionCard?._id || '',
                question: underActionCard?.question || '',
                answer: underActionCard?.answer || '',
              }}
            />
          </Modal>
        )}
      </div>
    );
  },
);
