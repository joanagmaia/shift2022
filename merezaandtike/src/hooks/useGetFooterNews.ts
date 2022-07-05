import { useQuery } from 'react-query';
import axios from 'axios';

const newsFooterApi = 'https://t-m-news.herokuapp.com/footer';

const useGetFooterNews = () => {
  const query = useQuery(
    ['news-footer'],
    async () => {
      const response = await axios.get(newsFooterApi).then((res) => res.data);
      return response;
    },
    {
      refetchInterval: 300000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return {
    data: query.data,
    isFetching: query.isFetching,
    isError: query.isError,
    isFetched: query.isFetched,
  };
};

export default useGetFooterNews;
