import { useEffect } from 'react';
import { BaseStyle } from '@/commons';
import { useRouter } from 'next/router';

interface TagItemProps {
  name: string;
  color: keyof typeof BaseStyle.colors;
}

const TagItem = ({ name, color }: TagItemProps) => {
  const { push, prefetch } = useRouter();

  const pathToTagName = `/tags/${name.toLowerCase()}`;

  const onClick = () => {
    push(pathToTagName);
  };

  useEffect(() => {
    prefetch(pathToTagName);
  }, [pathToTagName, prefetch]);

  return (
    <button
      className="px-2 py-1 text-sm font-light transition-all duration-300 border rounded-xl hover:-translate-y-1 hover:shadow-md"
      style={{
        backgroundColor: BaseStyle.colors[color],
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default TagItem;
