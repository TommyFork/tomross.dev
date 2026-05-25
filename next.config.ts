import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31_536_000,
    deviceSizes: [360, 414, 640, 768, 1024, 1280],
    imageSizes: [64, 96, 128, 192, 256, 384, 512],
  },
  async redirects() {
    return [
      { source: "/contact", destination: "/about#contact", permanent: true },
    ];
  },
};

export default withMDX(nextConfig);
