import { FC, ReactElement, useEffect } from 'react';

import styles from './AppMessagesPopup.module.scss';

import { useAppDispatch } from 'hooks';
import { setAppError } from 'store/reducers/app';

type AppMessagesPopupPropsType = {
  message: string;
  error?: boolean;
};

// eslint-disable-next-line no-undef
export const AppMessagesPopup: FC<AppMessagesPopupPropsType> = ({
  message,
  error = false,
}): ReactElement => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // const timerId = setTimeout(() => {
    setTimeout(() => {
      dispatch(setAppError(''));
    }, 2000);
    // return () => {
    //   clearTimeout(timerId);
    // };
  }, []);
  const messageBoxStyle = `${styles.wrapper} ${error ? styles.error : ''}`;

  return <div className={messageBoxStyle}>{message}</div>;
};
