import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { currentPageState, selectedTagListState } from '@/recoil/post';

const useBlogNavigation = () => {
  const router = useRouter();
  const currentPage = useRecoilValue(currentPageState);
  const setSelectedTagList = useSetRecoilState(selectedTagListState);

  const navigateToPage = (page: number) => {
    router.push({
      pathname: '/blog',
      query: { page },
    });
  };

  const resetPage = () => {
    if (currentPage !== 1) {
      navigateToPage(1);
    }
  };

  const toggleTagInList = (tag: { checked: boolean; value: string }) => {
    resetPage();
    setSelectedTagList(prevList => {
      if (tag.checked) {
        return [...prevList, tag.value];
      }
      return prevList.filter(v => v !== tag.value);
    });
  };

  return {
    navigateToPage,
    toggleTagInList,
  };
};

export default useBlogNavigation;