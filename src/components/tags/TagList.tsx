import { CardData } from '@/types/CardData';
import TagItem from './TagItem';

interface TagListProps {
  tags: CardData['tags'];
  isChecked: (value: string) => boolean;
  toggleValue: ({ checked, value }: { checked: boolean; value: string }) => void;
}

const TagList = ({ tags, isChecked, toggleValue }: TagListProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-4 max-w-[80%] mb-6">
      {tags.map(({ id, name }) => (
        <TagItem key={id} name={name} isChecked={isChecked} toggleValue={toggleValue} />
      ))}
    </div>
  );
};

export default TagList;
