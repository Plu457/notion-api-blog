import { CardData } from '@/types/CardData';
import { useState } from 'react';

import TagItem from './TagItem';

interface TagListProps {
  tags: CardData['tags'];
}

const TagList = ({ tags }: TagListProps) => {
  const [selectedTagList, setSelectedTagList] = useState([]);

  const isChecked = value => selectedTagList.includes(value);

  const toggleValue = ({ checked, value }) => {
    if (checked) {
      setSelectedTagList(selectedTagList.concat(value));
    } else {
      setSelectedTagList(selectedTagList.filter(v => v !== value));
    }
  };

  // console.log('selectedTagList: >> ', selectedTagList);

  return (
    <div className="flex flex-row flex-wrap gap-4 max-w-[70%] mb-6">
      {tags.map(({ id, name }) => (
        <TagItem
          key={id}
          name={name}
          // isDisabled={isDisabled}
          isChecked={isChecked}
          toggleValue={toggleValue}
        />
      ))}
    </div>
  );
};

export default TagList;

// return (
//   <ul className="flex flex-row flex-wrap gap-4 max-w-[70%]">
//     {tags.map(({ id, name, color }) => (
//       <li key={id}>
//         <TagItem name={name} color={color} />
//       </li>
//     ))}
//   </ul>
// );
