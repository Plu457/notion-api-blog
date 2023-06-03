import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { currentPageState, postState, tagState } from '@/recoil/post';
import { BlogPageProps } from '@/types/BlogTypes';

const useInitializeDataState = ({ data, allTags = [] }: BlogPageProps) => {
  const router = useRouter();
  const currentPage = router.query.page ? parseInt(router.query.page.toString()) : 1;

  const setPostState = useSetRecoilState(postState);
  const setCurrentPageState = useSetRecoilState(currentPageState);
  const setTagState = useSetRecoilState(tagState);

  useEffect(() => {
    setPostState(data);
    setCurrentPageState(currentPage);
    setTagState(allTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
};

export default useInitializeDataState;
