import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ExtendedRecordMap } from 'notion-types';

import { getDatabaseItems, getPageContent } from '@/cms/notion';
import HeadMeta from '@/components/HeadMeta';
import LoadingSpinner from '@/components/LoadingSpinner';
import { previewImage } from '@/utils';
import Format from '@/utils/Format';
import BlogDetailView from '@/views/Blog/BlogDetailView';

interface IArticleDetail {
  recordMap: ExtendedRecordMap;
}

const ArticleDetailPage = ({ recordMap }: IArticleDetail) => {
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

export default ArticleDetailPage;

export const getStaticProps: GetStaticProps<IArticleDetail> = async ({ params }) => {
  const id = params?.id;

  if (!id) throw Error('id is not defined');

  const recordMap = await getPageContent(id.toString());

  const preview_images = await previewImage.insertPreviewImageToRecordMap(recordMap);

  return {
    props: { recordMap: { ...recordMap, preview_images } },
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.NEXT_PUBLIC_MAINBLOG_ID;

  if (!databaseId) throw Error('DATABASE_ID is not defined');

  const databaseItems = await getDatabaseItems({ databaseId });

  const paths = databaseItems.map(({ id }: { id: string }) => ({ params: { id } }));

  return {
    paths,
    fallback: true,
  };
};
