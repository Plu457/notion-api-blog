import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { getDatabaseItems } from 'cms/notion';

import { CardData } from 'types';
import { parseDatabaseItems } from 'utils/parseDatabaseItems';
import { getAllTags } from 'utils/getAllTags';
import { insertPreviewImage } from 'utils/previewImage';

import HeroSection from 'components/intro/HeroSection';
import TagList from 'components/card/tags/TagList';
import CardList from 'components/card/CardList';
import LoadingSpinner from 'components/LoadingSpinner';
import PageHead from 'components/PageHead';

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
      <PageHead title={`${tagName} 검색 결과`} />
      <HeroSection title={`#${tagName}`} description={`${data?.length}개의 결과가 있습니다.`} />
      <section className="flex flex-col-reverse md:flex-row m-4 min-h-[60vh] max-w-6xl mx-auto px-4 gap-8">
        <aside className="basis-[20%]">
          <div className="p-4 border shadow-md rounded-xl">
            <h2 className="mb-5 text-2xl font-bold">All Tags</h2>
            <TagList tags={allTags} />
          </div>
        </aside>
        <div className="flex-grow">
          <h3 className="mb-4 text-4xl font-bold">{`#${tagName}`}</h3>
          <CardList data={data} />
        </div>
      </section>
    </>
  );
};

export default TagNamePage;

export const getStaticProps: GetStaticProps<TagNameProps> = async ({ params }) => {
  const databaseId = process.env.DATABASE_ID;
  const tagName = params?.tagName?.toString().toUpperCase();

  if (!databaseId) throw new Error('DATABASE_ID is not defined');
  if (!tagName) throw new Error('tagName is not defined');

  const databaseItems = await getDatabaseItems(databaseId, { tagName });

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

  const databaseItems = await getDatabaseItems(databaseId);

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
