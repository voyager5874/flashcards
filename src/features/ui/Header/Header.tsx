import { CSSProperties, FC, ReactElement } from 'react';

import { faBiking } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

import { DropdownMenu } from 'features/ui/flat-design/DropdownMenu';
import { useAppDispatch } from 'hooks';
import { logout } from 'store/asyncActions/login';

type HeaderPropsType = {
  height?: number;
};

export const Header: FC<HeaderPropsType> = ({ height }): ReactElement => {
  const dispatch = useAppDispatch();
  const dynamicStyle: CSSProperties = height ? { height: `${height}px` } : {};
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={styles.wrapper} style={dynamicStyle}>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/packs">Packs</NavLink>
      <div style={{ display: 'inline-block', width: '250px' }}>
        <DropdownMenu placeholder="navigation">
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
          <NavLink to="/password-reset">reset password</NavLink>
          <NavLink to="/password-forgotten">Password forgotten</NavLink>
        </DropdownMenu>
      </div>
      <div style={{ marginLeft: '20px', display: 'inline-block', width: '250px' }}>
        <DropdownMenu placeholder="commands">
          <button type="button" onClick={handleLogout}>
            logout
          </button>
          <button type="button">some command</button>
        </DropdownMenu>
      </div>
      <button type="button" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};
