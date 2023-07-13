import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { currentPageState, postState, selectedTagListState, tagState } from '@/recoil/post';
import { IBlogPage } from '@/types/BlogTypes';

const useInitializeDataState = ({ data, tagList = [] }: IBlogPage) => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page?.toString() ?? '1');

  const setPostState = useSetRecoilState(postState);
  const setTagState = useSetRecoilState(tagState);
  const setSelectedTagList = useSetRecoilState(selectedTagListState);
  const setCurrentPageState = useSetRecoilState(currentPageState);

  useEffect(() => {
    setPostState(data);
    setTagState(tagList);

    const tagsFromQueryString = router.query.q
      ? decodeURIComponent(router.query.q.toString().replace(/\+/g, ' ')).split(' ')
      : [];

    setSelectedTagList(tagsFromQueryString);
  }, [data, tagList, router.asPath, router.query, setPostState, setTagState, setSelectedTagList]);

  useEffect(() => {
    setCurrentPageState(currentPage);
  }, [currentPage, setCurrentPageState]);
};

export default useInitializeDataState;
