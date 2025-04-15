/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  // Важно! Добавь это для работы с Telegram Mini App
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://telegram.org https://*.telegram.org; connect-src 'self' https://*.vercel.app https://api.openai.com https://graph.facebook.com https://*.facebook.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.vercel.app; frame-src 'self' https://telegram.org https://*.telegram.org;"
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig