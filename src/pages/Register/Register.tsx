import { NavLink, useNavigate } from 'react-router-dom';

import { ButtonFlatDesign } from 'features/ui/Button';
import { TextInput } from 'features/ui/flat-design';
import styles from 'pages/Register/Register.module.scss';

export const Register = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate('../profile', { replace: true });
  };
  return (
    <div className={styles.wrapper}>
      <form action="">
        <h1>Sign Up</h1>
        <TextInput placeholder="login" />
        <TextInput placeholder="password" />
        <TextInput placeholder="confirm password" />
        <ButtonFlatDesign onClick={handleRegister}>Sign up</ButtonFlatDesign>
        <NavLink to="/login">Sign in</NavLink>
      </form>
    </div>
  );
};
