import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

const useActiveTagList = (
  selectedTagList: string[],
  filteredData: CardData[],
): [string[], (value: string) => boolean] => {
  const [activeTagList, setActiveTagList] = useState<string[]>([]);

  useEffect(() => {
    const activeTags: string[] = [];

    filteredData.forEach(item => {
      if (
        selectedTagList.length === 0 ||
        item.tags.some(tag => selectedTagList.includes(tag.name))
      ) {
        item.tags.forEach(tag => {
          activeTags.push(tag.name);
        });
      }
    });

    setActiveTagList(Array.from(new Set(activeTags)));
  }, [selectedTagList, filteredData]);

  const isHighlighted = useCallback(
    (value: string) => activeTagList.includes(value),
    [activeTagList],
  );

  return [activeTagList, isHighlighted];
};

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

  const postData = useMemo(() => {
    const start = Constant.POSTS_PER_PAGE * (currentPage - 1);
    const end = Constant.POSTS_PER_PAGE * currentPage;

    return filteredData.slice(start, end);
  }, [currentPage, filteredData]);

  const handleToggleValue = useCallback(
    ({ checked, value }: { checked: boolean; value: string }) => {
      setSelectedTagList(prevList => {
        if (checked) {
          return [...prevList, value];
        }
        return prevList.filter(v => v !== value);
      });
    },
    [],
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
