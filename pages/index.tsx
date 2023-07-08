import { HeadMeta } from '@/components';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/blog?page=1');
  }, [router]);

  return (
    <>
      <HeadMeta />
    </>
  );
};

export default Home;
