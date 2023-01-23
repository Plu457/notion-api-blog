import { CardData } from 'types/CardData';

export const getAllTags = (data: CardData[]) => {
  let uniqueTags = new Map();
  data
    .flatMap(({ tags }) => tags)
    .forEach(tag => {
      uniqueTags.set(tag.id, tag);
    });

  return Array.from(uniqueTags.values());
};
