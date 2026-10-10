import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Old or guessed language URLs land on the right page instead of a 404.
  async redirects() {
    return [
      { source: "/sv", destination: "/", permanent: true },
      { source: "/sv/:path*", destination: "/", permanent: true },
      { source: "/en/:path+", destination: "/en", permanent: true },
      { source: "/se", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
