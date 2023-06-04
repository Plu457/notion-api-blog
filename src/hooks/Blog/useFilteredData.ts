import { useMemo } from 'react';
import { IArticle } from '@/types/article';

const useFilteredData = (data: IArticle[], selectedTagList: string[]) => {
  return useMemo(() => {
    if (!selectedTagList.length) {
      return data;
    }

    return data.filter(item =>
      selectedTagList.every(tagName => item.tags.some(tag => tag.name === tagName)),
    );
  }, [data, selectedTagList]);
};

export default useFilteredData;
