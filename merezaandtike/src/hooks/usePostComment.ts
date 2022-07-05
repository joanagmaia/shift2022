import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

const newsFooterEp = 'https://t-m-news.herokuapp.com/comment';

const usePostComments = () =>
  useMutation(async (comment: string) => {
    const response = await axios.post(newsFooterEp, { comment });

    return response;
  });

export default usePostComments;
