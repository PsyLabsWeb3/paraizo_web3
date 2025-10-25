/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['img.youtube.com', 'i.ytimg.com', 'github.com', 'avatars.githubusercontent.com']
  },
  trailingSlash: false,
  // Web3 específico - proxy para evitar CORS con RPC
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  }
}

export default nextConfig
