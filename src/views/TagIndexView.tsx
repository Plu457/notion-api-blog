import { CardData } from '@/types/CardData';
import { getAllTags } from '@/utils/getAllTags';

import CardList from '@/components/card/CardList';
import TagList from '@/components/tags/TagList';

interface TagIndexViewProps {
  data: Record<string, CardData[]>;
  allTags: CardData['tags'];
}

const TagIndexView = ({ data, allTags }: TagIndexViewProps) => {
  return (
    <>
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

export default TagIndexView;
