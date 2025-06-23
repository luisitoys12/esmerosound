import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'radio.trabullnetwork.pro',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
