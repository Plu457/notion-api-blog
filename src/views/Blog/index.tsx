import CardItem from '@/components/Card/CardItem';
import CardList from '@/components/Card/CardList';
import Pagination from '@/components/Pagination';
import TagItem from '@/components/Tags/TagItem';
import TagList from '@/components/Tags/TagList';

import { BlogViewProps } from '@/types/BlogTypes';

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
          tagList={allTags}
          renderTagItem={({ name }) => (
            <TagItem
              name={name}
              isChecked={isChecked}
              isHighlighted={isHighlighted}
              handleToggleValue={handleToggleValue}
            />
          )}
        />
      </header>

      <main className="">
        <CardList data={postData} renderCardItem={item => <CardItem key={item.id} data={item} />} />
        <div className="flex justify-center my-4">
          <Pagination current={currentPage} total={postTotal} onPageChange={handlePageChange} />
        </div>
      </main>
    </section>
  );
};

export default BlogView;
