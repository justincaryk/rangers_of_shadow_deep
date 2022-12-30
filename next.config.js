/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
}

async function redirects() {
  return [
    {
      source: '/',
      destination: '/ranger',
      permanent: true,
    },
  ]
}

module.exports = {
  redirects,
  ...nextConfig,
}
