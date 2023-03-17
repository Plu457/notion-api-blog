import { DatabaseOption, getDatabaseItems } from '@/cms/notion';
import fs from 'fs';
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

const readCachedData = (cachePath: string): Awaited<ReturnType<typeof getDatabaseItems>> | null => {
  try {
    const fileData = fs.readFileSync(cachePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};

const writeCachedData = (
  cachePath: string,
  data: Awaited<ReturnType<typeof getDatabaseItems>>,
): boolean => {
  try {
    if (!fs.existsSync(cachePath)) {
      fs.writeFileSync(cachePath, JSON.stringify(data));
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
  let cachedData = readCachedData(cachePath);

  if (!cachedData || !cachedData.length) {
    cachedData = await getDatabaseItems({ databaseId, options });
    writeCachedData(cachePath, cachedData);
  }

  return cachedData;
};

export default getCachedDatabaseItems;
