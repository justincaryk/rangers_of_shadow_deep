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
      destination: '/auth/signin',
      permanent: true,
    },
  ]
}

module.exports = {
  redirects,
  ...nextConfig,
}
