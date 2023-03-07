import { useEffect } from 'react';
import { BaseStyle } from '@/commons';
import { useRouter } from 'next/router';

interface TagItemProps {
  name: string;
}

const TagItem = ({ name, isChecked, toggleValue, disabled, checked }: TagItemProps) => {
  return (
    <label
      className={`block px-5 py-3 bg-gray-100 border border-white rounded-3xl cursor-pointer hover:border-red-300 ${
        isChecked(name) ? 'border-red-300' : ''
      }`}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked(name)}
        onChange={({ target: { checked } }) => toggleValue({ checked, value: name })}
      />
      {name}
    </label>
  );
};

export default TagItem;
