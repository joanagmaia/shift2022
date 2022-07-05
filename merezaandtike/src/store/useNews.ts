import create, { SetState } from 'zustand';
import produce from 'immer';
import { getBiggerId } from '../utils/strings';

export type News = {
  id: string;
  title: string;
  text: string;
  source: string;
  url: string;
  audioUrl: string;
  urlToImage: string;
  emotion: string;
  category: string;
  publishedAt: string;
};

type State = {
  latestId: number;
  news: News[];
  focusedNews: News;
  comingNews: News[];
  setNews: (n: News[]) => void;
  setFocusedNews: () => void;
};

const useNews = create<State>(
  produce((set: SetState<State>) => ({
    latestId: 0,
    focusedNews: null,
    comingNews: [],
    news: [],
    setNews: (n: News[]) =>
      set(
        produce((state: State) => {
          state.news = n;

          if (!state.focusedNews) {
            const first = n.shift();

            if (first) {
              state.focusedNews = first;
            }
          }

          state.comingNews = state.comingNews.concat(n);
        })
      ),
    setFocusedNews: () =>
      set(
        produce((state: State) => {
          const focused = state.comingNews.shift();

          if (focused) {
            state.focusedNews = focused;
          }

          if (state.comingNews.length === 0) {
            const newsIds = state.news.map((item) => item.id);

            state.latestId = getBiggerId(newsIds);
          }
        })
      ),
  }))
);

export default useNews;
