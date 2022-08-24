import { ReactElement, useState } from 'react';

import styles from './Miniature.module.scss';

import invalidImage from 'assets/wrong.png';

type PropsType = {
  questionImg?: string;
  answerImg?: string;
};

export const Miniature = ({ questionImg, answerImg }: PropsType): ReactElement => {
  const [image, setImage] = useState(questionImg || answerImg);
  return (
    <div className={styles.wrapper}>
      {questionImg || answerImg ? (
        <img src={image} alt="miniature" onError={() => setImage(invalidImage)} />
      ) : (
        <span>Not set</span>
      )}
    </div>
  );
};
