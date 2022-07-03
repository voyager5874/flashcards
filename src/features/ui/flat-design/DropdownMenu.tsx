import * as React from 'react';
import {
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
import { NavLink } from 'react-router-dom';

import styles from './DropdownMenu.module.scss';

import { useOutsideClickDetect } from 'hooks';

const OPTION_ITEM_HEIGHT = 40; // SSOT? not heard of it

type DropdownMenuPropsType = {
  // options: string[];
  expandOnHover?: boolean;
  placeholder: string;
  children: Array<ReturnType<typeof NavLink>>;
  // children: ReactElement[];
  // children: any;
};

export const DropdownMenu: FC<DropdownMenuPropsType> = ({
  // options = [],
  expandOnHover = false,
  children,
  placeholder,
}): ReactElement => {
  const id = useId();
  const elementContainerRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(true);
  // const childrenArray = Children.toArray(children);

  const hideOptions = useCallback((): void => {
    setCollapsed(true);
  }, [setCollapsed]);

  const showOptions = useCallback((): void => {
    setCollapsed(false);
  }, [setCollapsed]);

  useOutsideClickDetect(elementContainerRef, hideOptions);

  const toggleShowOptions = (): void => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };
  // @ts-ignore
  Children.map(children, option => console.log(option.props.to));

  const expandedOptionsBoxStyle: CSSProperties = {
    // unset -> no animation
    height: `${children && children.length * OPTION_ITEM_HEIGHT}px`,
  };

  const collapsedOptionsBoxStyle: CSSProperties = {
    height: `0`,
  };

  const buttonClassName = `${styles.menuButton} ${collapsed ? '' : styles.menuExpanded}`;

  return (
    <div className={styles.wrapper} ref={elementContainerRef}>
      <button
        type="button"
        className={buttonClassName}
        onClick={toggleShowOptions}
        onFocus={expandOnHover ? showOptions : undefined}
        onMouseOver={expandOnHover ? showOptions : undefined}
        onBlur={expandOnHover ? hideOptions : undefined}
        onMouseLeave={expandOnHover ? hideOptions : undefined}
      >
        {placeholder}
        <span>
          <FontAwesomeIcon icon={faAngleDown} />
        </span>
        <div
          className={styles.optionsBox}
          style={collapsed ? collapsedOptionsBoxStyle : expandedOptionsBoxStyle}
        >
          {children
            ? Children.map(children, child => (
                <div className={styles.menuItem} key={`${child?.props.to}-${id}`}>
                  {child}
                </div>
              ))
            : []}
        </div>
      </button>
    </div>
  );
};
