import Giscus from '@giscus/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ExtendedRecordMap } from 'notion-types';
import { getDatabaseItems, getPageContent } from 'cms/notion';

import LoadingSpinner from 'components/LoadingSpinner';
import NotionPageRenderer from 'components/NotionPageRenderer';
import { insertPreviewImageToRecordMap } from 'utils/previewImage';

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

  return (
    <section>
      <NotionPageRenderer recordMap={recordMap} />
      <div className="max-w-4xl mx-auto my-8">
        <Giscus
          id="comments"
          term="blog"
          repo="Plu457/notion-api-blog"
          repoId="R_kgDOITdSYA"
          category="General"
          categoryId="DIC_kwDOITdSYM4CTrlu"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="ko"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default BlogDetailPage;

export const getStaticProps: GetStaticProps<BlogDetailProps> = async ({ params }) => {
  const pageId = params?.pageId;

  if (!pageId) throw Error('PageId is not defined');

  const recordMap = await getPageContent(pageId.toString());

  const preview_images = await insertPreviewImageToRecordMap(recordMap);

  return {
    props: { recordMap: { ...recordMap, preview_images } },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw Error('DATABASE_ID is not defined');

  const databaseItems = await getDatabaseItems(databaseId);

  const paths = databaseItems.map(({ id: pageId }) => ({ params: { pageId } }));

  return {
    paths,
    fallback: true,
  };
};
