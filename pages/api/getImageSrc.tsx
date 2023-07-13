import type { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';
import sharp from 'sharp';

import { getPageItem } from '@/cms/notion';
import { parseDatabaseItems } from '@/utils';

const getImageUrl = (type: string, cover: string, icon: any): string => {
  if (type === 'cover') {
    return cover;
  } else if (type === 'icon' && icon?.type !== 'emoji') {
    return icon?.type === 'file' ? icon.file.url : icon?.external.url ?? '';
  } else {
    throw new Error(`Invalid type: ${type}`);
  }
};

const convertImageSize = async (imageBuffer: Buffer): Promise<Buffer> => {
  const imageSizeInBytes = imageBuffer.length;
  const imageSizeInMegabytes = imageSizeInBytes / (1024 * 1024);

  if (imageSizeInMegabytes > 4) {
    return await sharp(imageBuffer).resize(1920).webp().toBuffer();
  }

  return imageBuffer;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, type } = req.query;

    if (!type) throw new Error('Type is required');
    if (!id) throw new Error('Page Id is required');

    const pageItem = await getPageItem(id.toString());
    const { cover, icon } = parseDatabaseItems([pageItem])[0];

    const url = getImageUrl(type as string, cover, icon);

    const response = await got(url, {
      responseType: 'buffer',
    });

    const contentType = response.headers['content-type'];
    if (!contentType) throw new Error('Content type is not found');

    const image = await convertImageSize(response.body);

    res.setHeader('Content-Type', contentType);
    res.send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export default handler;
