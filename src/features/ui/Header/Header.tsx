import { CSSProperties, FC, ReactElement } from 'react';

import { faBiking } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import { DropdownMenu } from 'features/ui/flat-design/DropdownMenu';

type HeaderPropsType = {
  height?: number;
};

export const Header: FC<HeaderPropsType> = ({ height }): ReactElement => {
  const dynamicStyle: CSSProperties = height ? { height: `${height}px` } : {};

  return (
    <div className={styles.wrapper} style={dynamicStyle}>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/packs-list">Packs</NavLink>
      {/* <div style={{ display: 'inline-block', width: '300px', marginRight: '20px' }}> */}
      {/*  <DropdownMenu placeholder="onHover nav" expandOnHover> */}
      {/*    <NavLink to="/profile"> */}
      {/*      <FontAwesomeIcon icon={faBiking} color="yellow" /> Profile */}
      {/*    </NavLink> */}
      {/*    <NavLink to="/flat-test"> */}
      {/*      <FontAwesomeIcon icon={faBiking} /> Test page 1 */}
      {/*    </NavLink> */}
      {/*  </DropdownMenu> */}
      {/* </div> */}
      <div style={{ display: 'inline-block', width: '320px' }}>
        <DropdownMenu placeholder="no onHover nav">
          <NavLink to="/login">
            <FontAwesomeIcon icon={faBiking} color="yellow" /> Login
          </NavLink>
          <NavLink to="/register">
            <FontAwesomeIcon icon={faStar} /> Register
          </NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/packs">Packs</NavLink>
          <NavLink to="/no-page">NotFound</NavLink>
          <NavLink to="/flat-test">Test Page 1</NavLink>
          <NavLink to="/heap-test">Test page 2</NavLink>
          <NavLink to="/password-set">Create new password</NavLink>
          <NavLink to="/password-reset">Reset password</NavLink>
        </DropdownMenu>
      </div>
    </div>
  );
};
