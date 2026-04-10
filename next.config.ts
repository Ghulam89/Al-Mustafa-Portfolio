import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      /** Vercel Blob (`*.public.blob.vercel-storage.com`) — needed if you use `next/image` for those URLs */
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
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
