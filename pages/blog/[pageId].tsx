import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ExtendedRecordMap } from 'notion-types';

import { getDatabaseItems, getPageContent } from 'cms/notion';
import NotionPageRenderer from 'components/notion/NotionPageRenderer';

interface BlogDetailProps {
  recordMap: ExtendedRecordMap;
}

const BlogDetailPage = ({ recordMap }: BlogDetailProps) => {
  return (
    <section>
      <NotionPageRenderer recordMap={recordMap} />
    </section>
  );
};

export default BlogDetailPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageId = params?.pageId;

  if (!pageId) throw Error('PageId is not defined');

  const recordMap = await getPageContent(pageId.toString());

  return {
    props: { recordMap },
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
