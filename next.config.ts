import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Short, easy-to-read link for WhatsApp follow-ups after an enquiry.
      {
        source: "/form",
        destination: "/forms?location=bristol",
        permanent: false,
      },
      {
        source: "/foot-health-practitioner-bristol",
        destination: "/locations/bristol",
        permanent: true,
      },
      {
        source: "/advice/why-toenails-become-thick",
        destination: "/advice/thickened-toenails-causes-treatment-and-when-to-worry",
        permanent: true,
      },
      // Neighbourhood pages consolidated into the Bristol areas hub (Nov 2026).
      // Search Console showed ~200 impressions and 5 clicks across all 16 in 30 days,
      // with almost no neighbourhood-specific searches. Keep these redirects indefinitely.
      {
        source: "/foot-health-practitioner-clifton",
        destination: "/locations/bristol/areas-we-cover#west",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-redland",
        destination: "/locations/bristol/areas-we-cover#north",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-cotham",
        destination: "/locations/bristol/areas-we-cover#north",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-st-philips",
        destination: "/locations/bristol/areas-we-cover#central",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-old-market",
        destination: "/locations/bristol/areas-we-cover#central",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-redcliffe",
        destination: "/locations/bristol/areas-we-cover#central",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-bishopston",
        destination: "/locations/bristol/areas-we-cover#north",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-henleaze",
        destination: "/locations/bristol/areas-we-cover#north",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-westbury-on-trym",
        destination: "/locations/bristol/areas-we-cover#north",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-stoke-bishop",
        destination: "/locations/bristol/areas-we-cover#north",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-sneyd-park",
        destination: "/locations/bristol/areas-we-cover#north",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-easton",
        destination: "/locations/bristol/areas-we-cover#east",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-barton-hill",
        destination: "/locations/bristol/areas-we-cover#east",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-totterdown",
        destination: "/locations/bristol/areas-we-cover#south",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-southville",
        destination: "/locations/bristol/areas-we-cover#south",
        permanent: true,
      },
      {
        source: "/foot-health-practitioner-bedminster",
        destination: "/locations/bristol/areas-we-cover#south",
        permanent: true,
      },
      {
        source: "/areas",
        destination: "/locations/bristol/areas-we-cover",
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
