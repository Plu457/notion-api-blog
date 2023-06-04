import { IArticle } from '@/types/article';
import { ImageSrcType } from 'pages/api/getImageSrc';
import { useCallback, useEffect, useState } from 'react';

export interface Props {
  id: string;
  expiryTime: string;
  cover: string;
  icon: IArticle['icon'];
}

const useImageLoading = ({ id, expiryTime, cover, icon }: Props) => {
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

  return { coverSrc, iconSrc, getImageSrc };
};

export default useImageLoading;
