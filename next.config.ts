import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/areas",
        destination: "/areas-we-cover",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.foot-plus.co.uk",
          },
        ],
        destination: "https://foot-plus.co.uk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
