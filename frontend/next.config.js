/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["2022fall-42class-team12.s3.ap-northeast-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
