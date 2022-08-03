import { ReactElement, useEffect, useState } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';

import styles from './Learn.module.scss';

import { FlashcardGradeType, FlashcardOnServerType } from 'api/types';
import { ButtonFlatDesign } from 'features/ui/Button';
import { RadioGroupFlatDesign } from 'features/ui/Radio/RadioGroupFlatDesign';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setFlashcardsData, updateFlashcardGrade } from 'store/asyncActions/flashcards';
import { flashcardsItemsPerPageChanged } from 'store/reducers/flashcards';
import { selectPackById } from 'store/selectors';

const grades = [
  "Didn't ring a bell",
  'Forgot',
  'Was hard to remember',
  'Easy enough',
  'Very easy',
];

const getCard = (cards: FlashcardOnServerType[]) => {
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
  // const [first, setFirst] = useState(true);
  const [showedCard, setShowedCard] = useState<FlashcardOnServerType>();

  const { cards, cardsTotalCount, pageCount } = useAppSelector(state => state.flashcards);

  const { packId } = useParams();

  const learnedPack = useAppSelector(state => selectPackById(state, packId || ''));

  const [packData, setPackData] = useSearchParams();

  const [cardGrade, setCardGrade] = useState<string>(grades[0]);

  useEffect(() => {
    // eslint-disable-next-line no-debugger
    debugger;
    dispatch(setFlashcardsData(packId || ''));
    if (cardsTotalCount > pageCount) {
      dispatch(flashcardsItemsPerPageChanged(cardsTotalCount));
    }
  }, [cardsTotalCount, packId, pageCount]);

  const showAnswer = () => {
    setShowedCardChecked(true);
  };

  const handleCardGradeUpdate = () => {
    // eslint-disable-next-line no-debugger
    debugger;
    // eslint-disable-next-line no-underscore-dangle
    if (!showedCard?._id) return;
    dispatch(
      updateFlashcardGrade({
        // eslint-disable-next-line no-underscore-dangle
        card_id: showedCard._id,
        grade: (grades.indexOf(cardGrade) + 1) as FlashcardGradeType,
      }),
    );
  };

  const showNextCard = () => {
    // eslint-disable-next-line no-debugger
    debugger;
    if (!cards.length) return;
    handleCardGradeUpdate();
    setShowedCard(getCard(cards));
    setShowedCardChecked(false);
  };

  useEffect(() => {
    showNextCard();
    if (learnedPack.name) {
      setPackData({ packName: learnedPack.name as string });
    }
  }, [cardsTotalCount]);

  return (
    <div className={styles.wrapper}>
      <h1>{packData.get('packName')}</h1>
      {showedCardChecked ? (
        <div>
          <p>{showedCard && showedCard.answer}</p>
          <RadioGroupFlatDesign
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
  );
};
