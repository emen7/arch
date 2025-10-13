/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Vercel
  output: 'standalone',
  
  // Image optimization
  images: {
    unoptimized: false,
  },
}

module.exports = nextConfig