import { getDatabaseItems } from '@/cms/notion';
import { IArticle } from '@/types/article';

const getPropertyData = (property: any, type: string, defaultValue: any) => {
  if (!property) return defaultValue;
  return property.type === type ? property[type] : defaultValue;
};

const parseDatabaseItems = (databaseItems: Awaited<ReturnType<typeof getDatabaseItems>>) =>
  databaseItems.reduce<IArticle[]>((acc, item) => {
    if (!('properties' in item) || item.parent.type !== 'database_id') return acc;

    const { id, icon, cover, last_edited_time } = item;
    const { Description, Published, Tags, Name, Public } = item.properties;

    if (!getPropertyData(Public, 'checkbox', false)) return acc;

    const parsedCover = cover?.type === 'file' ? cover.file.url : cover?.external?.url ?? '';

    const published = getPropertyData(Published, 'date', '')?.start || '';

    const description = getPropertyData(Description, 'rich_text', '')[0]?.plain_text || '';

    const tags = getPropertyData(Tags, 'multi_select', []);

    const title = getPropertyData(Name, 'title', '')[0]?.plain_text || '';

    const proxyCoverUrl = `/api/getImageSrc?type=cover&id=${id}&lastEditedTime=${last_edited_time}`;
    const proxyIconUrl = `/api/getImageSrc?type=icon&id=${id}&lastEditedTime=${last_edited_time}`;

    acc.push({
      id,
      cover: parsedCover,
      icon,
      published,
      description,
      tags,
      title,
      proxy: {
        cover: proxyCoverUrl,
        icon: proxyIconUrl,
      },
    });

    return acc;
  }, []);

export default parseDatabaseItems;
