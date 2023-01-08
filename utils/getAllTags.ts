import { CardData } from 'types';

export const getAllTags = (data: CardData[]) => [...new Set(data.flatMap(({ tags }) => tags))];
