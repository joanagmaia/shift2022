import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExternalLinkAlt,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { CSSProperties, memo } from 'react';
import styles from './article.module.scss';
import AudioPlayer from '../AudioPlayer';
import useTheme from '../../store/usetheme';
import RoundButton from '../RoundButton';
import useNews from '../../store/useNews';
import useAudioAnimation from '../../store/useAudioAnimation';
import Tag from '../Tag/Tag';

type PropTypes = {
  title: string;
  content: string;
  imageURL: string;
  sourceURL: string;
  audioURL: string;
  emotion: string;
};

const Article = ({
  title,
  content,
  imageURL,
  sourceURL,
  emotion,
  audioURL,
}: PropTypes) => {
  const theme = useTheme((state) => state.theme);
  const setFocusedNews = useNews((s) => s.setFocusedNews);
  const [setIsPaused] = useAudioAnimation((state) => [state.setIsPaused]);

  const style = {
    '--linkcolor': `${theme.linkColor}`,
  };

  const handleOnNextClick = () => {
    setFocusedNews();
    setIsPaused(false);
  };

  return (
    <article className={styles.article}>
      <Tag content={emotion} id={title} />
      <h1 className={styles.title} style={{ color: theme.textColor }}>
        {title}
      </h1>
      {imageURL && <img alt={title} className={styles.img} src={imageURL} />}
      <p className={styles.content} style={{ color: theme.textColor }}>
        {content}
      </p>
      <a
        className={styles.link}
        style={style as CSSProperties}
        href={sourceURL}
        rel="noreferrer"
        target="_blank">
        <FontAwesomeIcon icon={faExternalLinkAlt} />
        Open in source
      </a>
      <div className={styles.btn}>
        {audioURL && <AudioPlayer url={audioURL} />}
        <RoundButton
          iconName={faArrowRight}
          label="Next news"
          id="Next news"
          onClick={handleOnNextClick}
        />
      </div>
    </article>
  );
};

export default memo(Article);
