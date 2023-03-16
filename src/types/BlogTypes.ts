import { CardData } from '@/types/CardData';

export interface BlogPageProps {
  data: CardData[];
  allTags: CardData['tags'];
}

export interface BlogViewProps {
  tagTotal: number;
  postTotal: number;
  allTags: CardData['tags'];
  postData: CardData[];
  currentPage: number;
  handlePageChange: (page: number) => void;
  isChecked: (value: string) => boolean;
  isHighlighted: (value: string) => boolean;
  handleToggleValue: ({ checked, value }: { checked: boolean; value: string }) => void;
}
