import { getPageContent } from '@/cms/notion';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ExtendedRecordMap } from 'notion-types';

import LoadingSpinner from '@/components/LoadingSpinner';
import BlogDetailView from '@/views/Blog/BlogDetailView';
import { getCachedDatabaseItems, previewImage } from '@/utils';
import HeadMeta from '@/components/HeadMeta';
import Format from '@/utils/Format';

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

  const title = Format.getPageProperty(recordMap, 'title');
  const description = Format.getPageProperty(recordMap, 'SEzr');

  return (
    <>
      <HeadMeta title={title} description={description} />
      <BlogDetailView recordMap={recordMap} />
    </>
  );
};

export default BlogDetailPage;

export const getStaticProps: GetStaticProps<BlogDetailProps> = async ({ params }) => {
  const blogId = params?.blogId;

  if (!blogId) throw Error('blogId is not defined');

  const recordMap = await getPageContent(blogId.toString());

  const formatRecordMap = Format.formatRecordMapImageSize({
    recordMap,
    width: 2000,
    height: 582,
    format: 'webp',
  });

  const preview_images = await previewImage.insertPreviewImageToRecordMap(formatRecordMap);

  return {
    props: { recordMap: { ...recordMap, preview_images } },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw Error('DATABASE_ID is not defined');

  const databaseItems = await getCachedDatabaseItems({ databaseId });

  const paths = databaseItems.map(({ id: blogId }: { id: string }) => ({ params: { blogId } }));

  return {
    paths,
    fallback: true,
  };
};
