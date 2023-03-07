import { CardData } from '@/types/CardData';
import CardList from '@/components/card/CardList';
import Pagination from '@/components/Pagination';
import TagList from '@/components/tags/TagList';

interface HomeViewProps {
  data: CardData[];
  allTags: CardData['tags'];
  postData: CardData[];
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const HomeView = ({ data, allTags, postData, currentPage, handlePageChange }: HomeViewProps) => {
  return (
    <section className="flex flex-col m-4 min-h-[60vh] max-w-6xl mx-auto px-4 gap-8 ">
      <header className="mt-16 py-4">
        <h2 className="mb-8 text-6xl font-bold">Devlog</h2>
        <TagList tags={allTags} />
      </header>

      <main className="">
        <CardList data={postData} />
        <div className="flex justify-center my-4">
          <Pagination current={currentPage} total={data.length} onPageChange={handlePageChange} />
        </div>
      </main>
    </section>
  );
};

export default HomeView;
