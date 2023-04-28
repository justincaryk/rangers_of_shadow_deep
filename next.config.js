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
    {
      source: '/create',
      destination: '/create/ranger',
      permanent: true,
    },
  ]
}

module.exports = {
  redirects,
  ...nextConfig,
}
