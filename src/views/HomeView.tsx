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
    <section className="flex flex-col-reverse md:flex-row m-4 min-h-[60vh] max-w-6xl mx-auto px-4 gap-8 ">
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
  );
};

export default HomeView;
