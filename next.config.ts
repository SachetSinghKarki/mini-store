import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "mini-store-media-sachetsinghkarki-145023096065-eu-north-1-an.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;