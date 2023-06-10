import { IArticle } from './article';

export interface IBlogPage {
  data: IArticle[];
  tagList: IArticle['tags'];
}
