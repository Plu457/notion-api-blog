import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Constant } from 'commons';

interface PageHeadProps {
  title?: string;
  description?: string;
  ogImageSrc?: string;
}

const PageHead = ({ title, description, ogImageSrc }: PageHeadProps) => {
  const { asPath } = useRouter();

  const siteUrl = process.env.SITE_URL ?? 'https://www.plu457.life';

  const fullUrl = `${siteUrl}${asPath}`;
  const fullTitle = title ? `${title} | ${Constant.DEFAULT_TITLE}` : Constant.DEFAULT_TITLE;
  const fullOgImageSrc = ogImageSrc ?? `${siteUrl}${Constant.DEFAULT_OG_IMAGE_SRC}`;

  return (
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
  );
};

export default PageHead;
