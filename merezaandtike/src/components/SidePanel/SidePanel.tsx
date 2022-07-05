import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import useAudioAnimation from '../../store/useAudioAnimation';
import { parseTime } from '../../utils/strings';
import styles from './sidePanel.module.scss';

type PropTypes = {
  news: { id: string; title: string }[];
};

const SidePanel = ({ news }: PropTypes) => {
  const [duration, isPaused] = useAudioAnimation((state) => [
    state.duration,
    state.isPaused,
  ]);
  const [counter, setCounter] = useState<number>(0);
  const interval = useRef<any>(null);

  const clear = () => {
    window.clearInterval(interval.current);
  };

  useEffect(() => {
    if (duration) {
      setCounter(duration + 3);
    }
  }, [duration]);

  useEffect(() => {
    if (Math.floor(counter) > 0) {
      interval.current = window.setInterval(() => {
        setCounter((time) => time - 1);
      }, 1000);
    }

    return () => {
      clear();
    };
  }, [counter]);

  useEffect(() => {
    if (isPaused) {
      clear();
    } else if (Math.floor(counter) > 0) {
      interval.current = window.setInterval(() => {
        setCounter((time) => time - 1);
      }, 1000);
    }

    return () => {
      clear();
    };
  }, [isPaused]);

  const parsedTime = useMemo(
    () => (counter ? parseTime(counter) : 'Paused'),
    [counter]
  );

  const newsTitleClass = classNames(styles.heading, styles.newsTitle);
  const timeClass = classNames(styles.heading, styles.time);
  const headerTitleClass = classNames(styles.heading, styles.title);

  return (
    <aside aria-label="Side Panel for Next News" className={styles.sidePanel}>
      <header>
        <h2 className={headerTitleClass}>Up next in</h2>
        <h3 className={timeClass}>{parsedTime}</h3>
      </header>
      <section className={styles.sidePanelContent}>
        {news.slice(0, 3).map(({ title, id }) => (
          <h5 key={id} className={newsTitleClass}>
            {title}
          </h5>
        ))}
      </section>
    </aside>
  );
};

export default SidePanel;
