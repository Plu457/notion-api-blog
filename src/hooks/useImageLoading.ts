import { CardData } from '@/types/CardData';
import { ImageSrcType } from 'pages/api/getImageSrc';
import { useCallback, useEffect, useState } from 'react';

export interface UseImageLoadingProps {
  id: string;
  expiryTime: string;
  cover: string;
  icon: CardData['icon'];
}

const useImageLoading = ({ id, expiryTime, cover, icon }: UseImageLoadingProps) => {
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
