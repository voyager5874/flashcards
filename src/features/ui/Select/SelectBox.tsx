import {
  ChangeEvent,
  CSSProperties,
  FC,
  ReactElement,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import styles from './SelectBox.module.scss';

import { RadioPropsType } from 'features/ui/Radio/types';

const OPTION_HEIGHT = 40; // SSOT? not heard of it

// this is radio buttons set actually due to native select element styling problems.
// Particularly select 'option' look is almost unchangeable
export const SelectBox: FC<RadioPropsType> = ({
  name,
  options,
  onChange,
  onChangeOption,
  value,
  ...restProps
}): ReactElement => {
  const id = useId();
  const optionsBoxRef = useRef<HTMLDivElement>(null);
  const elementContainerRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(true);
  // const colorTheme = 'dark';

  const hideOptions = (): void => {
    if (!optionsBoxRef.current) return;
    optionsBoxRef.current.style.height = '0';
    setCollapsed(true);
  };

  const showOptions = (): void => {
    if (!optionsBoxRef.current) return;
    optionsBoxRef.current.style.height = `${options && options.length * OPTION_HEIGHT}px`;
    // unset -> no animation
    setCollapsed(false);
  };

  const toggleShowOptions = (): void => {
    if (collapsed) {
      showOptions();
    } else {
      hideOptions();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementContainerRef.current &&
        !elementContainerRef.current.contains(event.target as Node)
      ) {
        hideOptions();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [hideOptions]);

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) onChange(e);
    if (onChangeOption) onChangeOption(e.currentTarget.value);
    hideOptions();
  };

  // const collapsedOptionsBoxStyle: CSSProperties = {
  //   height: `${options && options.length * OPTION_HEIGHT}px`,
  // };

  return (
    <div className={styles.wrapper} ref={elementContainerRef}>
      <button type="button" className={styles.buttonText} onClick={toggleShowOptions}>
        {value}
      </button>
      <div className={styles.optionsBox} ref={optionsBoxRef}>
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

// <div className={styles.wrapper}>
//     <select
//         className={combinedClassName}
//         value={value}
//         onChange={onChangeCallback}
//         {...restProps}
//     >
//         {mappedOptions}
//     </select>
//     <span className={styles.focus} />
// </div>
