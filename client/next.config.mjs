const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/lives',
        destination: '/',
      },
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV !== 'production' ? '/api/:path*' : `${apiUrl}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      }, // sample domain for test
    ],
  },
};

export default nextConfig;
