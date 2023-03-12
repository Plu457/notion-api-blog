import CardList from '@/components/card/CardList';
import TagList from '@/components/tags/TagList';
import { CardData } from '@/types/CardData';

interface TagNameViewProps {
  data: CardData[];
  allTags: CardData['tags'];
  tagName: string;
}

const TagNameView = ({ data, allTags, tagName }: TagNameViewProps) => {
  return (
    <h1>Hello</h1>
    // <section className="flex flex-col-reverse md:flex-row m-4 min-h-[60vh] max-w-6xl mx-auto px-4 gap-8">
    //   <aside className="basis-[20%]">
    //     <div className="p-4 border shadow-md rounded-xl">
    //       <h2 className="mb-5 text-2xl font-bold">All Tags</h2>
    //       <TagList tags={allTags} />
    //     </div>
    //   </aside>
    //   <div className="flex-grow">
    //     <h3 className="mb-4 text-4xl font-bold">{`#${tagName}`}</h3>
    //     <CardList data={data} />
    //   </div>
    // </section>
  );
};

export default TagNameView;
