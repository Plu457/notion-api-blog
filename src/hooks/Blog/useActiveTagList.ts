import { CardData } from '@/types/CardData';
import { useCallback, useEffect, useState } from 'react';

type UseActiveTagListReturnType = [string[], (value: string) => boolean];

const useActiveTagList = (
  selectedTagList: string[],
  filteredData: CardData[],
): UseActiveTagListReturnType => {
  const [activeTagList, setActiveTagList] = useState<string[]>([]);

  useEffect(() => {
    const activeTags: string[] = [];

    filteredData.forEach(item => {
      if (
        selectedTagList.length === 0 ||
        item.tags.some(tag => selectedTagList.includes(tag.name))
      ) {
        item.tags.forEach(tag => {
          activeTags.push(tag.name);
        });
      }
    });

    setActiveTagList(Array.from(new Set(activeTags)));
  }, [selectedTagList, filteredData]);

  const isHighlighted = useCallback(
    (value: string) => activeTagList.includes(value),
    [activeTagList],
  );

  return [activeTagList, isHighlighted];
};

export default useActiveTagList;
