import { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useSearchParams } from 'react-router-dom';

import { CreateFlashcardParameterType } from 'api/types';
import { FIRST_ITEM_INDEX, SECOND_ITEM_INDEX } from 'const';
import { FlashcardsList } from 'features/FlashcardsList';
import { ButtonFlatDesign } from 'features/ui/Button';
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
import { FlashcardEditForm } from 'pages/Flashcards/FlashcardEditForm/FlashcardEditForm';
import styles from 'pages/Flashcards/Flashcards.module.scss';
import { createFlashcard } from 'store/asyncActions/flashcards';
import { appErrorOccurred } from 'store/reducers/app';
import {
  flashcardsCurrentPageChanged,
  flashcardsItemsPerPageChanged,
  flashcardsMaxGradeFilterApplied,
  flashcardsMinGradeFilterApplied,
  flashcardsQuestionKeywordsFilterApplied,
} from 'store/reducers/flashcards';
import { selectPackById } from 'store/selectors/selectPackById';

export const Flashcards = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { packId } = useParams();

  const [pageUrl, setPageUrl] = useSearchParams();
  const [addItemDialogActive, setAddItemDialogActive] = useState(false);

  const { controlledPromise, resetControlledPromise } = useControlledPromise();

  const appIsBusy = useAppSelector(state => state.appReducer.isBusy);

  const packNameFromPacksSlice = useAppSelector(
    state => selectPackById(state, packId).name,
  );

  const {
    page,
    pageCount,
    cardsTotalCount,
    maxGrade,
    minGrade,
    maxGradeFilter,
    minGradeFilter,
    // keywordsFilter,
    // answerKeywordsFilter,
    questionKeywordsFilter,
    sorting,
  } = useAppSelector(state => state.flashcards);

  const [questionSearchString, setQuestionSearchString] =
    useState(questionKeywordsFilter);

  const debouncedQuestionSearchString = useDebouncedValue(questionSearchString);

  const changeKeyWordsFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionSearchString(event.currentTarget.value);
  };

  const changeGradeFilterValues = (newFilterValues: [number, number]) => {
    dispatch(flashcardsMaxGradeFilterApplied(newFilterValues[SECOND_ITEM_INDEX]));
    dispatch(flashcardsMinGradeFilterApplied(newFilterValues[FIRST_ITEM_INDEX]));
  };

  const changeCardsPerPageCount = (perPageCount: number) => {
    dispatch(flashcardsItemsPerPageChanged(perPageCount));
  };

  const changeCurrentPage = (pageNumber: number) => {
    dispatch(flashcardsCurrentPageChanged(pageNumber));
  };

  const handleAddFlashcard = (cardData: CreateFlashcardParameterType) => {
    if (!packId) {
      dispatch(
        appErrorOccurred("info about the pack missed somehow - couldn't access pack id"),
      );
      return;
    }
    dispatch(
      createFlashcard(
        {
          cardsPack_id: packId,
          question: cardData.question,
          answer: cardData.answer,
        },
        packId,
      ),
    );
  };

  const showAddFlashcardDialog = async () => {
    setAddItemDialogActive(true);
    resetControlledPromise();
    await controlledPromise.promise;
    setAddItemDialogActive(false);
  };

  useEffect(() => {
    if (!packNameFromPacksSlice) return;
    setPageUrl({ packName: packNameFromPacksSlice }, { replace: true });
  }, [packNameFromPacksSlice]);

  useEffect(() => {
    dispatch(flashcardsQuestionKeywordsFilterApplied(debouncedQuestionSearchString));
  }, [debouncedQuestionSearchString]);

  useEffect(() => {
    dispatch(flashcardsMinGradeFilterApplied(minGrade));
    dispatch(flashcardsMaxGradeFilterApplied(maxGrade));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <h2>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>{pageUrl.get('packName')}</span>
        </h2>
        <TextInput
          disabled={appIsBusy}
          placeholder="enter some key words to search for"
          className={styles.textInput}
          value={questionSearchString}
          onChange={changeKeyWordsFilter}
        />
        <ButtonFlatDesign onClick={showAddFlashcardDialog}>
          Add flashcard
        </ButtonFlatDesign>
      </div>

      <div className={styles.controls}>
        <RangeDoubleSlider
          disabled={appIsBusy}
          onChangeRange={changeGradeFilterValues}
          lowerValue={minGradeFilter}
          upperValue={maxGradeFilter}
          gap={1}
          step={1}
          max={maxGrade}
          min={minGrade}
        />
        <Pagination
          name="packs-page-pagination"
          currentPage={page}
          onPageChange={changeCurrentPage}
          onItemsPerPageChange={changeCardsPerPageCount}
          currentItemsPerPageValue={pageCount}
          totalItemsCount={cardsTotalCount}
          disabled={appIsBusy}
        />
      </div>
      <FlashcardsList
        cardsPack_id={packId || ''}
        min={minGradeFilter}
        max={maxGradeFilter}
        pageCount={pageCount}
        page={page}
        cardQuestion={questionKeywordsFilter}
        cardAnswer=""
        sortCards={sorting || '0updated'}
      />
      {addItemDialogActive && (
        <Modal
          caption="Add new flashcard"
          active={addItemDialogActive}
          displayControlCallback={setAddItemDialogActive}
        >
          <FlashcardEditForm
            promiseToControl={controlledPromise}
            submitCallback={handleAddFlashcard}
            initialValues={{ answer: '', question: '', cardsPack_id: packId || '' }}
          />
        </Modal>
      )}
    </div>
  );
};
