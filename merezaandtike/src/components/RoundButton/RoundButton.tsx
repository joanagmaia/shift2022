import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import styles from './roundButton.module.scss';
import useTheme from '../../store/usetheme';

type PropTypes = {
  iconName: IconDefinition;
  label: string;
  id: string;
  onClick: () => void;
};

const RoundButton = ({ iconName, label, id, onClick }: PropTypes) => {
  const theme = useTheme((state) => state.theme);

  return (
    <button
      onClick={onClick}
      id={id}
      aria-label={label}
      className={styles.button}
      style={{
        color: theme.roundButtonTextColor,
        backgroundColor: theme.roundButtonBgColor,
      }}
      type="button">
      <FontAwesomeIcon icon={iconName} />
    </button>
  );
};

export default RoundButton;
