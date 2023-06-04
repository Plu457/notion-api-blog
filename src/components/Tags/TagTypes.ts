import { BaseStyle } from '@/commons';
import { IArticle } from '@/types/article';

//* TagList 컴포넌트 타입
export interface TagListProps {
  tagList: IArticle['tags'] | undefined;
  renderTagItem: (item: { id: string; name: string }) => JSX.Element;
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
