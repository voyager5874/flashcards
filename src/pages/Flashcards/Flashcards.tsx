import { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

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
import { ControlledPromiseType } from 'hooks/useControlledPromise';
import styles from 'pages/Flashcards/Flashcards.module.scss';
import { createFlashcard } from 'store/asyncActions/flashcards';
import {
  flashcardsCurrentPageChanged,
  flashcardsItemsPerPageChanged,
  flashcardsMaxGradeFilterApplied,
  flashcardsMinGradeFilterApplied,
  flashcardsQuestionKeywordsFilterApplied,
} from 'store/reducers/flashcards';
import { selectPackById } from 'store/selectors/selectPackById';

type AddFlashcardFormPropsType = {
  promiseToControl: ControlledPromiseType;
  submitCallback: (data: Partial<CreateFlashcardParameterType>) => void;
};

const AddFlashcardForm = ({
  promiseToControl,
  submitCallback,
}: AddFlashcardFormPropsType) => {
  // const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      answer: '',
      question: '',
    } as Partial<CreateFlashcardParameterType>,
    onSubmit: (values, formikHelpers) => {
      submitCallback(values);
      if (promiseToControl.resolve) promiseToControl.resolve(true);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        placeholder="question"
        name="question"
        value={formik.values.question}
        onChange={formik.handleChange}
      />
      <TextInput
        name="answer"
        placeholder="answer"
        value={formik.values.answer}
        onChange={formik.handleChange}
      />
      <ButtonFlatDesign className={styles.button} type="submit">
        Save
      </ButtonFlatDesign>
      <ButtonFlatDesign
        onClick={() => promiseToControl.resolve && promiseToControl.resolve(false)}
      >
        Cancel
      </ButtonFlatDesign>
    </form>
  );
};

export const Flashcards = (): ReactElement => {
  const dispatch = useAppDispatch();

  const params = useParams();

  const { packId } = params;

  const {
    // packName, // remove from the slice
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

  const appIsBusy = useAppSelector(state => state.appReducer.isBusy);

  const packName = useAppSelector(state => selectPackById(state, packId || '').name);

  const [questionSearchString, setQuestionSearchString] =
    useState(questionKeywordsFilter);

  const [addItemDialogActive, setAddItemDialogActive] = useState(false);

  const { controlledPromise, resetControlledPromise } = useControlledPromise();

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

  const debouncedQuestionSearchString = useDebouncedValue(questionSearchString);

  useEffect(() => {
    dispatch(flashcardsQuestionKeywordsFilterApplied(debouncedQuestionSearchString));
  }, [debouncedQuestionSearchString]);

  const changeKeyWordsFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionSearchString(event.currentTarget.value);
  };

  const handleCreateFlashcard = (cardData: Partial<CreateFlashcardParameterType>) => {
    if (!packId) return;
    dispatch(
      createFlashcard(
        {
          cardsPack_id: packId,
          question: cardData.question,
          answer: cardData.answer,
        },
        {
          cardsPack_id: packId || '',
          min: minGradeFilter,
          max: maxGradeFilter,
          pageCount,
          page,
          cardQuestion: questionKeywordsFilter,
        },
      ),
    );
  };

  const showAddDialog = async () => {
    setAddItemDialogActive(true);
    resetControlledPromise();
    await controlledPromise.promise;
    setAddItemDialogActive(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <h2>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>{packName}</span>
        </h2>
        <TextInput
          disabled={appIsBusy}
          placeholder="enter some key words to search for"
          className={styles.textInput}
          value={questionSearchString}
          onChange={changeKeyWordsFilter}
        />
        <ButtonFlatDesign onClick={showAddDialog}>Add flashcard</ButtonFlatDesign>
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
        cardsPack_id={packId || '62c45b8bbc623e0004e21154'}
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
          <AddFlashcardForm
            promiseToControl={controlledPromise}
            submitCallback={handleCreateFlashcard}
          />
        </Modal>
      )}
    </div>
  );
};
