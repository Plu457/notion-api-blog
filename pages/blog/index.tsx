import { GetStaticProps } from 'next';

import { useInitializeDataState } from '@/hooks';
import { BlogPageProps } from '@/types/BlogTypes';
import { getAllTags, getCachedDatabaseItems, parseDatabaseItems, previewImage } from '@/utils';

import HeadMeta from '@/components/HeadMeta';
import BlogView from '@/views/Blog';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const BlogPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/blog/page/1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeadMeta />
    </>
  );
};

export default BlogPage;
