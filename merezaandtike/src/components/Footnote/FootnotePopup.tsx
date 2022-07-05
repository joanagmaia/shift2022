import { useState } from 'react';
import usePostComments from '../../hooks/usePostComment';
import TagButton from '../TagButton';
import styles from './footnotePopup.module.scss';

type Proptypes = {
  onShareFinished: () => void;
};

const FootnotePopup = ({ onShareFinished }: Proptypes) => {
  const [newsText, setNewsText] = useState<string>('');
  const postComment = usePostComments();
  const isLoading = false;
  const onShare = () => {
    postComment.mutate(newsText);
    onShareFinished();
  };

  return (
    // TODO: ACCESSIBILITY FORM
    <div className={styles.footnotePopup}>
      <textarea
        className={styles.textArea}
        value={newsText}
        disabled={isLoading}
        onChange={(value) => setNewsText(value.target.value)}
      />
      <TagButton
        ariaLabel="shareNewButton"
        id="share-new"
        size="small"
        content="Share"
        onClick={onShare}
      />
    </div>
  );
};

export default FootnotePopup;
