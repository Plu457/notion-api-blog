import { CardData } from './../types/types';
import { getDatabaseItems } from 'cms/notion';

export const parseDatabaseItems = (
  databaseItems: Awaited<ReturnType<typeof getDatabaseItems>>,
) =>
  databaseItems.reduce<CardData[]>((acc, item) => {
    if (!('properties' in item)) return acc;

    const { Description, Published, Tags, Name } = item.properties;

    const title = Name?.type === 'title' ? Name.title[0].plain_text : '';
    const description =
      Description?.type === 'rich_text'
        ? Description.rich_text[0]?.plain_text ?? ''
        : '';

    const cover =
      item.cover?.type === 'external'
        ? item.cover.external.url
        : item.cover?.file
        ? item.cover.file.url
        : '';

    const published =
      Published?.type === 'date' ? Published.date?.start ?? '' : '';

    const tags = Tags?.type === 'multi_select' ? Tags.multi_select : [];

    acc.push({
      id: item.id,
      title,
      description,
      cover,
      published,
      tags,
      icon: item.icon,
    });

    return acc;
  }, []);
