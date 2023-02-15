import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';

import '@/styles/globals.css';
import 'katex/dist/katex.min.css'; //* 수학 공식 스타일
import 'prismjs/themes/prism-tomorrow.css'; //* 코드 블럭 스타일
import 'react-notion-x/src/styles.css';
import '@/styles/notionStyle.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
