import { IArticle } from '@/types/article';
import got from 'got';
import lqip from 'lqip-modern';
import { ExtendedRecordMap } from 'notion-types';
import { getPageImageUrls } from 'notion-utils';
import { defaultMapImageUrl } from 'react-notion-x';

const makePreviewImage = async (url: string) => {
  const body = await got(url, { responseType: 'buffer', resolveBodyOnly: true });

  try {
    const {
      metadata: { dataURIBase64, originalWidth, originalHeight },
    } = await lqip(body);

    return {
      dataURIBase64,
      originalWidth,
      originalHeight,
    };
  } catch (error) {
    console.error('error: >>', error);
    return null;
  }
};

export type PreviewImageType = Awaited<ReturnType<typeof makePreviewImage>>;

const insertPreviewImage = async (data: IArticle[]): Promise<IArticle[]> =>
  await Promise.all(
    data.map(async item => {
      const preview = await makePreviewImage(item.cover).catch(err => {
        console.error(`Failed to make preview image for ${item.cover}`, err);
        return null;
      });

      return {
        ...item,
        preview,
      };
    }),
  );

const insertPreviewImageToRecordMap = async (
  recordMap: ExtendedRecordMap,
): Promise<Record<string, PreviewImageType>> => {
  const urls = getPageImageUrls(recordMap, {
    mapImageUrl: defaultMapImageUrl,
  });

  const previewImageMap = await Promise.all(
    urls.map(async url => {
      const previewImage = await makePreviewImage(url).catch(err => {
        console.error(`Failed to make preview image for ${url}`, err);
        return null;
      });

      return [url, previewImage];
    }),
  );

  return Object.fromEntries(previewImageMap);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  makePreviewImage,
  insertPreviewImage,
  insertPreviewImageToRecordMap,
};
