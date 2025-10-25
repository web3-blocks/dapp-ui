import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [80, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
    ],
  },
  pageExtensions: ["md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
  options: {
    // Use serializable plugin references for Turbopack
    remarkPlugins: [require.resolve("remark-gfm")],
  },
});

export default withMDX(nextConfig);
