import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/foot-health-practitioner-bristol",
        destination: "/",
        permanent: true,
      },
      {
        source: "/areas",
        destination: "/areas-we-cover",
        statusCode: 301,
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
