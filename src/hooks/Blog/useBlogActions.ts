import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface UseBlogActionsProps {
  currentPage: number;
  router: ReturnType<typeof useRouter>;
  setSelectedTagList: React.Dispatch<React.SetStateAction<string[]>>;
}

const useBlogActions = ({ currentPage, router, setSelectedTagList }: UseBlogActionsProps) => {
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
