import { GetStaticPaths, GetStaticProps } from 'next';
import { Constant } from '@/commons';
import { getCachedDatabaseItems, parseDatabaseItems, previewImage, getAllTags } from '@/utils';
import { useInitializeDataState } from '@/hooks';
import HeadMeta from '@/components/HeadMeta';
import BlogView from '@/views/Blog';
import { BlogPageProps } from '@/types/BlogTypes';

const BlogPageWithPage = ({ data, allTags }: BlogPageProps) => {
  useInitializeDataState({ data, allTags });

  return (
    <>
      <HeadMeta />
      <BlogView />
    </>
  );
};

export default BlogPageWithPage;

export const getStaticProps: GetStaticProps<BlogPageProps, { pageId: string }> = async ({
  params,
}) => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getCachedDatabaseItems({ databaseId });
  const page = params?.pageId ? Number(params.pageId) : 1;

  const parsedData = parseDatabaseItems(databaseItems);
  const dataWithPreview = await previewImage.insertPreviewImage(parsedData);
  const allTags = getAllTags(parsedData);

  const paginatedData = dataWithPreview.slice((page - 1) * 9, page * 9);

  return {
    props: {
      data: paginatedData,
      allTags,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw Error('DATABASE_ID is not defined');

  const databaseItems = await getCachedDatabaseItems({ databaseId });

  const totalPosts = databaseItems.length;
  const totalPages = Math.ceil(totalPosts / 9);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { pageId: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};
