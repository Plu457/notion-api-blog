import { CardData } from '@/types/CardData';
import { useMemo } from 'react';

const useFilteredData = (data: CardData[], selectedTagList: string[]) => {
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
