import {
  ChangeEvent,
  Children,
  CSSProperties,
  FC,
  ReactElement,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getUuidByString from 'uuid-by-string';

import { DropdownSelectPropsType } from './types';

import styles from 'components/DropdownSelect/DropdownSelect.module.scss';
import { STEP_TO_NEXT } from 'const';
import { useOutsideClickDetect } from 'hooks';

const OPTION_ITEM_HEIGHT = 40;

// this is radio buttons set actually due to native select element styling problems.
// Particularly select 'option' look is almost unchangeable
export const DropdownSelect: FC<DropdownSelectPropsType> = ({
  name,
  options = [],
  onChange,
  onChangeOption,
  value,
  children,
  placeholder,
  ...restProps
}): ReactElement => {
  const id = useId();

  const elementContainerRef = useRef<HTMLDivElement>(null);

  const [collapsed, setCollapsed] = useState(true);

  const childrenArray = Children.toArray(children);

  if (childrenArray.length < options.length) {
    for (let i = childrenArray.length; i < options.length; i += STEP_TO_NEXT) {
      childrenArray.push(<span key={getUuidByString(`optionLabel${options[i]}`)} />);
    }
  }

  const hideOptions = useCallback((): void => {
    setCollapsed(true);
  }, [setCollapsed]);

  useOutsideClickDetect(elementContainerRef, hideOptions);

  const toggleShowOptions = (): void => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) onChange(e);
    if (onChangeOption) onChangeOption(e.currentTarget.value);
    hideOptions();
  };

  const expandedOptionsBoxStyle: CSSProperties = {
    // unset -> no animation
    height: options.length
      ? `${options.length * OPTION_ITEM_HEIGHT}px`
      : `${OPTION_ITEM_HEIGHT}px`,
  };

  const collapsedOptionsBoxStyle: CSSProperties = {
    height: `0`,
  };

  const buttonClassName = `${styles.menuButton} ${collapsed ? '' : styles.menuExpanded}`;

  return (
    <div className={styles.wrapper} ref={elementContainerRef}>
      <button type="button" className={buttonClassName} onClick={toggleShowOptions}>
        {placeholder || value}
        <span>
          <FontAwesomeIcon icon={faAngleDown} />
        </span>
      </button>
      <div
        className={styles.optionsBox}
        style={collapsed ? collapsedOptionsBoxStyle : expandedOptionsBoxStyle}
      >
        {options.length &&
          options.map((option, index) => (
            <label
              htmlFor={`${id}-${name}-${option}`}
              key={getUuidByString(`optionLabel${option}`)}
            >
              <input
                id={`${id}-${name}-${option}`}
                onChange={onChangeCallback}
                name={name}
                value={option}
                checked={value === option}
                {...restProps}
                type="radio"
              />
              {childrenArray[index]}
              {option}
            </label>
          ))}
      </div>
    </div>
  );
};
