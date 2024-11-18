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
        destination: process.env.NODE_ENV !== 'production' ? '/api/:path*' : 'https://api.example.com/:path*',
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
