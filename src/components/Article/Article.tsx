import Image from 'next/image';
import Link from 'next/link';

import { Constant } from '@/commons';
import { useImageLoading } from '@/hooks';
import { IArticle } from '@/types/article';
import Format from '@/utils/Format';
import IconRenderer from './IconRenderer';

interface Props {
  data: IArticle;
}

const Article = ({ data }: Props) => {
  const { id, cover, icon, title, description, published, expiryTime, preview } = data;

  const { coverSrc, iconSrc, getImageSrc } = useImageLoading({ id, expiryTime, cover, icon });

  const formattedImage =
    coverSrc + Format.getParametersForUnsplash({ width: 726, height: 464, format: 'webp' });

  return (
    <article className="transform transition-all duration-300 hover:-translate-y-2">
      <Link href={`/blog/${id}`}>
        <a>
          <div className="relative pt-[64%] overflow-hidden rounded-lg mb-4">
            <Image
              src={formattedImage}
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

export default Article;
