/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  // Runtime caching: automatically cache pages/assets as users browse
  // Content updates when online, works offline for previously visited pages
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
})

const nextConfig = {
  // Enable static export for Vercel
  output: 'standalone',

  // Image optimization
  images: {
    unoptimized: false,
  },
}

module.exports = withPWA(nextConfig)