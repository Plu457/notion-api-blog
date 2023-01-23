import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Constant } from 'commons';
import { CardData } from 'types/CardData';
import { getAllTags } from 'utils/getAllTags';
import { parseDatabaseItems } from 'utils/parseDatabaseItems';
import { insertPreviewImage } from 'utils/previewImage';
import { getCachedDatabaseItems } from 'utils/getCachedDatabaseItems';

import HeadMeta from 'components/HeadMeta';
import HeroContent from 'components/HeroContent';
import HomeView from 'views/HomeView';

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
      <HeadMeta />
      <HeroContent />
      <HomeView
        data={data}
        allTags={allTags}
        postData={postData}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getCachedDatabaseItems(databaseId);

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
