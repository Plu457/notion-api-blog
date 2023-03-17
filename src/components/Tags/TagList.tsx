import { TagListProps } from './TagTypes';

const TagList = ({ tagList, renderTagItem }: TagListProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-4 max-w-[80%] mb-6">
      {tagList.map(({ name }) => renderTagItem({ name }))}
    </div>
  );
};

export default TagList;
