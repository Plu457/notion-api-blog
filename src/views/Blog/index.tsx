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
  handleToggleValue: ({ checked, value }: { checked: boolean; value: string }) => void;
}

const BlogView = ({
  tagTotal,
  postTotal,
  allTags,
  postData,
  currentPage,
  handlePageChange,
  isChecked,
  handleToggleValue,
}: BlogViewProps) => {
  return (
    <section className="flex flex-col m-4 min-h-[60vh] max-w-6xl mx-auto px-4 gap-8 ">
      <header className="mt-16 py-4">
        <h2 className="mb-8 text-6xl font-bold">Devlog</h2>
        <TagList
          tags={allTags}
          tagTotal={tagTotal}
          isChecked={isChecked}
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
