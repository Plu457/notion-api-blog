import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { currentPageState } from '@/recoil/post';

const useBlogNavigation = () => {
  const router = useRouter();
  const category = router.pathname.split('/')[1];
  const currentPage = useRecoilValue(currentPageState);

  const navigateTo = ({ page, tags }: { page?: number; tags?: string[] }) => {
    router.push({
      pathname: `/${category}`,
      query: {
        page: page || currentPage,
        q: tags ? tags.join('+') : undefined,
      },
    });
  };

  const toggleTagInList = ({ checked, value }: { checked: boolean; value: string }) => {
    const currentTags = router.query.q ? router.query.q.toString().split('+') : [];

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
