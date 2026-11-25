import type { NextConfig } from "next";

// Sent on every page. A full script Content-Security-Policy would also need testing
// against Google Maps, Splose, Stripe, the Google tag and Meta, so this CSP only sets
// the rules that can't break anything: no framing by other sites, no plugins,
// no <base> hijacking and forms posting only to this site.
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // New URLs for the two pages Google never crawled (Nov 2026). Keep indefinitely.
      { source: "/services", destination: "/foot-care-services", statusCode: 301 },
      { source: "/terms", destination: "/terms-and-conditions", statusCode: 301 },
      // The care page now covers both locations (Nov 2026).
      {
        source: "/care-homes-bristol",
        destination: "/supported-living-foot-care",
        permanent: true,
      },
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
      // Bristol-only treatment pages replaced by general pages (Nov 2026).
      // Nail cutting keeps its own town pages; these services are location-neutral.
      { source: "/corn-removal-bristol", destination: "/corn-treatment", permanent: true },
      { source: "/callus-removal-bristol", destination: "/hard-skin-and-callus", permanent: true },
      { source: "/hard-skin-treatment-bristol", destination: "/hard-skin-and-callus", permanent: true },
      { source: "/cracked-heels-bristol", destination: "/cracked-heels", permanent: true },
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
