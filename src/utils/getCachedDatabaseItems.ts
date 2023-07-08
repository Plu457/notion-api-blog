import { DatabaseOption, getDatabaseItems } from '@/cms/notion';
import { promises as fs } from 'fs';
import path from 'path';
const OPTION_QUERY = 'option';
const revalidateTime = 5 * 60 * 1000;

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
): Promise<{ items: Awaited<ReturnType<typeof getDatabaseItems>>; timestamp: number } | null> => {
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
    const currentTime = Date.now();
    const dataWithTimestamp = { items: data, timestamp: currentTime };

    try {
      await fs.access(cachePath);
    } catch {
      await fs.writeFile(cachePath, JSON.stringify(dataWithTimestamp));
      return true;
    }
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }

  return false;
};

const getCachedDatabaseItems = async ({ databaseId, options }: DatabaseOption) => {
  if (process.env.NODE_ENV === 'development') {
    return await getDatabaseItems({ databaseId, options });
  }

  const cachePath = getCachePath(options);
  let cachedData = await readCachedData(cachePath);
  const currentTime = Date.now();

  if (!cachedData || currentTime - cachedData.timestamp > revalidateTime) {
    const databaseItems = await getDatabaseItems({ databaseId, options });
    cachedData = { items: databaseItems, timestamp: currentTime };

    if (await writeCachedData(cachePath, cachedData.items)) {
      console.log('캐싱이 성공했습니다.');
    }
  }

  return cachedData.items;
};

export default getCachedDatabaseItems;
