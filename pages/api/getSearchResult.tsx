import type { NextApiRequest, NextApiResponse } from 'next';

import { getSearchItem } from '@/cms/notion';
import { parseDatabaseItems } from '@/utils';
import { IArticle } from '@/types/article';

export interface SearchResultType {
  data: IArticle[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse<SearchResultType>) => {
  const { q } = req.query;

  if (!q) throw new Error('Query is required');

  const query = q.toString();

  const searchItems = await getSearchItem(query);

  const parsedItems = parseDatabaseItems(searchItems);

  res.status(200).json({ data: parsedItems });
};

export default handler;
