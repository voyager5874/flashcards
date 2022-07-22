import { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { FIRST_ITEM_INDEX, SECOND_ITEM_INDEX } from 'const';
import { FlashcardsList } from 'features/FlashcardsList';
import { ButtonFlatDesign } from 'features/ui/Button';
import { TextInput } from 'features/ui/flat-design';
import { RangeDoubleSlider } from 'features/ui/flat-design/RangeDoubleSlider';
import { Pagination } from 'features/ui/Pagination';
import { useAppDispatch, useAppSelector, useDebouncedValue } from 'hooks';
import styles from 'pages/Flashcards/Flashcards.module.scss';
import {
  flashcardsCurrentPageChanged,
  flashcardsItemsPerPageChanged,
  flashcardsKeywordsFilterApplied,
  flashcardsMaxGradeFilterApplied,
  flashcardsMinGradeFilterApplied,
} from 'store/reducers/flashcards';

export const Flashcards = (): ReactElement => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { packId } = params;
  console.log(packId);

  const {
    packName,
    page,
    pageCount,
    cardsTotalCount,
    maxGrade,
    minGrade,
    maxGradeFilter,
    minGradeFilter,
    keywordsFilter,
    answerKeywordsFilter,
    questionKeywordsFilter,
  } = useAppSelector(state => state.flashcards);

  const appIsBusy = useAppSelector(state => state.appReducer.isBusy);

  const [answerSearchString, setAnswerSearchString] = useState(answerKeywordsFilter);

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

  const debouncedAnswerSearchString = useDebouncedValue(answerSearchString);

  useEffect(() => {
    dispatch(flashcardsKeywordsFilterApplied(debouncedAnswerSearchString));
  }, [debouncedAnswerSearchString]);

  const changeKeyWordsFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswerSearchString(event.currentTarget.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <h1>{packName}</h1>
        <TextInput
          disabled={appIsBusy}
          placeholder="enter some key words to search for"
          className={styles.textInput}
          value={answerSearchString}
          onChange={changeKeyWordsFilter}
        />
        <ButtonFlatDesign>create new pack</ButtonFlatDesign>
      </div>

      <div className={styles.controls}>
        {/* <CheckboxFlatDesign */}
        {/*  disabled={appIsBusy} */}
        {/*  checked={packsOfCurrentUserFilter} */}
        {/*  onChange={flipPacksOfCurrentUserFilter} */}
        {/* > */}
        {/*  show only my packs */}
        {/* </CheckboxFlatDesign> */}
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
        cardQuestion={keywordsFilter}
        cardAnswer={answerKeywordsFilter}
      />
    </div>
  );
};
