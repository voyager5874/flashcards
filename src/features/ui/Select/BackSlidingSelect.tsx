import { Children, FC, ReactElement, useId } from 'react';

import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './BackSlidingSelect.module.scss';

import { STEP_TO_NEXT } from 'const';
// import { RadioPropsType } from 'features/ui/Radio/types';

type BackSlidingSelectPropsType = {
  options: string[];
  value: string;
  onChangeOption: Function;
  children: ReactElement[];
};

export const BackSlidingSelect: FC<BackSlidingSelectPropsType> = ({
  options,
  onChangeOption,
  value,
  children,
}): ReactElement => {
  const childrenArray = Children.toArray(children);
  const id = useId();

  if (childrenArray.length < options.length) {
    for (let i = childrenArray.length; i < options.length; i += STEP_TO_NEXT) {
      childrenArray.push(<FontAwesomeIcon icon={faQuestion} />);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.icons}>
        {options
          ? options.map((option, index) => (
              <button
                type="button"
                aria-selected={option === value}
                role="option"
                key={`${option}-${id}`}
                className={styles.icons__item}
                onClick={() => {
                  onChangeOption(option);
                }}
              >
                <span>{childrenArray.slice(index, index + STEP_TO_NEXT)}</span>
              </button>
            ))
          : []}

        <div className={styles.icons__cover}>
          <div className={styles.icons__coverLeft}>
            {/* <span>{childrenArray[options.indexOf(value)]}</span> */}
            <span>{options[options.indexOf(value)]}</span>
          </div>
          <div className={styles.icons__coverRight}>
            {/* <span>{childrenArray[options.indexOf(value)]}</span> */}
            <span>{options[options.indexOf(value)]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
