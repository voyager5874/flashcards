import { ReactElement } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';
import { CheckboxFlatDesign } from 'features/ui/Checkbox/CheckboxFlatDesign';
import { TextInput } from 'features/ui/flat-design';

export const Login = (): ReactElement => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('../profile', { replace: true });
  };
  return (
    <div className={styles.wrapper}>
      <form>
        <h1>Sign in</h1>
        <TextInput placeholder="login" />
        <TextInput placeholder="password" />

        <NavLink to="/password-reset" style={{ alignSelf: 'left' }}>
          Forgot password?
        </NavLink>
        <CheckboxFlatDesign>Remember me</CheckboxFlatDesign>
        <ButtonFlatDesign onClick={handleLogin}>Login</ButtonFlatDesign>

        <div className={styles.formBottom}>
          <p>Don&apos;t have an account?</p>
          <NavLink to="/register">Sign Up</NavLink>
        </div>
      </form>
    </div>
  );
};
