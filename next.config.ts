import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    /**
     * Next 16 defaults to `localPatterns: [{ pathname: "**", search: "" }]` — no query strings.
     * Hero portrait uses `?v=` cache bust; omitting `search` here allows any query for this path.
     */
    localPatterns: [
      { pathname: "/hero-portrait.png" },
      { pathname: "/uploads/projects/**" },
    ],
  },
};

export default nextConfig;
