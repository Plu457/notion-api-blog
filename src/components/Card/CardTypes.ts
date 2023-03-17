import { CardData } from '@/types/CardData';

export interface IconRendererProps {
  icon: CardData['icon'];
}

export interface CardListProps {
  data: CardData[];
  renderCardItem: (item: CardData) => JSX.Element;
}
export interface CardItemProps {
  data: CardData;
}
