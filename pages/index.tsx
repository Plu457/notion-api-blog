import type { GetStaticProps } from 'next';
import { getDatabaseItems } from 'cms/notion';

import { CardData } from 'types';
import { parseDatabaseItems } from 'utils/parseDatabaseItems';

import HeroSection from 'components/intro/HeroSection';
import CardList from 'components/card/CardList';

interface HomeProps {
  data: CardData[];
}

const Home = ({ data }: HomeProps) => {
  return (
    <>
      <HeroSection />
      <section className="m-4 min-h-[60vh] max-w-4xl mx-auto">
        <CardList data={data} />
      </section>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);

  return {
    props: {
      data: parsedData,
    },
  };
};
