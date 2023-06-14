import { GetStaticProps } from 'next';

import { getDatabaseItems } from '@/cms/notion';
import { Article } from '@/components';
import { IArticle } from '@/types/article';
import { parseDatabaseItems, previewImage } from '@/utils';

interface Props {
  data: IArticle;
}

const NotFoundPage = ({ data }: Props) => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center max-w-4xl min-h-screen gap-4 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="mb-16 text-4xl font-black">404 Not Found!</h1>
          <h2 className="text-4xl font-extrabold">해당 페이지가 존재하지 않습니다!</h2>
          <p className="text-2xl">대신 이런 글은 어떠세요?</p>
        </div>
        <Article data={data} />
      </div>
    </section>
  );
};

export default NotFoundPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const databaseId = process.env.NEXT_PUBLIC_PROGRAMMING_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getDatabaseItems({ databaseId });

  const parsedData = parseDatabaseItems(databaseItems);

  const dataWithPreview = await previewImage.insertPreviewImage(parsedData);

  return {
    props: {
      data: dataWithPreview[0],
    },
    revalidate: 60,
  };
};
