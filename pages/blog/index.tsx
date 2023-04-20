import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import HeadMeta from '@/components/HeadMeta';
import BlogView from '@/views/Blog';

import { filteredDataState, postDataState, selectedTagListState } from '@/recoil/post';
import { useActiveTagList, useBlogActions, useFilteredData, usePostData } from '@/hooks';
import { BlogPageProps } from '@/types/BlogTypes';
import { getAllTags, getCachedDatabaseItems, parseDatabaseItems, previewImage } from '@/utils';
import useInitializeDataState from '@/hooks/useInitializeDataState';

const BlogPage = ({ data, allTags }: BlogPageProps) => {
  useInitializeDataState({ data });
  //* 데이터 로직
  const router = useRouter();
  const currentPage = router.query.page ? parseInt(router.query.page.toString()) : 1;

  const [selectedTagList, setSelectedTagList] = useRecoilState(selectedTagListState);
  const filteredData = useRecoilValue(filteredDataState);
  const postData = useRecoilValue(postDataState);
  const postTotal = useMemo(() => filteredData.length, [filteredData]);
  const tagTotal = useMemo(() => selectedTagList.length, [selectedTagList]);

  //* 비즈니스 로직
  const [activeTagList, isHighlighted] = useActiveTagList(selectedTagList, filteredData);
  const { handlePageChange, handleToggleValue } = useBlogActions({
    currentPage,
    router,
    setSelectedTagList,
  });
  const isChecked = useCallback(
    (value: string) => selectedTagList.includes(value),
    [selectedTagList],
  );

  //* View 로직
  return (
    <>
      <HeadMeta />
      <BlogView
        handleToggleValue={handleToggleValue}
        isChecked={isChecked}
        isHighlighted={isHighlighted}
        handlePageChange={handlePageChange}
        allTags={allTags}
        postData={postData}
        currentPage={currentPage}
        postTotal={postTotal}
        tagTotal={tagTotal}
      />
    </>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getCachedDatabaseItems({ databaseId });

  const parsedData = parseDatabaseItems(databaseItems);

  const dataWithPreview = await previewImage.insertPreviewImage(parsedData);

  const allTags = getAllTags(parsedData);

  return {
    props: {
      data: dataWithPreview,
      allTags,
    },
    revalidate: 60,
  };
};
