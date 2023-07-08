import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { currentPageState, postState, selectedTagListState, tagState } from '@/recoil/post';
import { IBlogPage } from '@/types/BlogTypes';

interface resetAndSetStateParams {
  resetFn: () => void;
  setFn: (value: any) => void;
  value: any;
}

const useInitializeDataState = ({ data, tagList = [] }: IBlogPage) => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page?.toString() ?? '1');

  const resetAndSetState = ({ resetFn, setFn, value }: resetAndSetStateParams) => {
    resetFn();
    setFn(value);
  };

  const resetPostState = useResetRecoilState(postState);
  const setPostState = useSetRecoilState(postState);

  const resetTagState = useResetRecoilState(tagState);
  const setTagState = useSetRecoilState(tagState);

  const resetSelectedTagList = useResetRecoilState(selectedTagListState);
  const setSelectedTagList = useSetRecoilState(selectedTagListState);

  const setCurrentPageState = useSetRecoilState(currentPageState);

  useEffect(() => {
    resetAndSetState({ resetFn: resetPostState, setFn: setPostState, value: data });
    resetAndSetState({ resetFn: resetTagState, setFn: setTagState, value: tagList });

    const tagsFromQueryString = router.query.q
      ? decodeURIComponent(router.query.q.toString().replace(/\+/g, ' ')).split(' ')
      : [];

    resetAndSetState({
      resetFn: resetSelectedTagList,
      setFn: setSelectedTagList,
      value: tagsFromQueryString,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, tagList, router.asPath, router.query]);

  useEffect(() => {
    setCurrentPageState(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
};

export default useInitializeDataState;
