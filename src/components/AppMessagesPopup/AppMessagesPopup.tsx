import { FC, ReactElement, useEffect } from 'react';

import styles from 'components/AppMessagesPopup/AppMessagesPopup.module.scss';
import { useAppDispatch } from 'hooks';
import { appErrorOccurred, setAppMessage } from 'store/reducers/app';

type AppMessagesPopupPropsType = {
  message: string;
  error?: boolean;
};

const POPUP_SHOW_DURATION = 2500;

export const AppMessagesPopup: FC<AppMessagesPopupPropsType> = ({
  message,
  error = false,
}): ReactElement => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // const timerId = setTimeout(() => {
    setTimeout(() => {
      dispatch(setAppMessage(''));
      dispatch(appErrorOccurred(''));
    }, POPUP_SHOW_DURATION);
    // return () => {
    //   clearTimeout(timerId);
    // };
  }, []);
  const messageBoxStyle = `${styles.wrapper} ${error ? styles.error : ''}`;

  return <div className={messageBoxStyle}>{message}</div>;
};
