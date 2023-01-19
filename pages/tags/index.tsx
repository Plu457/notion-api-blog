import { getDatabaseItems } from 'cms/notion';
import { GetStaticProps } from 'next';

import { CardData } from 'types/CardData';
import { getAllTags } from 'utils/getAllTags';
import { parseDatabaseItems } from 'utils/parseDatabaseItems';

import CardList from 'components/card/CardList';
import HeadMeta from 'components/HeadMeta';
import HeroContent from 'components/HeroContent';
import TagList from 'components/tags/TagList';
import { insertPreviewImage } from 'utils/previewImage';

interface TagIndexPageProps {
  data: Record<string, CardData[]>;
  allTags: CardData['tags'];
}

const TagIndexPage = ({ data, allTags }: TagIndexPageProps) => {
  return (
    <>
      <HeadMeta title="Tags" />
      <HeroContent />
      {allTags.map(({ id, name }) => (
        <section
          key={id}
          className="flex flex-col-reverse md:flex-row m-4 min-h-[60vh] max-w-6xl mx-auto px-4 gap-8"
        >
          <aside className="basis-[20%]">
            <div className="p-4 border shadow-md rounded-xl">
              <h2 className="mb-5 text-2xl font-bold">All Tags</h2>
              <TagList tags={getAllTags(data[name])} />
            </div>
          </aside>
          <div className="flex-grow">
            <h3 className="mb-4 text-4xl font-bold">{`#${name}`}</h3>

            <CardList data={data[name]} />
          </div>
        </section>
      ))}
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
