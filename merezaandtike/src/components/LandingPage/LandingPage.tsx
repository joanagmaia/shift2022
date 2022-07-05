import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import TagButton from '../TagButton';
import logo from '../../assets/tmLogo.png';
import styles from './landingPage.module.scss';

type PropTypes = {
  onClick: () => void;
};

const LandingPage = ({ onClick }: PropTypes) => {
  return (
    <div className={styles.landingPage}>
      <img alt="tm-news" src={logo} className={styles.tmLoader} />

      <TagButton
        size="medium"
        content={
          <>
            <FontAwesomeIcon icon={faPlayCircle} color="#b7180c" /> Start the
            broadcast
          </>
        }
        id="start-news"
        ariaLabel="start-news"
        onClick={onClick}
      />
    </div>
  );
};

export default LandingPage;
