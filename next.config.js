/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost']
  },
  // Для совместимости со старым кодом:
  transpilePackages: ['@phosphor-icons/react']
}

module.exports = nextConfig