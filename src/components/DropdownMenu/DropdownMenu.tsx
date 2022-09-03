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

import styles from 'components/DropdownMenu/DropdownMenu.module.scss';
import { DropdownMenuPropsType } from 'components/DropdownMenu/types';
import { useOutsideClickDetect } from 'hooks';

const OPTION_ITEM_HEIGHT = 38;
const OPTION_BOX_HEIGHT_GUTTER = 10;

export const DropdownMenu: FC<DropdownMenuPropsType> = ({
  expandOnHover = false,
  compact = false,
  width,
  children,
  placeholder,
}): ReactElement => {
  const elementContainerRef = useRef<HTMLDivElement>(null);

  const [collapsed, setCollapsed] = useState(true);

  const menuOptionsCount = Children.toArray(children).length;

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
    height:
      menuOptionsCount > 1
        ? `${menuOptionsCount * OPTION_ITEM_HEIGHT + OPTION_BOX_HEIGHT_GUTTER}px`
        : `${OPTION_ITEM_HEIGHT + OPTION_BOX_HEIGHT_GUTTER}px`,
  };

  const collapsedOptionsBoxStyle: CSSProperties = {
    height: `0`,
  };

  const buttonClassName = `${styles.menuButton} ${collapsed ? '' : styles.menuExpanded} ${
    compact ? styles.compactMenuButton : ''
  }`;
  return (
    <div
      className={styles.wrapper}
      ref={elementContainerRef}
      style={{ width: `${width}px` }}
    >
      <div
        onKeyDown={toggleShowOptions}
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
          {children &&
            Children.map(children, child => (
              <li
                className={styles.menuItem}
                style={{ height: `${OPTION_ITEM_HEIGHT}px` }}
              >
                {child}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
