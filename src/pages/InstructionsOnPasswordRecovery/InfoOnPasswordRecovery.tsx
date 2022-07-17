import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';

import styles from './InfoOnPasswordRecovery.module.scss';

export const InfoOnPasswordRecovery = () => {
  // const navigate = useNavigate();

  const params = useParams();

  // const handleClick = () => {
  //   navigate('../login', { replace: true });
  // };
  return (
    <div className={styles.wrapper}>
      <div>
        <h1>Check email</h1>
        <FontAwesomeIcon
          icon={faPaperPlane}
          fontSize={60}
          style={{ marginBottom: '20px' }}
        />
        <p>
          {`Check your email ${params.email || ''} and follow the link to reset your
          password`}
        </p>
        {/* <a */}
        {/*  href="mailto:voyager5874@gmail.com" */}
        {/*  // href={`mailto:${params.email || ''}`} */}
        {/*  target="_blank" */}
        {/*  rel="noopener noreferrer" */}
        {/* >{`${params.email || ''}`}</a> */}
        {/* <ButtonFlatDesign onClick={handleClick}>to login page</ButtonFlatDesign> */}
      </div>
    </div>
  );
};
