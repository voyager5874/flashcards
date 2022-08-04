import { FC, ReactNode, useEffect, useRef } from 'react';

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

  useEffect(() => {
    // native event!
    const closeModal = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        displayControlCallback(false);
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, []);

  const wrapperStyle = `${styles.wrapper} ${active ? styles.active : ''}`;

  return (
    <div className={wrapperStyle}>
      <div className={styles.content} ref={modalContentRef}>
        {caption && <h1>{caption}</h1>}
        {children}
      </div>
    </div>
  );
};
