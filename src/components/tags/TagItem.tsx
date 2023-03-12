import { BaseStyle } from '@/commons';

interface TagItemProps {
  name: string;
  view?: boolean;
  isChecked?: (value: string) => boolean;
  toggleValue?: ({ checked, value }: { checked: boolean; value: string }) => void;
  color?: keyof typeof BaseStyle.colors;
}

const TagItem = ({ name, view = false, color, isChecked, toggleValue }: TagItemProps) => {
  if (view) {
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

  return (
    <label
      className={`block px-5 py-3 bg-gray-50 border rounded-3xl cursor-pointer hover:border-red-500 ${
        isChecked?.(name) ? 'border-red-300' : 'border-white'
      }`}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked?.(name)}
        onChange={({ target: { checked } }) => toggleValue?.({ checked, value: name })}
      />
      {name}
    </label>
  );
};

export default TagItem;
