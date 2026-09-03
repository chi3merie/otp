import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces .next/standalone for minimal Docker/VPS deployments.
  // Ignored by platforms like Vercel, safe for all other deployments.
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
