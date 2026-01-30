import type { NextConfig } from "next";

const lightweightBuild = process.env.NEXT_LIGHTWEIGHT_BUILD === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  eslint: {
    // Useful on tiny VPS builds; keep strict builds in CI/local by default.
    ignoreDuringBuilds: lightweightBuild,
  },
  typescript: {
    // Useful on tiny VPS builds; keep strict builds in CI/local by default.
    ignoreBuildErrors: lightweightBuild,
  },
};

export default nextConfig;
