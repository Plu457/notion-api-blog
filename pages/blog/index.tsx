import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

import { Constant } from '@/commons';
import { CardData } from '@/types/CardData';
import { getAllTags } from '@/utils/getAllTags';
import { getCachedDatabaseItems } from '@/utils/getCachedDatabaseItems';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';
import { insertPreviewImage } from '@/utils/previewImage';

import HeadMeta from '@/components/HeadMeta';
import BlogView from '@/views/Blog';

interface BlogProps {
  data: CardData[];
  allTags: CardData['tags'];
}

const BlogPage = ({ data, allTags }: BlogProps) => {
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

  const total = useMemo(() => {
    return filteredData.length;
  }, [filteredData]);

  const isChecked = useCallback(
    (value: string) => selectedTagList.includes(value),
    [selectedTagList],
  );

  const toggleValue = useCallback(({ checked, value }: { checked: boolean; value: string }) => {
    setSelectedTagList(prevList => {
      if (checked) {
        return [...prevList, value];
      }

      return prevList.filter(v => v !== value);
    });
  }, []);

  const postData = useMemo(() => {
    const start = Constant.POSTS_PER_PAGE * (currentPage - 1);
    const end = Constant.POSTS_PER_PAGE * currentPage;

    return filteredData.slice(start, end);
  }, [currentPage, filteredData]);

  const handlePageChange = useCallback(
    (page: number) => {
      push({
        pathname: '/blog',
        query: { page },
      });
    },
    [push],
  );

  return (
    <>
      <HeadMeta />
      <BlogView
        total={total}
        allTags={allTags}
        postData={postData}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        isChecked={isChecked}
        toggleValue={toggleValue}
      />
    </>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getCachedDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);

  const dataWithPreview = await insertPreviewImage(parsedData);

  const allTags = getAllTags(parsedData);

  return {
    props: {
      data: dataWithPreview,
      allTags,
    },
    revalidate: 60,
  };
};
