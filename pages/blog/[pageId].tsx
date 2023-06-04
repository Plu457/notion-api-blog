import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ExtendedRecordMap } from 'notion-types';

import { getPageContent } from '@/cms/notion';
import { getCachedDatabaseItems, previewImage } from '@/utils';
import Format from '@/utils/Format';
import LoadingSpinner from '@/components/LoadingSpinner';
import BlogDetailView from '@/views/Blog/BlogDetailView';
import HeadMeta from '@/components/HeadMeta';

interface IBlogDetail {
  recordMap: ExtendedRecordMap;
}

const BlogDetailPage = ({ recordMap }: IBlogDetail) => {
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

export const getStaticProps: GetStaticProps<IBlogDetail> = async ({ params }) => {
  const pageId = params?.pageId;

  if (!pageId) throw Error('PageId is not defined');

  const recordMap = await getPageContent(pageId.toString());

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

  const paths = databaseItems.map(({ id: pageId }: { id: string }) => ({ params: { pageId } }));

  return {
    paths,
    fallback: true,
  };
};
