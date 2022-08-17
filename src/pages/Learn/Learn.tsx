import { ReactElement, useEffect, useState } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';

import styles from './Learn.module.scss';

import { FlashcardGradeType, FlashcardType } from 'api/types';
import { ButtonFlatDesign } from 'components/Button';
import { RadioGroup } from 'components/RadioGroup';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setFlashcardsData, updateFlashcardGrade } from 'store/asyncActions/flashcards';
import { appErrorOccurred } from 'store/reducers/app';
import { Nullable } from 'types';

const grades = [
  "Didn't ring a bell",
  "Couldn't remember",
  'Was hard to remember',
  'Easy enough',
  'Very easy',
];
// grades as const
// type TextGrades = typeof grades[number];

const chooseCard = (cards: FlashcardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );

  return cards[res.id + 1];
};

export const Learn = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [showedCardChecked, setShowedCardChecked] = useState(false);
  const [showedCard, setShowedCard] = useState<FlashcardType>();
  const [cardGrade, setCardGrade] = useState<Nullable<string>>(null);

  const { cards, cardsTotalCount } = useAppSelector(state => state.flashcards);

  const { packId } = useParams();

  const [packData] = useSearchParams();

  const showAnswer = () => {
    setShowedCardChecked(true);
  };

  const handleCardGradeUpdate = () => {
    if (!cardGrade) return;
    const grade = grades.indexOf(cardGrade) + 1;
    if (!grade || !showedCard?._id) return;
    dispatch(
      updateFlashcardGrade({
        card_id: showedCard._id,
        grade: grade as FlashcardGradeType,
      }),
    ).then(() => setCardGrade(null));
  };

  const showNextCard = () => {
    if (!cards.length) return;
    handleCardGradeUpdate();
    setShowedCard(chooseCard(cards));
    setShowedCardChecked(false);
  };

  useEffect(() => {
    if (!packId) {
      dispatch(appErrorOccurred("internal error - couldn't identify the pack"));
      return;
    }
    dispatch(setFlashcardsData(packId));
    // dispatch(setFlashcardsData(packId)).then(() => showNextCard());
  }, []);

  useEffect(() => {
    showNextCard();
  }, [cardsTotalCount]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <h1>{packData.get('packName')}</h1>
        {showedCardChecked ? (
          <div>
            <p>{showedCard && showedCard.answer}</p>
            <RadioGroup
              className={styles.radios}
              options={grades}
              value={cardGrade || undefined}
              name="card-grade"
              onChangeOption={setCardGrade}
            />
            <ButtonFlatDesign onClick={showNextCard} disabled={!cardGrade}>
              Next
            </ButtonFlatDesign>
          </div>
        ) : (
          <div>
            <p>{showedCard && showedCard.question}</p>
            <ButtonFlatDesign onClick={showAnswer}>Show answer</ButtonFlatDesign>
          </div>
        )}
      </div>
    </div>
  );
};
