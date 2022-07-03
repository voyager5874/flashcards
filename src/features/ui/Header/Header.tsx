import { CSSProperties, FC, ReactElement } from 'react';

import { faBiking } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import { DropdownMenu } from 'features/ui/flat-design/DropdownMenu';
import { RadioPropsType } from 'features/ui/Radio/types';

type HeaderPropsType = {
  height?: number;
};

export const Header: FC<RadioPropsType> = ({ height }): ReactElement => {
  const dynamicStyle: CSSProperties = height ? { height: `${height}px` } : {};

  return (
    <div className={styles.wrapper} style={dynamicStyle}>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/packs">Packs</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/flat-test">Test Page 1</NavLink>
      <NavLink to="/password-set">Set password</NavLink>
      <div style={{ display: 'inline-block', width: '300px', marginRight: '20px' }}>
        <DropdownMenu placeholder="onHover nav" expandOnHover>
          <NavLink to="/profile">
            <FontAwesomeIcon icon={faBiking} color="yellow" /> Profile
          </NavLink>
          <NavLink to="/flat-test">
            <FontAwesomeIcon icon={faBiking} /> Test page 1
          </NavLink>
        </DropdownMenu>
      </div>
      <div style={{ display: 'inline-block', width: '320px' }}>
        <DropdownMenu placeholder="no onHover nav">
          <NavLink to="/profile">
            <FontAwesomeIcon icon={faBiking} color="yellow" /> Profile
          </NavLink>
          <NavLink to="/flat-test">
            <FontAwesomeIcon icon={faBiking} /> Test page 1
          </NavLink>
        </DropdownMenu>
      </div>
    </div>
  );
};
