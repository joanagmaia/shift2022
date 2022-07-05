import { useEffect, useState } from 'react';
import Article from '../Article';
import SidePanel from '../SidePanel';
import Footnote from '../Footnote';
import styles from './app.module.scss';
import useTheme from '../../store/usetheme';
import useGetNews from '../../hooks/useGetNews';
import useNews, { News } from '../../store/useNews';
import LandingPage from '../LandingPage';
import { getImageSource } from '../../utils/strings';
import useAudioAnimation from '../../store/useAudioAnimation';

const App = () => {
  const [theme, changeTheme] = useTheme((s) => [s.theme, s.changeTheme]);
  const [hasAccess, setHasAccess] = useState(false);
  const [comingNews, focusedNews] = useNews((s) => [
    s.comingNews,
    s.focusedNews,
  ]);

  useGetNews(hasAccess);

  useEffect(() => {
    if (focusedNews) {
      changeTheme((focusedNews as News).emotion || 'neutral');
    }
  }, [focusedNews]);

  if (!hasAccess) {
    return <LandingPage onClick={() => setHasAccess(true)} />;
  }

  return (
    <div
      className={styles.page}
      style={{ backgroundColor: theme.backgroundColor }}>
      <div className={styles.pageContent}>
        <div className={styles.leftPanel}>
          <div className={styles.article}>
            <div className={styles.animation}>
              {!!focusedNews && (
                <img
                  alt="desert-fox-happy"
                  src={getImageSource(focusedNews.emotion)}
                  className={styles.desertFox}
                />
              )}
            </div>
            {!!focusedNews && (
              <div className={styles.articleContent}>
                <Article
                  content={focusedNews.text}
                  emotion={focusedNews.emotion}
                  imageURL={focusedNews.urlToImage}
                  sourceURL={focusedNews.url}
                  title={focusedNews.title}
                  audioURL={focusedNews.audioUrl}
                />
              </div>
            )}
          </div>
        </div>
        {!!comingNews && <SidePanel news={comingNews} />}
      </div>
      <Footnote />
    </div>
  );
};

export default App;
