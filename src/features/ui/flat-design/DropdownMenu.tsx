import {
  Children,
  CSSProperties,
  FC,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import styles from './DropdownMenu.module.scss';

import { useOutsideClickDetect } from 'hooks';

const OPTION_ITEM_HEIGHT = 38; // SSOT? not heard of it
const OPTION_BOX_HEIGHT_GUTTER = 50;

type DropdownMenuPropsType = {
  expandOnHover?: boolean;
  placeholder: string;
  children: Array<ReturnType<typeof NavLink>>;
};

// const replacerFunc = () => {
//   const visited = new WeakSet();
//   return (key: any, value: any) => {
//     if (typeof value === 'object' && value !== null) {
//       if (visited.has(value)) {
//         return;
//       }
//       visited.add(value);
//     }
//     // eslint-disable-next-line consistent-return
//     return value;
//   };
// };

export const DropdownMenu: FC<DropdownMenuPropsType> = ({
  expandOnHover = false,
  children,
  placeholder,
}): ReactElement => {
  const elementContainerRef = useRef<HTMLDivElement>(null);

  const [collapsed, setCollapsed] = useState(true);

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

  const expandedOptionsBoxStyle: CSSProperties = {
    height: `${
      children && children.length * OPTION_ITEM_HEIGHT + OPTION_BOX_HEIGHT_GUTTER
    }px`,
  };

  const collapsedOptionsBoxStyle: CSSProperties = {
    height: `0`,
  };

  const buttonClassName = `${styles.menuButton} ${collapsed ? '' : styles.menuExpanded}`;
  // Children.map(children, child => {
  //   console.log(child);
  // console.log(JSON.stringify(child, replacerFunc()));
  // });
  return (
    <div className={styles.wrapper} ref={elementContainerRef}>
      <div
        onKeyPress={toggleShowOptions}
        tabIndex={0}
        role="button"
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
        <ul
          className={styles.optionsBox}
          style={collapsed ? collapsedOptionsBoxStyle : expandedOptionsBoxStyle}
        >
          {children
            ? Children.map(children, child => (
                <li
                  className={styles.menuItem}
                  // key={`${child!.props.to}${child?.key}`} // react will assign a key?
                  style={{ height: `${OPTION_ITEM_HEIGHT}px` }}
                >
                  {child}
                </li>
              ))
            : []}
        </ul>
      </div>
    </div>
  );
};
