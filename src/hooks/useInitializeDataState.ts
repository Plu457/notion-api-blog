import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { dataState } from '@/recoil/post';

import { BlogPageProps } from '@/types/BlogTypes';

const useInitializeDataState = ({ data }: BlogPageProps) => {
  const setDataState = useSetRecoilState(dataState);

  useEffect(() => {
    setDataState(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useInitializeDataState;
