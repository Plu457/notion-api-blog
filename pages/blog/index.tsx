import { GetStaticProps } from 'next';

import { useInitializeDataState } from '@/hooks';
import { BlogPageProps } from '@/types/BlogTypes';
import { getAllTags, getCachedDatabaseItems, parseDatabaseItems, previewImage } from '@/utils';

import HeadMeta from '@/components/HeadMeta';
import BlogView from '@/views/Blog';

const BlogPage = ({ data, allTags }: BlogPageProps) => {
  useInitializeDataState({ data, allTags });

  return (
    <>
      <HeadMeta />
      <BlogView />
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
