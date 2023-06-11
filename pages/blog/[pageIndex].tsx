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

export const getStaticProps: GetStaticProps<BlogPageProps, { pageIndex: string }> = async ({
  params,
}) => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getCachedDatabaseItems({ databaseId });
  const page = params?.pageIndex ? Number(params.pageIndex) : 1;

  const parsedData = parseDatabaseItems(databaseItems);
  const dataWithPreview = await previewImage.insertPreviewImage(parsedData);
  const allTags = getAllTags(parsedData);

  const paginatedData = dataWithPreview.slice(
    (page - 1) * Constant.POSTS_PER_PAGE,
    page * Constant.POSTS_PER_PAGE,
  );

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
  const totalPages = Math.ceil(totalPosts / Constant.POSTS_PER_PAGE);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { pageIndex: String(i + 1) },
  }));

  return {
    paths,
    fallback: true,
  };
};
