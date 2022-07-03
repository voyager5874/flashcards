import { ReactElement } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';
import { TextInput } from 'features/ui/flat-design';

export const Login = (): ReactElement => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('../profile', { replace: true });
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1>Login</h1>
        <TextInput placeholder="login" />
        <TextInput placeholder="password" />
        <ButtonFlatDesign onClick={handleLogin}>Login</ButtonFlatDesign>
        <ButtonFlatDesign>Sign Up</ButtonFlatDesign>
      </form>
    </div>
  );
};
