/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'vercel.app', 'solgazm.vercel.app'],
    formats: ['image/webp'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
  reactStrictMode: true,
  experimental: {
    largePageDataBytes: 128 * 100000, // Increase limit for large pages
  },
  output: 'standalone',
  poweredByHeader: false,
}

module.exports = nextConfig 