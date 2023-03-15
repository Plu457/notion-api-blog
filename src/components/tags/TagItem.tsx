import { BaseStyle } from '@/commons';

interface TagItemProps {
  name: string;
  isReadOnly?: boolean;
  isChecked?: (value: string) => boolean;
  isHighlighted?: (value: string) => boolean;
  handleToggleValue?: ({ checked, value }: { checked: boolean; value: string }) => void;
  color?: keyof typeof BaseStyle.colors;
}

const ReadOnlyTag = ({ name, color }) => {
  const backgroundColor = color ? BaseStyle.colors[color] : '';
  return (
    <button
      className="px-2 py-1 text-sm font-light transition-all duration-300 border rounded-xl hover:-translate-y-1 hover:shadow-md"
      style={{ backgroundColor }}
    >
      {name}
    </button>
  );
};

const getTagItemClassNames = (style, isChecked, isHighlighted, name) => {
  const classNames = [style.base, `hover:${style.borderRed}`];

  if (isHighlighted?.(name)) {
    classNames.push(isChecked?.(name) ? style.selected : style.highlighted);
  } else {
    classNames.push(style.unhighlighted);
  }

  return classNames.join(' ');
};

const SelectableTag = ({ name, isChecked, isHighlighted, handleToggleValue, style }) => {
  const classNames = getTagItemClassNames(style, isChecked, isHighlighted, name);

  return (
    <label className={classNames}>
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

const TagItem = ({
  name,
  isReadOnly = false,
  color,
  isChecked,
  isHighlighted,
  handleToggleValue,
}: TagItemProps) => {
  const style = {
    base: 'block px-5 py-3 rounded-3xl border border-white cursor-pointer',
    highlighted: 'bg-gray-100',
    unhighlighted: 'bg-gray-100/30 text-black/30',
    selected: 'bg-black text-white',
    borderRed: 'border-red-500',
  };

  if (isReadOnly) {
    return <ReadOnlyTag name={name} color={color} />;
  }

  return (
    <SelectableTag
      name={name}
      isChecked={isChecked}
      isHighlighted={isHighlighted}
      handleToggleValue={handleToggleValue}
      style={style}
    />
  );
};

export default TagItem;
