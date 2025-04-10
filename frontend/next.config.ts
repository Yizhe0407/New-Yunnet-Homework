import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.BACKEND_API}/api/auth/:path*`, // Proxy to Backend
      }
    ]
  }
};

export default nextConfig;
