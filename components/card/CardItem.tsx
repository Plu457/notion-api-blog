import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { CardData } from 'types';
import { ImageSrcType } from 'pages/api/getImageSrc';
import IconRenderer from './IconRenderer';
import TagList from './tags/TagList';

interface CardItemProps {
  data: CardData;
}

const CardItem = ({ data }: CardItemProps) => {
  const { id, cover, icon, title, description, published, tags, expiryTime } = data;

  const [coverSrc, setCoverSrc] = useState(cover);
  const [iconSrc, setIconSrc] = useState(icon);

  const getImageSrc = useCallback(async () => {
    const res = await fetch(`api/getImageSrc?id=${id}`);
    const { cover, icon }: ImageSrcType = await res.json();

    setCoverSrc(cover);
    setIconSrc(icon);
  }, [id]);

  useEffect(() => {
    const isExpired = new Date(expiryTime) < new Date();

    if (isExpired) getImageSrc();
  }, [expiryTime, getImageSrc]);

  return (
    <li>
      <article className="group">
        <Link href={`/blog/${id}`}>
          <a>
            <div className="relative pt-[64%] overflow-hidden rounded-lg mb-4">
              <Image
                src={coverSrc}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="transition-all duration-300 group-hover:scale-110"
                onError={getImageSrc}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold group-hover:text-blue-500">
                <IconRenderer icon={iconSrc} />
                {title}
              </h2>
              {description ? <p className="text-gray-700">{description}</p> : null}
              <time className="font-light text-gray-500">{published}</time>
            </div>
          </a>
        </Link>
        <div className="mt-4">
          <TagList tags={tags} />
        </div>
      </article>
    </li>
  );
};

export default CardItem;
