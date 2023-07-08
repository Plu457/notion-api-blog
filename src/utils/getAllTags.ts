import { IArticle } from '@/types/article';

const getAllTags = (data: IArticle[]) =>
  data.reduce<IArticle['tags']>((acc, { tags }) => {
    tags.forEach(tag => {
      if (!acc.find(item => item.id === tag.id)) {
        acc.push(tag);
      }
    });

    return acc;
  }, []);

export default getAllTags;
