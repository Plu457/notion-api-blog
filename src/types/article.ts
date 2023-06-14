import {
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { PreviewImageType } from '@/utils/previewImage';

export interface IArticle {
  id: string;
  cover: string;
  icon: PageObjectResponse['icon'];
  published: string;
  description: string;
  tags: MultiSelectPropertyItemObjectResponse['multi_select'];
  title: string;
  preview?: PreviewImageType;
  proxy?: {
    cover: string;
    icon: string;
  };
}
