import { useQuery } from 'react-query';
import axios from 'axios';
import useNews from '../store/useNews';

const newsApi = 'https://t-m-news.herokuapp.com/news';

const useGetNewsApi = (enabled: boolean) => {
  const [setNews] = useNews((s) => [s.setNews]);
  const id = useNews((s) => s.latestId);

  return useQuery(
    ['news', id],
    async () => {
      const url = `${newsApi}/${id}`;

      const response = await axios.get(url).then((res) => {
        setNews(res.data.articles);
      });
      return response;
    },
    { enabled }
  );
};

export default useGetNewsApi;
