import { ReactElement } from 'react';

import styles from './Miniature.module.scss';

type PropsType = {
  questionImg?: string;
  answerImg?: string;
};

export const Miniature = ({ questionImg, answerImg }: PropsType): ReactElement => (
  <div className={styles.wrapper}>
    {questionImg && (<img src={questionImg} alt="miniature" /> || <span>Not set</span>)}
    {answerImg && (<img src={answerImg} alt="miniature" /> || <span>Not set</span>)}
  </div>
);
