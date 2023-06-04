import { Constant } from '@/commons';
import { IArticle } from '@/types/article';
import { useMemo } from 'react';

const usePostData = (filteredData: IArticle[], currentPage: number) => {
  return useMemo(() => {
    const start = Constant.POSTS_PER_PAGE * (currentPage - 1);
    const end = Constant.POSTS_PER_PAGE * currentPage;

    return filteredData.slice(start, end);
  }, [currentPage, filteredData]);
};

export default usePostData;
