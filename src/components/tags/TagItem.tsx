import { BaseStyle } from '@/commons';
import { useEffect } from 'react';

interface TagItemProps {
  name: string;
  isReadOnly?: boolean;
  isChecked?: (value: string) => boolean;
  highlightedTags?: (value: string) => boolean;
  handleToggleValue?: ({ checked, value }: { checked: boolean; value: string }) => void;
  color?: keyof typeof BaseStyle.colors;
}

const TagItem = ({
  name,
  isReadOnly = false,
  color,
  isChecked,
  highlightedTags,
  handleToggleValue,
}: TagItemProps) => {
  if (isReadOnly) {
    const backgroundColor = color ? BaseStyle.colors[color] : '';
    return (
      <button
        className="px-2 py-1 text-sm font-light transition-all duration-300 border rounded-xl hover:-translate-y-1 hover:shadow-md"
        style={{ backgroundColor }}
      >
        {name}
      </button>
    );
  }

  const style = {
    base: 'block px-5 py-3 rounded-3xl bg-gray-100 border border-white cursor-pointer',
    highlighted: 'bg-black text-white',
    unhighlighted: 'bg-gray-100/30 text-black/30',
    borderRed: 'border-red-500',
  };

  return (
    <label
      className={`${style.base} hover:${style.borderRed} ${
        highlightedTags?.(name) ? (isChecked?.(name) ? style.highlighted : '') : style.unhighlighted
      }`}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked?.(name)}
        onChange={({ target: { checked } }) => handleToggleValue?.({ checked, value: name })}
      />
      {name}
    </label>
  );
};

export default TagItem;
