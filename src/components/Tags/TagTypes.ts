import { BaseStyle } from '@/commons';
import { CardData } from '@/types/CardData';

//* TagList 컴포넌트 타입
export interface TagListProps {
  tags: CardData['tags'];
  isChecked: (value: string) => boolean;
  isHighlighted: (value: string) => boolean;
  handleToggleValue: ({ checked, value }: { checked: boolean; value: string }) => void;
}

//* TagItem 컴포넌트 타입
export interface SelectableTagProps {
  name: string;
  isChecked?: (value: string) => boolean;
  isHighlighted?: (value: string) => boolean;
  handleToggleValue?: ({ checked, value }: { checked: boolean; value: string }) => void;
  style: {
    base: string;
    highlighted: string;
    unhighlighted: string;
    selected: string;
  };
}

export interface TagItemProps {
  name: string;
  isReadOnly?: boolean;
  isChecked?: (value: string) => boolean;
  isHighlighted?: (value: string) => boolean;
  handleToggleValue?: ({ checked, value }: { checked: boolean; value: string }) => void;
  color?: keyof typeof BaseStyle.colors;
}

export interface ReadOnlyTagProps {
  name: string;
  color?: keyof typeof BaseStyle.colors;
}

export interface GetTagItemClassNamesParams {
  style: {
    base: string;
    highlighted: string;
    unhighlighted: string;
    selected: string;
  };
  isChecked?: (value: string) => boolean;
  isHighlighted?: (value: string) => boolean;
  name: string;
}
