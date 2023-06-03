import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { currentPageState, selectedTagListState } from '@/recoil/post';

const useBlogActions = () => {
  const router = useRouter();
  const currentPage = useRecoilValue(currentPageState);
  const setSelectedTagList = useSetRecoilState(selectedTagListState);

  const handlePageChange = useCallback(
    (page: number) => {
      router.push({
        pathname: '/blog',
        query: { page },
      });
    },
    [router],
  );

  const handleToggleValue = useCallback(
    ({ checked, value }: { checked: boolean; value: string }) => {
      if (currentPage !== 1) {
        router.push({
          pathname: '/blog',
          query: { page: 1 },
        });
      }

      setSelectedTagList(prevList => {
        if (checked) {
          return [...prevList, value];
        }
        return prevList.filter(v => v !== value);
      });
    },
    [currentPage, router, setSelectedTagList],
  );

  return {
    handlePageChange,
    handleToggleValue,
  };
};

export default useBlogActions;
