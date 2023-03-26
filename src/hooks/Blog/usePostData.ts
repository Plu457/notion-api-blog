import { Constant } from '@/commons';
import { CardData } from '@/types/CardData';
import { useMemo } from 'react';

const usePostData = (filteredData: CardData[], currentPage: number) => {
  return useMemo(() => {
    const start = Constant.POSTS_PER_PAGE * (currentPage - 1);
    const end = Constant.POSTS_PER_PAGE * currentPage;

    return filteredData.slice(start, end);
  }, [currentPage, filteredData]);
};

export default usePostData;
