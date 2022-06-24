import {
  ChangeEvent,
  CSSProperties,
  FC,
  ReactElement,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react';

import { RadioPropsType } from 'features/ui/Radio/types';
import styles from 'features/ui/Select/DropdownSelect.module.scss';
import { useOutsideClickDetect } from 'hooks';

const OPTION_ITEM_HEIGHT = 40; // SSOT? not heard of it

// this is radio buttons set actually due to native select element styling problems.
// Particularly select 'option' look is almost unchangeable
export const DropdownSelect: FC<RadioPropsType> = ({
  name,
  options,
  onChange,
  onChangeOption,
  value,
  ...restProps
}): ReactElement => {
  const id = useId();
  const elementContainerRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(true);
  // const colorTheme = 'dark';

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
    height: `${options && options.length * OPTION_ITEM_HEIGHT}px`,
  };

  const collapsedOptionsBoxStyle: CSSProperties = {
    height: `0`,
  };

  const buttonClassName = `${styles.menuButton} ${collapsed ? '' : styles.menuExpanded}`;

  return (
    <div className={styles.wrapper} ref={elementContainerRef}>
      <button type="button" className={buttonClassName} onClick={toggleShowOptions}>
        {value}
      </button>
      <div
        className={styles.optionsBox}
        style={collapsed ? collapsedOptionsBoxStyle : expandedOptionsBoxStyle}
      >
        {options
          ? options.map(option => (
              <label htmlFor={`${option}-${id}`} key={`${option}-${id}`}>
                <input
                  id={`${option}-${id}`}
                  onChange={onChangeCallback}
                  name={name}
                  value={option}
                  checked={value === option}
                  {...restProps}
                  type="radio"
                />
                {option}
              </label>
            ))
          : []}
      </div>
    </div>
  );
};
