/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['s3.us-west-2.amazonaws.com', 'www.notion.so'],
  },
};

module.exports = nextConfig;
