import type { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';

import { getPageItem } from '@/cms/notion';
import { parseDatabaseItems } from '@/utils';

const getImageUrl = (type: string, cover: string, icon: any): string => {
  switch (type) {
    case 'cover':
      return cover;

    case 'icon':
      return icon?.type === 'emoji'
        ? ''
        : (icon?.type === 'file' ? icon.file.url : icon?.external.url) ?? '';

    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

  res.setHeader('Content-Type', contentType);
  res.send(response.body);
};

export default handler;
