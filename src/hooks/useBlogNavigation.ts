import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { currentPageState } from '@/recoil/post';

interface NavigateToParams {
  page?: number;
  tags?: string[];
}

interface ToggleTagParams {
  value: string;
}

const transformSpaces = (str: string, toPlus = true) =>
  toPlus ? str.replace(/%20/g, '+') : str.replace(/\+/g, ' ');

const useBlogNavigation = () => {
  const router = useRouter();
  const category = router.pathname.split('/')[1];
  const currentPage = useRecoilValue(currentPageState);

  const createUrl = ({ page, tags }: NavigateToParams) => {
    const url = new URL(router.asPath, window.location.origin);
    url.pathname = `/${category}`;

    const params = new URLSearchParams();
    params.set('page', String(page || currentPage));

    if (tags && tags.length > 0) {
      params.set('q', tags.join(' '));
    }

    url.search = params.toString();

    return transformSpaces(url.toString());
  };

  const navigateTo = (navigateParams: NavigateToParams) => {
    const displayUrl = createUrl(navigateParams);

    router.push(displayUrl, undefined, { shallow: true });
  };

  const addTagToList = ({ value }: ToggleTagParams) => {
    const currentTags = router.query.q
      ? decodeURIComponent(transformSpaces(router.query.q.toString(), false)).split(' ')
      : [];

    const updatedTags = [...currentTags, value];

    navigateTo({ page: 1, tags: updatedTags });
  };

  const removeTagFromList = ({ value }: ToggleTagParams) => {
    const currentTags = router.query.q
      ? decodeURIComponent(transformSpaces(router.query.q.toString(), false)).split(' ')
      : [];

    const updatedTags = currentTags.filter(currentTag => currentTag !== value);

    navigateTo({ page: 1, tags: updatedTags });
  };

  return {
    navigateTo,
    addTagToList,
    removeTagFromList,
  };
};

export default useBlogNavigation;
