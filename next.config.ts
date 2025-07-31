import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['fakestoreapi.com'], // allow external image host
  },
};

export default nextConfig;

