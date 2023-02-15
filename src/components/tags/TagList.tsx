import { CardData } from '@/types/CardData';

import TagItem from './TagItem';

interface TagListProps {
  tags: CardData['tags'];
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <ul className="flex flex-row flex-wrap gap-2">
      {tags.map(({ id, name, color }) => (
        <li key={id}>
          <TagItem name={name} color={color} />
        </li>
      ))}
    </ul>
  );
};

export default TagList;
