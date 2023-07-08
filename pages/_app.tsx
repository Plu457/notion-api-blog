import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { RecoilRoot, RecoilEnv } from 'recoil';
import Layout from '@/components/Layout';

import '@/styles/globals.css';
import 'katex/dist/katex.min.css'; //* 수학 공식 스타일
import 'prismjs/themes/prism-tomorrow.css'; //* 코드 블럭 스타일
import 'react-notion-x/src/styles.css';
import '@/styles/notionStyle.scss';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
      <Analytics />
    </>
  );
}

export default MyApp;
