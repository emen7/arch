/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  // Minimal caching strategy for Phase 1 (installable only)
  runtimeCaching: [],
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