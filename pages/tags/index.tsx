import { getDatabaseItems } from 'cms/notion';
import { GetStaticProps } from 'next';

import { CardData } from 'types/CardData';
import { getAllTags } from 'utils/getAllTags';
import { parseDatabaseItems } from 'utils/parseDatabaseItems';

import HeadMeta from 'components/HeadMeta';
import HeroContent from 'components/HeroContent';
import { insertPreviewImage } from 'utils/previewImage';
import TagIndexView from 'views/TagIndexView';

interface TagIndexPageProps {
  data: Record<string, CardData[]>;
  allTags: CardData['tags'];
}

const TagIndexPage = ({ data, allTags }: TagIndexPageProps) => {
  return (
    <>
      <HeadMeta title="Tags" />
      <HeroContent />
      <TagIndexView data={data} allTags={allTags} />
    </>
  );
};

export default TagIndexPage;

export const getStaticProps: GetStaticProps<TagIndexPageProps> = async ({ params }) => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);

  const dataWithPreview = await insertPreviewImage(parsedData);

  const allTags = getAllTags(parsedData);

  const dataByTag = allTags.reduce<Record<string, CardData[]>>((acc, { name }) => {
    acc[name] = dataWithPreview.filter(
      ({ tags }) => tags.findIndex(tag => tag.name === name) !== -1,
    );

    return acc;
  }, {});

  return {
    props: {
      data: dataByTag,
      allTags,
    },
    revalidate: 60,
  };
};
