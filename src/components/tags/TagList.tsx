import { CardData } from '@/types/CardData';
import TagItem from './TagItem';

interface TagListProps {
  tagTotal: number;
  tags: CardData['tags'];
  isChecked: (value: string) => boolean;
  handleToggleValue: ({ checked, value }: { checked: boolean; value: string }) => void;
}

const TagList = ({ tags, tagTotal, isChecked, handleToggleValue }: TagListProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-4 max-w-[80%] mb-6">
      {tags.map(({ id, name }) => (
        <TagItem
          key={id}
          name={name}
          tagTotal={tagTotal}
          isChecked={isChecked}
          handleToggleValue={handleToggleValue}
        />
      ))}
    </div>
  );
};

export default TagList;
