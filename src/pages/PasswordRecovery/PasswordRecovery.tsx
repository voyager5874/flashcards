import { useNavigate } from 'react-router-dom';

import styles from './PasswordRecovery.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';
import { TextInput } from 'features/ui/flat-design';

export const PasswordRecovery = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('../profile', { replace: true });
  };
  return (
    <div className={styles.wrapper}>
      <form action="">
        <h1>Forgot your password?</h1>
        <TextInput placeholder="email" />
        <div>
          <ButtonFlatDesign>Cancel</ButtonFlatDesign>
          <ButtonFlatDesign onClick={handleClick}>Send instructions</ButtonFlatDesign>
        </div>
      </form>
    </div>
  );
};
