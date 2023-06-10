import { GetStaticProps } from 'next';

import { useInitializeDataState } from '@/hooks';
import { IBlogPage } from '@/types/BlogTypes';
import { getAllTags, getCachedDatabaseItems, parseDatabaseItems, previewImage } from '@/utils';

import HeadMeta from '@/components/HeadMeta';
import BlogView from '@/views/Blog';

const BlogPage = ({ data, tagList }: IBlogPage) => {
  useInitializeDataState({ data, tagList });

  return (
    <>
      <HeadMeta />
      <BlogView />
    </>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps<IBlogPage> = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getCachedDatabaseItems({ databaseId });

  const parsedData = parseDatabaseItems(databaseItems);

  const dataWithPreview = await previewImage.insertPreviewImage(parsedData);

  const tagList = getAllTags(parsedData);

  return {
    props: {
      data: dataWithPreview,
      tagList,
    },
    revalidate: 60,
  };
};
