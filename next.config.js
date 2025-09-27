// next.config.js (CommonJS)
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true }, // keep builds unblocked

  images: {
    // Prefer WebP on mobile Safari for faster decode; fall back to AVIF
    formats: ["image/webp", "image/avif"],
    // Cache optimized images longer to reduce repeat downloads
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },

  webpack: (config) => {
    // allow imports like "@/components/..."
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;