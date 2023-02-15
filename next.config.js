/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['s3.us-west-2.amazonaws.com', 'www.notion.so'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['~'] = path.resolve(__dirname);
    }
    return config;
  },
};

module.exports = nextConfig;
