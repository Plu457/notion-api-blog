import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

import { Constant } from '@/commons';

import HeadMeta from '@/components/HeadMeta';
import BlogView from '@/views/Blog';

import { useActiveTagList } from '@/hooks';
import { BlogPageProps } from '@/types/BlogTypes';
import { getAllTags, getCachedDatabaseItems, parseDatabaseItems, previewImage } from '@/utils';

const BlogPage = ({ data, allTags }: BlogPageProps) => {
  const { query, push } = useRouter();
  const currentPage = query.page ? parseInt(query.page.toString()) : 1;

  const [selectedTagList, setSelectedTagList] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (!selectedTagList.length) {
      return data;
    }

    return data.filter(item =>
      selectedTagList.every(tagName => item.tags.some(tag => tag.name === tagName)),
    );
  }, [data, selectedTagList]);

  const postData = useMemo(() => {
    const start = Constant.POSTS_PER_PAGE * (currentPage - 1);
    const end = Constant.POSTS_PER_PAGE * currentPage;

    return filteredData.slice(start, end);
  }, [currentPage, filteredData]);

  const handleToggleValue = useCallback(
    ({ checked, value }: { checked: boolean; value: string }) => {
      if (currentPage !== 1) {
        // 페이지 번호가 1이 아닌 경우, 페이지 번호를 1로 이동
        push({
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
    [currentPage, push],
  );

  const isChecked = useCallback(
    (value: string) => selectedTagList.includes(value),
    [selectedTagList],
  );

  const [activeTagList, isHighlighted] = useActiveTagList(selectedTagList, filteredData);

  const handlePageChange = useCallback(
    (page: number) => {
      push({
        pathname: '/blog',
        query: { page },
      });
    },
    [push],
  );

  const BlogPageProps = {
    handleToggleValue,
    isChecked,
    isHighlighted,
    handlePageChange,
    allTags,
    postData,
    currentPage,
    postTotal: useMemo(() => filteredData.length, [filteredData]),
    tagTotal: useMemo(() => selectedTagList.length, [selectedTagList]),
  };

  return (
    <>
      <HeadMeta />
      <BlogView {...BlogPageProps} />
    </>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getCachedDatabaseItems(databaseId);

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
