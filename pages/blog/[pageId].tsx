import { getPageContent } from '@/cms/notion';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ExtendedRecordMap } from 'notion-types';

import LoadingSpinner from '@/components/LoadingSpinner';
import BlogDetailView from '@/views/Blog/BlogDetailView';
import { getCachedDatabaseItems, previewImage } from '@/utils';

interface BlogDetailProps {
  recordMap: ExtendedRecordMap;
}

const BlogDetailPage = ({ recordMap }: BlogDetailProps) => {
  const { isFallback } = useRouter();

  if (isFallback)
    return (
      <section className="flex items-center justify-center w-full h-screen">
        <LoadingSpinner />
      </section>
    );

  return <BlogDetailView recordMap={recordMap} />;
};

export default BlogDetailPage;

export const getStaticProps: GetStaticProps<BlogDetailProps> = async ({ params }) => {
  const pageId = params?.pageId;

  if (!pageId) throw Error('PageId is not defined');

  const recordMap = await getPageContent(pageId.toString());

  const preview_images = await previewImage.insertPreviewImageToRecordMap(recordMap);

  return {
    props: { recordMap: { ...recordMap, preview_images } },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw Error('DATABASE_ID is not defined');

  const databaseItems = await getCachedDatabaseItems({ databaseId });

  const paths = databaseItems.map(({ id: pageId }: { id: string }) => ({ params: { pageId } }));

  return {
    paths,
    fallback: true,
  };
};
