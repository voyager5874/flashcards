import { ReactElement, useState } from 'react';

import { Navigate, NavLink, useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';
import { CheckboxFlatDesign } from 'features/ui/Checkbox/CheckboxFlatDesign';
import { TextInput } from 'features/ui/flat-design';
import { useAppDispatch, useAppSelector } from 'hooks';
import { login } from 'store/asyncActions/login';

export const Login = (): ReactElement => {
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  if (isLoggedIn) {
    navigate('../packs', { replace: true });
    // return <Navigate to="/packs" />;
  }

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    dispatch(login({ email, password, rememberMe }));
  };

  return (
    <div className={styles.wrapper}>
      <form>
        <h1>Sign in</h1>
        <TextInput
          placeholder="login"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
        />

        <NavLink to="/password-reset" style={{ alignSelf: 'left' }}>
          Forgot password?
        </NavLink>
        <CheckboxFlatDesign
          checked={rememberMe}
          onChange={e => setRememberMe(e.currentTarget.checked)}
        >
          Remember me
        </CheckboxFlatDesign>
        <ButtonFlatDesign onClick={handleLogin}>Login</ButtonFlatDesign>

        <div className={styles.formBottom}>
          <p>Don&apos;t have an account?</p>
          <NavLink to="/register">Sign Up</NavLink>
        </div>
      </form>
    </div>
  );
};
