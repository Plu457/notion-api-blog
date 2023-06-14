import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { currentPageState, postState, tagState } from '@/recoil/post';
import { IBlogPage } from '@/types/BlogTypes';

const useInitializeDataState = ({ data, tagList = [] }: IBlogPage) => {
  const router = useRouter();
  const currentPage = router.query.page ? parseInt(router.query.page.toString()) : 1;

  const setPostState = useSetRecoilState(postState);
  const resetPostState = useResetRecoilState(postState);

  const setTagState = useSetRecoilState(tagState);
  const resetTagState = useResetRecoilState(tagState);

  const setCurrentPageState = useSetRecoilState(currentPageState);

  useEffect(() => {
    resetPostState();
    resetTagState();
    setPostState(data);
    setTagState(tagList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, tagList, router.asPath]);

  useEffect(() => {
    setCurrentPageState(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
};

export default useInitializeDataState;
