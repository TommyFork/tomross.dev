import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/about", destination: "/", permanent: true },
    ];
  },
};

export default withMDX(nextConfig);
