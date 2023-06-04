import { getDatabaseItems } from '@/cms/notion';
import { IArticle } from '@/types/article';

const parseDatabaseItems = (databaseItems: Awaited<ReturnType<typeof getDatabaseItems>>) =>
  databaseItems.reduce<IArticle[]>((acc, item) => {
    if (!('properties' in item)) return acc;
    if (item.parent.type !== 'database_id') return acc;

    const { Description, Published, Tags, Name, Public } = item.properties;

    const isPublic = Public.type === 'checkbox' ? Public.checkbox : false;
    if (!isPublic) return acc;

    const cover =
      item.cover?.type === 'external' ? item.cover.external.url : item.cover?.file?.url || '';

    const published = Published?.type === 'date' ? Published.date?.start || '' : '';

    const description =
      Description?.type === 'rich_text' ? Description.rich_text[0]?.plain_text || '' : '';

    const tags = Tags?.type === 'multi_select' ? Tags.multi_select : [];

    const title = Name?.type === 'title' ? Name.title[0]?.plain_text || '' : '';

    const expiryTime =
      item.cover?.type === 'file'
        ? item.cover.file.expiry_time
        : item.icon?.type === 'file'
        ? item.icon.file.expiry_time
        : '';

    acc.push({
      id: item.id,
      cover,
      icon: item.icon,
      published,
      description,
      tags,
      title,
      expiryTime,
    });

    return acc;
  }, []);

export default parseDatabaseItems;
