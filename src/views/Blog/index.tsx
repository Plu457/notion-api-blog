import { CardData } from '@/types/CardData';
import CardList from '@/components/card/CardList';
import Pagination from '@/components/Pagination';
import TagList from '@/components/tags/TagList';

interface BlogViewProps {
  tagTotal: number;
  postTotal: number;
  allTags: CardData['tags'];
  postData: CardData[];
  currentPage: number;
  handlePageChange: (page: number) => void;
  isChecked: (value: string) => boolean;
  isHighlighted: (value: string) => boolean;
  handleToggleValue: ({ checked, value }: { checked: boolean; value: string }) => void;
}

const BlogView = ({
  postTotal,
  allTags,
  postData,
  currentPage,
  handlePageChange,
  isChecked,
  isHighlighted,
  handleToggleValue,
}: BlogViewProps) => {
  return (
    <section className="flex flex-col m-4 min-h-[60vh] max-w-6xl mx-auto px-4 gap-8 ">
      <header className="mt-16 py-4">
        <h2 className="mb-8 text-6xl font-bold">Devlog</h2>
        <TagList
          tags={allTags}
          isChecked={isChecked}
          isHighlighted={isHighlighted}
          handleToggleValue={handleToggleValue}
        />
      </header>

      <main className="">
        <CardList data={postData} />
        <div className="flex justify-center my-4">
          <Pagination current={currentPage} total={postTotal} onPageChange={handlePageChange} />
        </div>
      </main>
    </section>
  );
};

export default BlogView;
