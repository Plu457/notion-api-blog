import { GetStaticProps } from 'next';

import { useInitializeDataState } from '@/hooks';
import { IBlogPage } from '@/types/BlogTypes';
import { getAllTags, getCachedDatabaseItems, parseDatabaseItems, previewImage } from '@/utils';

import AlgorithmView from '@/views/Algorithm';
import { HeadMeta } from '@/components';

const AlgorithmPage = ({ data, tagList }: IBlogPage) => {
  useInitializeDataState({ data, tagList });

  return (
    <>
      <HeadMeta />
      <AlgorithmView />
    </>
  );
};

export default AlgorithmPage;

export const getStaticProps: GetStaticProps<IBlogPage> = async () => {
  const databaseId = process.env.NEXT_PUBLIC_ALGORITHM_ID;

  if (!databaseId) throw new Error('데이터를 불러올 수 없습니다. (ALGORITHM_ID)');

  const databaseItems = await getCachedDatabaseItems({ databaseId });

  const parsedData = parseDatabaseItems(databaseItems);

  const dataWithPreview = await previewImage.insertPreviewImage(parsedData);

  const tagList = getAllTags(parsedData);

  return {
    props: {
      data: dataWithPreview,
      tagList,
    },
    revalidate: 300,
  };
};
