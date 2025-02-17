import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lrllicwvskiwlvtkkfkl.supabase.co',
        pathname: '/storage/v1/object/public/article-images/**',
      },
    ],
  },
};

export default nextConfig;