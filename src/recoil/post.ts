import { atom, selector } from 'recoil';
import { Constant } from '@/commons';
import { IArticle } from '@/types/article';

export const postState = atom<IArticle[]>({
  key: 'postState',
  default: [],
});

export const tagState = atom<IArticle['tags']>({
  key: 'tagState',
  default: [],
});

export const selectedTagListState = atom<string[]>({
  key: 'selectedTagListState',
  default: [],
});

export const activeTagListState = atom<string[]>({
  key: 'activeTagListState',
  default: [],
});

export const currentPageState = atom({
  key: 'currentPageState',
  default: 1,
});

export const filteredDataState = selector({
  key: 'filteredDataState',
  get: ({ get }) => {
    const selectedTagList = get(selectedTagListState);
    const data = get(postState);

    if (!selectedTagList.length) {
      return data;
    }

    return data.filter(item =>
      selectedTagList.every(tagName => item.tags.some(tag => tag.name === tagName)),
    );
  },
});

export const activeTagListSelector = selector<string[]>({
  key: 'activeTagListSelector',
  get: ({ get }) => {
    const selectedTagList = get(selectedTagListState);
    const filteredData = get(filteredDataState);

    const activeTags: Set<string> = new Set();

    filteredData.forEach(item => {
      if (
        selectedTagList.length === 0 ||
        item.tags.some(tag => selectedTagList.includes(tag.name))
      ) {
        item.tags.forEach(tag => {
          activeTags.add(tag.name);
        });
      }
    });

    return Array.from(activeTags);
  },
});

export const postDataState = selector({
  key: 'postDataState',
  get: ({ get }) => {
    const filteredData = get(filteredDataState);
    const currentPage = get(currentPageState);
    const start = Constant.POSTS_PER_PAGE * (currentPage - 1);
    const end = Constant.POSTS_PER_PAGE * currentPage;

    return filteredData.slice(start, end);
  },
});

export const postTotalState = selector({
  key: 'postTotalSelector',
  get: ({ get }) => {
    const filteredData = get(filteredDataState);
    return filteredData.length;
  },
});
