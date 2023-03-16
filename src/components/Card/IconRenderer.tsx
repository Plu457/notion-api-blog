import Image from 'next/image';
import { IconRendererProps } from './CardTypes';

const IconRenderer = ({ icon }: IconRendererProps) => {
  if (!icon) return null;

  if (icon.type === 'emoji')
    return <span className="mr-2 overflow-hidden align-middle rounded-full">{icon.emoji}</span>;

  const restIconURL = icon.type === 'external' ? icon.external.url : icon.file.url;

  return (
    <span className="mr-2 align-middle">
      <Image
        src={restIconURL}
        alt="icon"
        width={24}
        height={24}
        className="overflow-hidden rounded-full"
      />
    </span>
  );
};

export default IconRenderer;
