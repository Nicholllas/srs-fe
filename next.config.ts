import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**', // Memperbolehkan semua gambar dari folder /storage
      },
      // Tambahkan pattern lain di sini jika ada, misalnya untuk production
      // {
      //   protocol: 'https',
      //   hostname: 'api.domainanda.com',
      //   port: '',
      //   pathname: '/storage/**',
      // }
    ],
  },
};

export default nextConfig;
