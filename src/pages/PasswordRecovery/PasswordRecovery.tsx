import { NavLink, useNavigate } from 'react-router-dom';

import styles from './PasswordRecovery.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';
import { TextInput } from 'features/ui/flat-design';

export const PasswordRecovery = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('../instructions', { replace: true });
  };
  return (
    <div className={styles.wrapper}>
      <form action="">
        <h1>Forgot your password?</h1>
        <TextInput placeholder="email" />
        <p>Enter your password and we will send you further instructions</p>

        <ButtonFlatDesign onClick={handleClick}>Send instructions</ButtonFlatDesign>

        <NavLink to="/login">Try logging in</NavLink>
      </form>
    </div>
  );
};
