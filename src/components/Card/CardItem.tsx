import Image from 'next/image';
import Link from 'next/link';

import { Constant } from '@/commons';
import { useImageLoading } from '@/hooks';
import { CardItemProps } from './CardTypes';
import IconRenderer from './IconRenderer';
import { Format } from '@/utils';

const CardItem = ({ data }: CardItemProps) => {
  const { id, cover, icon, title, description, published, expiryTime, preview } = data;

  const { coverSrc, iconSrc, getImageSrc } = useImageLoading({ id, expiryTime, cover, icon });

  return (
    <article className="transform transition-all duration-300 hover:-translate-y-2">
      <Link href={`/blog/${id}`}>
        <a>
          <div className="relative pt-[64%] overflow-hidden rounded-lg mb-4">
            <Image
              src={coverSrc}
              alt={title}
              layout="fill"
              objectFit="cover"
              onError={getImageSrc}
              placeholder="blur"
              blurDataURL={preview?.dataURIBase64 ?? Constant.IMAGE_LOADING_INDICATOR}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold 0">
              <IconRenderer icon={iconSrc} />
              {title}
            </h2>
            {description ? (
              <p className="text-gray-700">{Format.truncateText(description, 100)}</p>
            ) : null}
            <time className="font-light text-gray-500">{published}</time>
          </div>
        </a>
      </Link>
    </article>
  );
};

export default CardItem;
