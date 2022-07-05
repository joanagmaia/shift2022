import { CSSProperties, useRef, useState, useEffect, memo } from 'react';
import { nanoid } from 'nanoid';
import FootnotePopup from './FootnotePopup';
import TagButton from '../TagButton';
import styles from './footnote.module.scss';
import useGetFooterNews from '../../hooks/useGetFooterNews';

const Footnote = () => {
  const { data, isFetching, isFetched } = useGetFooterNews();
  const ref = useRef<any>(null);
  const hasNews = !isFetching && data?.length > 0;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [messagesWidth, setMessagesWidth] = useState();

  useEffect(() => {
    setMessagesWidth(ref?.current?.offsetWidth);
  }, [isFetched]);

  const style = {
    '--translation': `-${messagesWidth}px`,
  };

  return (
    <footer className={styles.footer}>
      {isFetching && <span className={styles.message}>Looking for news</span>}
      {!hasNews && <span className={styles.message}>No custom news yet!</span>}x
      {hasNews && (
        <div
          className={styles.newsWrapper}
          ref={ref}
          style={style as CSSProperties}>
          {data?.map((message: string, i: number) => (
            <>
              <span key={nanoid()} className={styles.message}>
                {message}
              </span>
              {i < data.length - 1 && <hr className={styles.smallDivider} />}
            </>
          ))}
        </div>
      )}
      <div className={styles.buttonWrapper}>
        <hr className={styles.divider} />
        <TagButton
          ariaLabel="footerTagButton"
          id="footerButton"
          size="medium"
          content="Share your news"
          onClick={() => setIsPopupOpen(!isPopupOpen)}
        />
      </div>
      {isPopupOpen && (
        <FootnotePopup onShareFinished={() => setIsPopupOpen(false)} />
      )}
    </footer>
  );
};

export default memo(Footnote);
