/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
    eslint: { ignoreDuringBuilds: true },
    experimental: { tsconfigPaths: true }
  },
};

module.exports = nextConfig;
