import { useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { getDatabaseItems } from 'cms/notion';

import { CardData } from 'types';
import { parseDatabaseItems } from 'utils/parseDatabaseItems';
import { getAllTags } from 'utils/getAllTags';
import { insertPreviewImage } from 'utils/previewImage';
import { Constant } from 'commons';

import HeroSection from 'components/intro/HeroSection';
import TagList from 'components/card/tags/TagList';
import CardList from 'components/card/CardList';
import Pagination from 'components/Pagination';
import PageHead from 'components/PageHead';

interface HomeProps {
  data: CardData[];
  allTags: CardData['tags'];
}

const Home = ({ data, allTags }: HomeProps) => {
  const { query, push } = useRouter();
  const currentPage = query.page ? parseInt(query.page.toString()) : 1;

  const [postData, setPostData] = useState(
    data.slice(Constant.POSTS_PER_PAGE * (currentPage - 1), Constant.POSTS_PER_PAGE * currentPage),
  );

  const handlePageChange = (page: number) => {
    setPostData(data.slice(Constant.POSTS_PER_PAGE * (page - 1), Constant.POSTS_PER_PAGE * page));
    push({
      pathname: '/',
      query: { page },
    });
  };

  return (
    <>
      <PageHead />
      <HeroSection />

      <section className="flex flex-col-reverse md:flex-row m-4 min-h-[60vh] max-w-6xl mx-auto px-4 gap-8">
        <aside className="basis-[20%]">
          <div className="p-4 border shadow-md rounded-xl">
            <h2 className="mb-5 text-2xl font-bold">All Tags</h2>
            <TagList tags={allTags} />
          </div>
        </aside>

        <div className="flex-grow">
          <h3 className="mb-4 text-4xl font-bold">Devlog</h3>
          <CardList data={postData} />
          <div className="flex justify-center my-4">
            <Pagination current={currentPage} total={data.length} onPageChange={handlePageChange} />
          </div>
        </div>
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

  const dataWithPreview = await insertPreviewImage(parsedData);

  const allTags = getAllTags(parsedData);

  return {
    props: {
      data: dataWithPreview,
      allTags,
    },
    revalidate: 60,
  };
};
