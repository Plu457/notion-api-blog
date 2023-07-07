import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { currentPageState } from '@/recoil/post';

interface NavigateToParams {
  page?: number;
  tags?: string[];
}

interface ToggleTagInListParams {
  checked: boolean;
  value: string;
}

const useBlogNavigation = () => {
  const router = useRouter();
  const category = router.pathname.split('/')[1];
  const currentPage = useRecoilValue(currentPageState);

  const navigateTo = ({ page, tags }: NavigateToParams) => {
    const encodedTags = tags?.join(' ');

    const url = new URL(router.asPath, window.location.origin);
    url.pathname = `/${category}`;
    url.search = `?q=${encodedTags || ''}&page=${String(page || currentPage)}`;

    const displayUrl = url.toString().replace(/%20/g, '+');

    window.history.pushState({}, '', displayUrl);

    router.replace(displayUrl, undefined, { shallow: true });
  };

  const toggleTagInList = ({ checked, value }: ToggleTagInListParams) => {
    const currentTags = router.query.q
      ? decodeURIComponent(router.query.q.toString().replace(/\+/g, ' ')).split(' ')
      : [];

    const updatedTags = checked
      ? [...currentTags, value]
      : currentTags.filter(currentTag => currentTag !== value);

    navigateTo({ page: 1, tags: updatedTags });
  };

  return {
    navigateTo,
    toggleTagInList,
  };
};

export default useBlogNavigation;
