import HeadMeta from '@/components/HeadMeta';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const BlogPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/blog/1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeadMeta />
    </>
  );
};

export default BlogPage;
