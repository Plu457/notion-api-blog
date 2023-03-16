import { CardData } from '@/types/CardData';

export interface IconRendererProps {
  icon: CardData['icon'];
}

export interface CardListProps {
  data: CardData[];
}

export interface CardItemProps {
  data: CardData;
}
