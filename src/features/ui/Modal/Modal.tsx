import { FC, ReactNode, useRef } from 'react';

import styles from './Modal.module.scss';

import { useOutsideClickDetect } from 'hooks';

type ModalPropsType = {
  caption?: string;
  active: boolean;
  children: ReactNode;
  displayControlCallback: (display: boolean) => void;
};

export const Modal: FC<ModalPropsType> = ({
  caption = '',
  active,
  children,
  displayControlCallback,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  const hideModal = () => {
    displayControlCallback(false);
  };

  useOutsideClickDetect(modalContentRef, hideModal);

  const wrapperStyle = `${styles.wrapper} ${active ? styles.active : ''}`;

  return (
    <div className={wrapperStyle}>
      <div className={styles.content} ref={modalContentRef}>
        {caption && <h3>{caption}</h3>}
        <div>{children}</div>
      </div>
    </div>
  );
};
