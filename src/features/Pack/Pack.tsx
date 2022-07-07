import {
  FC,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';

import styles from './Pack.module.scss';

import { FlashcardType } from 'features/Flashcard/types';

type PackPropsType = {
  flashcardList: any;
};

export const Pack: FC<PackPropsType> = ({ flashcardList }): ReactElement => {
  const someFunc = () => {};
  return (
    <div className={styles.wrapper}>
      <h2>PacksList</h2>
      <div>
        {flashcardList.map(
          (card: {
            id: Key | null | undefined;
            name:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | ReactFragment
              | ReactPortal
              | null
              | undefined;
          }) => (
            <div key={card.id}>{card.name}</div>
          ),
        )}
      </div>
    </div>
  );
};
