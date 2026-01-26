import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/__clerk/:path*",
        destination: "https://clerk.fluxdev.io/__clerk/:path*",
      },
    ];
  },
};

export default nextConfig;
