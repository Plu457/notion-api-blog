/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['s3.us-west-2.amazonaws.com', 'www.notion.so', 'images.unsplash.com'],
    deviceSizes: [640, 750, 828, 1080, 1152],
  },
};

module.exports = nextConfig;
