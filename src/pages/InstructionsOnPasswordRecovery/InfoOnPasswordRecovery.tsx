import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import styles from './InfoOnPasswordRecovery.module.scss';

import { ButtonFlatDesign } from 'features/ui/Button';

export const InfoOnPasswordRecovery = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('../profile', { replace: true });
  };
  return (
    <div className={styles.wrapper}>
      <div>
        <h1>Check email</h1>
        <FontAwesomeIcon icon={faPaperPlane} fontSize={60} />
        <p>We have sent you instructions to your email example@email.com</p>
        <ButtonFlatDesign onClick={handleClick}>to home page</ButtonFlatDesign>
      </div>
    </div>
  );
};