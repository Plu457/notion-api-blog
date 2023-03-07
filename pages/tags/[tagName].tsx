import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { CardData } from '@/types/CardData';
import { getAllTags } from '@/utils/getAllTags';
import { getCachedDatabaseItems } from '@/utils/getCachedDatabaseItems';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';
import { insertPreviewImage } from '@/utils/previewImage';

import HeadMeta from '@/components/HeadMeta';
import HeroContent from '@/components/HeroContent';
import LoadingSpinner from '@/components/LoadingSpinner';
import TagNameView from '@/views/TagNameView';

interface TagNameProps {
  data: CardData[];
  allTags: CardData['tags'];
  tagName: string;
}

const TagNamePage = ({ data, allTags, tagName }: TagNameProps) => {
  const { isFallback } = useRouter();

  if (isFallback)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <HeadMeta title={`${tagName} 검색 결과`} />
      <HeroContent title={`#${tagName}`} description={`${data?.length}개의 결과가 있습니다.`} />
      <TagNameView data={data} allTags={allTags} tagName={tagName} />
    </>
  );
};

export default TagNamePage;

export const getStaticProps: GetStaticProps<TagNameProps> = async ({ params }) => {
  const databaseId = process.env.DATABASE_ID;
  const tagName = params?.tagName?.toString().toUpperCase();

  if (!databaseId) throw new Error('DATABASE_ID is not defined');
  if (!tagName) throw new Error('tagName is not defined');

  const databaseItems = await getCachedDatabaseItems(databaseId, [tagName]);

  const parsedData = parseDatabaseItems(databaseItems);

  const dataWithPreview = await insertPreviewImage(parsedData);

  const allTags = getAllTags(parsedData);

  return {
    props: {
      data: dataWithPreview,
      allTags,
      tagName,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getCachedDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);

  const allTags = getAllTags(parsedData);

  const paths = allTags.map(({ name: tagName }) => ({
    params: { tagName: tagName.toLowerCase() },
  }));

  return {
    paths,
    fallback: true,
  };
};
