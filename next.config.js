/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["gateway.ipfscdn.io"],
    unoptimized: true
  },
  output: 'export',
};

module.exports = nextConfig;
