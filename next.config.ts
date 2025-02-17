import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lrllicwvskiwlvtkkfkl.supabase.co'], // Add your Supabase URL here
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
