import { DatabaseOption, getDatabaseItems } from '@/cms/notion';
import { promises as fs } from 'fs';
import path from 'path';

const OPTION_QUERY = 'option';

const createCacheKey = (options?: string[]): string => {
  const cacheKey = new URLSearchParams({});

  if (options) cacheKey.append(OPTION_QUERY, JSON.stringify(options));

  return cacheKey.toString();
};

const getCachePath = (options?: string[]): string => {
  const cacheKey = createCacheKey(options);
  const cacheFileName = `.collection${cacheKey ? `_${cacheKey}` : ''}.json`;

  return path.join(__dirname, cacheFileName);
};

const readCachedData = async (
  cachePath: string,
): Promise<Awaited<ReturnType<typeof getDatabaseItems>> | null> => {
  try {
    const fileData = await fs.readFile(cachePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

const writeCachedData = async (
  cachePath: string,
  data: Awaited<ReturnType<typeof getDatabaseItems>>,
): Promise<boolean> => {
  try {
    await fs.access(cachePath);
  } catch {
    await fs.writeFile(cachePath, JSON.stringify(data));
    return true;
  }
  return false;
};

const getCachedDatabaseItems = async ({ databaseId, options }: DatabaseOption) => {
  if (process.env.NODE_ENV === 'development') {
    return await getDatabaseItems({ databaseId, options });
  }

  const cachePath = getCachePath(options);
  let cachedData = await readCachedData(cachePath);

  if (!cachedData || !cachedData.length) {
    cachedData = await getDatabaseItems({ databaseId, options });
    await writeCachedData(cachePath, cachedData);
  }

  return cachedData;
};

export default getCachedDatabaseItems;
