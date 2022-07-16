import { useNavigate } from 'react-router-dom';

import styles from './PasswordReset.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';
import { TextInput } from 'features/ui/flat-design';

export const PasswordReset = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('../profile', { replace: true });
  };
  return (
    <div className={styles.wrapper}>
      <form action="">
        <h1>Create new password</h1>
        <TextInput placeholder="new password" />
        <TextInput placeholder="confirm password" />
        <p>Enter new password and we will send you further instructions</p>
        <ButtonFlatDesign onClick={handleClick}>Create new password</ButtonFlatDesign>
      </form>
    </div>
  );
};
