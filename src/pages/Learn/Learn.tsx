import { ReactElement, useEffect, useState } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';

import styles from './Learn.module.scss';

import { FlashcardGradeType, FlashcardOnServerType } from 'api/types';
import { FIRST_ITEM_INDEX } from 'const';
import { ButtonFlatDesign } from 'features/ui/Button';
import { RadioGroupFlatDesign } from 'features/ui/Radio/RadioGroupFlatDesign';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setFlashcardsData, updateFlashcardGrade } from 'store/asyncActions/flashcards';
import { appErrorOccurred } from 'store/reducers/app';

const grades = [
  "Didn't ring a bell",
  "Couldn't remember",
  'Was hard to remember',
  'Easy enough',
  'Very easy',
];

const chooseCard = (cards: FlashcardOnServerType[]) => {
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
  const [showedCard, setShowedCard] = useState<FlashcardOnServerType>();
  const [cardGrade, setCardGrade] = useState<string>(grades[FIRST_ITEM_INDEX]);

  const { cards, cardsTotalCount, pageCount } = useAppSelector(state => state.flashcards);

  const { packId } = useParams();

  const [packData] = useSearchParams();

  const showAnswer = () => {
    setShowedCardChecked(true);
  };

  const handleCardGradeUpdate = () => {
    const grade = grades.indexOf(cardGrade) >= 0 ? grades.indexOf(cardGrade) + 1 : 0;
    if (!grade || !showedCard?._id) return;
    dispatch(
      updateFlashcardGrade({
        card_id: showedCard._id,
        grade: grade as FlashcardGradeType,
      }),
    ).then(() => setCardGrade(grades[0]));
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
    console.log('cardsTotalCount', cardsTotalCount);
    console.log('pageCount', pageCount);
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
            <RadioGroupFlatDesign
              className={styles.radios}
              options={grades}
              value={cardGrade}
              name="card-grade"
              onChangeOption={setCardGrade}
            />
            <ButtonFlatDesign onClick={showNextCard}>Next</ButtonFlatDesign>
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
