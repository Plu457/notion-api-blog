import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { Constant } from '@/commons';

interface HeadMetaProps {
  title?: string;
  description?: string;
  ogImageSrc?: string;
}

const HeadMeta = ({ title, description, ogImageSrc }: HeadMetaProps) => {
  const { asPath } = useRouter();

  const siteUrl = process.env.SITE_URL ?? 'https://www.plu457.life';

  const fullUrl = `${siteUrl}${asPath}`;
  const fullTitle = title ? `${title} | ${Constant.DEFAULT_TITLE}` : Constant.DEFAULT_TITLE;
  const fullOgImageSrc = ogImageSrc ?? `${siteUrl}${Constant.DEFAULT_OG_IMAGE_SRC}`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description ?? Constant.DEFAULT_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={fullUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title ?? Constant.DEFAULT_TITLE} />
        <meta property="og:description" content={description ?? Constant.DEFAULT_DESCRIPTION} />
        <meta property="og:site_name" content={title ?? Constant.DEFAULT_TITLE} />
        <meta property="og:image" content={fullOgImageSrc} />
        <meta property="og:image:alt" content={title ?? Constant.DEFAULT_TITLE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={fullUrl} />
      </Head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
        `}
      </Script>
    </>
  );
};

export default HeadMeta;
