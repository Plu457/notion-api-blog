import { CardData } from '@/types/CardData';

const getAllTags = (data: CardData[]) =>
  data.reduce<CardData['tags']>((acc, { tags }) => {
    tags.forEach(tag => {
      if (!acc.find(item => item.id === tag.id)) {
        acc.push(tag);
      }
    });

    return acc;
  }, []);

export default getAllTags;
