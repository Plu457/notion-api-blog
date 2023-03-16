import type { NextApiRequest, NextApiResponse } from 'next';

import { getSearchItem } from '@/cms/notion';
import { CardData } from '@/types/CardData';
import { parseDatabaseItems } from '@/utils';

export interface SearchResultType {
  data: CardData[];
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
