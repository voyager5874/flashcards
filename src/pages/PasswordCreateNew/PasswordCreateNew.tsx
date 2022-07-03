import { useNavigate } from 'react-router-dom';

import styles from './PasswordCreateNew.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';
import { TextInput } from 'features/ui/flat-design';

export const PasswordCreateNew = () => {
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
        <div>
          <ButtonFlatDesign>Cancel</ButtonFlatDesign>
          <ButtonFlatDesign onClick={handleClick}>Create new password</ButtonFlatDesign>
        </div>
      </form>
    </div>
  );
};