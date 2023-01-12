import {
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

export interface CardData {
  id: string;
  cover: string;
  icon: PageObjectResponse['icon'];
  published: string;
  description: string;
  tags: MultiSelectPropertyItemObjectResponse['multi_select'];
  title: string;
  expiryTime: string;
}
