import { FC, ReactElement, useEffect } from 'react';

import styles from './AppMessagesPopup.module.scss';

import { useAppDispatch } from 'hooks';
import { setAppError } from 'store/reducers/app';

type AppMessagesPopupPropsType = {
  message: string;
  error?: boolean;
};

const POPUP_SHOW_DURATION = 2000;

export const AppMessagesPopup: FC<AppMessagesPopupPropsType> = ({
  message,
  error = false,
}): ReactElement => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // const timerId = setTimeout(() => {
    setTimeout(() => {
      dispatch(setAppError(''));
    }, POPUP_SHOW_DURATION);
    // return () => {
    //   clearTimeout(timerId);
    // };
  }, []);
  const messageBoxStyle = `${styles.wrapper} ${error ? styles.error : ''}`;

  return <div className={messageBoxStyle}>{message}</div>;
};
