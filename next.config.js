/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'vercel.app'],
    formats: ['image/webp'],
    unoptimized: true,
    disableStaticImages: false,
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
  reactStrictMode: true,
  experimental: {
    largePageDataBytes: 128 * 100000, // Increase limit for large pages
  },
}

module.exports = nextConfig 