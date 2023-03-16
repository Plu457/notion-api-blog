import TagItem from './TagItem';
import { TagListProps } from './TagTypes';

const TagList = ({ tags, isChecked, isHighlighted, handleToggleValue }: TagListProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-4 max-w-[80%] mb-6">
      {tags.map(({ id, name }) => (
        <TagItem
          key={id}
          name={name}
          isChecked={isChecked}
          isHighlighted={isHighlighted}
          handleToggleValue={handleToggleValue}
        />
      ))}
    </div>
  );
};

export default TagList;
