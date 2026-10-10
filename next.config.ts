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
      // Old v2 pages (swegbg.com before the merge) → the matching section.
      { source: "/om", destination: "/#om", permanent: true },
      { source: "/om-oss", destination: "/#om", permanent: true },
      { source: "/about", destination: "/en#om", permanent: true },
      { source: "/kontakt", destination: "/#kontakt", permanent: true },
      { source: "/contact", destination: "/en#kontakt", permanent: true },
      { source: "/priser", destination: "/#priser", permanent: true },
      { source: "/pricing", destination: "/en#priser", permanent: true },
      { source: "/tjanster", destination: "/#verkstaden", permanent: true },
      { source: "/services", destination: "/en#verkstaden", permanent: true },
      { source: "/portfolio", destination: "/#hantverket", permanent: true },
      { source: "/projekt", destination: "/#hantverket", permanent: true },
      { source: "/work", destination: "/en#hantverket", permanent: true },
      { source: "/faq", destination: "/#fragor", permanent: true },
    ];
  },
};

export default nextConfig;
