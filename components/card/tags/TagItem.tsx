import React from 'react';

import { BaseStyle } from 'commons';

interface TagItemProps {
  name: string;
  color: keyof typeof BaseStyle.colors;
}

const TagItem = ({ name, color }: TagItemProps) => {
  return (
    <li>
      <button
        className="px-2 py-1 transition-all duration-300 rounded-xl hover:-translate-y-1 hover:shadow-md"
        style={{
          backgroundColor: BaseStyle.colors[color],
        }}
      >
        {name}
      </button>
    </li>
  );
};

export default TagItem;
