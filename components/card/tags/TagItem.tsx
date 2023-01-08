import React from 'react';

import { BaseStyle } from 'commons';

interface TagItemProps {
  name: string;
  color: keyof typeof BaseStyle.colors;
}

const TagItem = ({ name, color }: TagItemProps) => {
  return (
    <button
      className="px-2 py-1 text-sm font-light transition-all duration-300 border rounded-xl hover:-translate-y-1 hover:shadow-md"
      style={{
        backgroundColor: BaseStyle.colors[color],
      }}
    >
      {name}
    </button>
  );
};

export default TagItem;
