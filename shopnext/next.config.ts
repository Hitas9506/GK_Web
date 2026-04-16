import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from external sources if needed
    remotePatterns: [],
    // Optimize local images
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
