import { useRecoilValue } from 'recoil';
import { activeTagListSelector, selectedTagListState } from '@/recoil/post';

import { BaseStyle } from '@/commons';
import { useBlogNavigation } from '@/hooks';
import {
  GetTagItemClassNamesParams,
  ReadOnlyTagProps,
  SelectableTagProps,
  TagItemProps,
} from './TagTypes';
import { ChangeEvent, useCallback, useMemo } from 'react';

const ReadOnlyTag = ({ name, color }: ReadOnlyTagProps) => {
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

const getTagItemClassNames = ({
  style,
  isChecked,
  isHighlighted,
  name,
}: GetTagItemClassNamesParams) => {
  const classNames = [style.base];

  if (isHighlighted?.(name)) {
    classNames.push(isChecked?.(name) ? style.selected : style.highlighted);
  } else {
    classNames.push(style.unhighlighted);
  }

  return classNames.join(' ');
};

const SelectableTag = ({
  name,
  isChecked,
  isHighlighted,
  addTagToList,
  removeTagFromList,
  style,
}: SelectableTagProps) => {
  const classNames = getTagItemClassNames({ style, isChecked, isHighlighted, name });

  const handleOnChange = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      addTagToList({ value: name });
    } else {
      removeTagFromList({ value: name });
    }
  };

  return (
    <label className={classNames}>
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked?.(name)}
        disabled={!isHighlighted?.(name)}
        onChange={handleOnChange}
      />
      {name}
    </label>
  );
};

const TagItem = ({ name, isReadOnly = false, color }: TagItemProps) => {
  const activeTagList = useRecoilValue(activeTagListSelector);
  const selectedTagList = useRecoilValue(selectedTagListState);
  const { addTagToList, removeTagFromList } = useBlogNavigation();

  const isHighlighted = useCallback(
    (value: string) => activeTagList.includes(value),
    [activeTagList],
  );
  const isChecked = useCallback(
    (value: string) => selectedTagList.includes(value),
    [selectedTagList],
  );

  const style = useMemo(
    () => ({
      base: 'block px-5 py-3 rounded-3xl border border-white cursor-pointer',
      highlighted: 'bg-gray-100 hover:border-red-500',
      unhighlighted: 'bg-gray-100/30 text-black/30',
      selected: 'bg-black text-white hover:border-red-500',
    }),
    [],
  );

  if (isReadOnly) {
    return <ReadOnlyTag name={name} color={color} />;
  }

  return (
    <SelectableTag
      name={name}
      isChecked={isChecked}
      isHighlighted={isHighlighted}
      addTagToList={addTagToList}
      removeTagFromList={removeTagFromList}
      style={style}
    />
  );
};

export default TagItem;
