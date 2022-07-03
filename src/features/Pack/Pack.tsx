import { FC, ReactElement } from 'react';

import styles from './Pack.module.scss';

import { FlashcardType } from 'features/Flashcard/types';

type PackPropsType = {
  flashcardList: FlashcardType[];
};

export const Pack: FC<PackPropsType> = ({ flashcardList }): ReactElement => {
  const someFunc = () => {};
  return (
    <div className={styles.wrapper}>
      <h2>PacksList</h2>
      <div>
        {flashcardList.map(card => (
          <div key={card.id}>{card.name}</div>
        ))}
      </div>
    </div>
  );
};
