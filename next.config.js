/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.jumbo.com", "static.ah.nl", "www.aldi.nl"],
  },
};

module.exports = nextConfig;
