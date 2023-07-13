import { getDatabaseItems } from '@/cms/notion';
import { IArticle } from '@/types/article';

type NotionProperty = {
  type: string;
  [key: string]: any;
};

const getPropertyValue = (property: NotionProperty | undefined, type: string, defaultValue: any) =>
  property?.type === type ? property[type] : defaultValue;

const isValidArticle = (item: any): item is IArticle =>
  'properties' in item &&
  item.parent.type === 'database_id' &&
  getPropertyValue(item.properties.Public, 'checkbox', false);

const convertToArticle = (item: any): IArticle => {
  const { id, icon, cover, last_edited_time } = item;
  const { Description, Published, Tags, Name } = item.properties;

  const parsedCover = cover?.type === 'file' ? cover.file.url : cover?.external?.url ?? '';
  const published = getPropertyValue(Published, 'date', '')?.start || '';
  const description = getPropertyValue(Description, 'rich_text', '')[0]?.plain_text || '';
  const tags = getPropertyValue(Tags, 'multi_select', []);
  const title = getPropertyValue(Name, 'title', '')[0]?.plain_text || '';

  const proxyCoverUrl = `/api/getImageSrc?type=cover&id=${id}&lastEditedTime=${last_edited_time}`;
  const proxyIconUrl = `/api/getImageSrc?type=icon&id=${id}&lastEditedTime=${last_edited_time}`;

  return {
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
  };
};

const parseDatabaseItems = (databaseItems: any[]): IArticle[] =>
  databaseItems.filter(isValidArticle).map(convertToArticle);

export default parseDatabaseItems;
