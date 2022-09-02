import { CSSProperties, FC, ReactElement } from 'react';

import { faStackOverflow } from '@fortawesome/free-brands-svg-icons/faStackOverflow';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import { DropdownMenu } from 'components/DropdownMenu/DropdownMenu';
import { useAppDispatch } from 'hooks';
import styles from 'pages/Header/Header.module.scss';
import { logout } from 'store/asyncActions/login';

type HeaderPropsType = {
  height?: number;
};

export const Header: FC<HeaderPropsType> = ({ height }): ReactElement => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const dynamicStyle: CSSProperties = height ? { height: `${height}px` } : {};

  return (
    <div className={styles.wrapper} style={dynamicStyle}>
      {/* <div> */}
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? styles.activeLink : '')}
      >
        <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
        Profile
      </NavLink>
      <NavLink
        to="/packs"
        className={({ isActive }) => (isActive ? styles.activeLink : '')}
      >
        <FontAwesomeIcon icon={faStackOverflow} style={{ marginRight: '10px' }} />
        Packs
      </NavLink>
      {/* </div> */}

      <button type="button" onClick={handleLogout}>
        logout
      </button>
      {/* <div style={{ display: 'inline-block', width: '250px' }}> */}
      {/*  <DropdownMenu placeholder="navigation"> */}
      {/* <NavLink to="/login"> */}
      {/*  <FontAwesomeIcon icon={faBiking} color="yellow" /> Login */}
      {/* </NavLink> */}
      {/* <NavLink to="/register"> */}
      {/*  <FontAwesomeIcon icon={faStar} /> Register */}
      {/* </NavLink> */}
      {/* <NavLink to="/no-page">NotFound</NavLink> */}
      {/* <NavLink to="/password-forgotten">Password forgotten</NavLink> */}
      {/* <NavLink to="/password-reset/fake-token777">reset password</NavLink> */}
      {/* <NavLink to="instructions/fake-email">Instructions sent</NavLink> */}
      {/* </DropdownMenu> */}
      {/* </div> */}
      {/* <div style={{ marginLeft: '20px', display: 'inline-block', width: '250px' }} /> */}
    </div>
  );
};
