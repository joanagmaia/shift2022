import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './tagButton.module.scss';

type Proptypes = {
  size: 'small' | 'medium';
  content: string | ReactNode;
  onClick: () => void;
  id: string;
  ariaLabel: string;
};

const TagButton = ({ ariaLabel, id, size, content, onClick }: Proptypes) => {
  return (
    <button
      type="button"
      id={id}
      aria-label={ariaLabel}
      className={classNames(styles.tagButton, {
        [styles.medium]: size === 'medium',
        [styles.small]: size === 'small',
      })}
      onClick={onClick}>
      {content}
    </button>
  );
};

export default TagButton;
