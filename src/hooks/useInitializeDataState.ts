import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { currentPageState, postState, selectedTagListState, tagState } from '@/recoil/post';
import { IBlogPage } from '@/types/BlogTypes';

const useInitializeDataState = ({ data, tagList = [] }: IBlogPage) => {
  const router = useRouter();
  const currentPage = router.query.page ? parseInt(router.query.page.toString()) : 1;

  const setPostState = useSetRecoilState(postState);
  const resetPostState = useResetRecoilState(postState);

  const setTagState = useSetRecoilState(tagState);
  const resetTagState = useResetRecoilState(tagState);

  const setCurrentPageState = useSetRecoilState(currentPageState);

  const setSelectedTagList = useSetRecoilState(selectedTagListState);
  const resetSelectedTagList = useResetRecoilState(selectedTagListState);

  useEffect(() => {
    resetPostState();
    resetTagState();
    resetSelectedTagList();
    setPostState(data);
    setTagState(tagList);

    if (router.query.q) {
      const tagsFromQueryString = decodeURIComponent(
        router.query.q.toString().replace(/\+/g, ' '),
      ).split(' ');
      setSelectedTagList(tagsFromQueryString);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, tagList, router.asPath, router.query]);

  useEffect(() => {
    setCurrentPageState(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
};

export default useInitializeDataState;
