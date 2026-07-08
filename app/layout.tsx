import "./globals.css";
import Script from "next/script";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  SEARCH_PREVIEW_IMAGE,
  SEARCH_PREVIEW_IMAGE_METADATA,
  SITE_URL,
} from "./seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/site.webmanifest",

  // Canonical (site-wide default)
  alternates: {
    canonical: `${SITE_URL}/`,
  },

  title: {
    default: "Foot+ | Foot Health in Bristol",
    template: "%s | Foot+",
  },

  description: "Professional foot health services in Bristol.",

  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: "Foot+ Bristol",
    title: "Foot+ | Foot Health in Bristol",
    description: "Professional foot health services in Bristol.",
    images: [SEARCH_PREVIEW_IMAGE_METADATA],
  },

  twitter: {
    card: "summary_large_image",
    title: "Foot+ | Foot Health in Bristol",
    description: "Professional foot health services in Bristol.",
    images: [SEARCH_PREVIEW_IMAGE_METADATA],
  },

  icons: {
    icon: [
      // Prefer a vector favicon where supported, with raster fallbacks for older browsers.
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Foot+ Bristol",
    alternateName: ["Foot Plus", "Foot+ Bristol"],
    url: `${SITE_URL}/`,
    image: SEARCH_PREVIEW_IMAGE,
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Foot+ Bristol",
    url: SITE_URL,
    image: SEARCH_PREVIEW_IMAGE,
    logo: `${SITE_URL}/images/footplus-logo-green.svg`,
  };

  const medicalBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Foot+ Bristol",
    description: "Professional home-visit foot health practitioner in Bristol.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bristol",
      postalCode: "BS2",
      addressCountry: "GB",
    },
    areaServed: "Bristol",
    url: SITE_URL,
    image: SEARCH_PREVIEW_IMAGE,
    telephone: "+447000000000",
    priceRange: "££",
    sameAs: ["https://www.facebook.com/profile.php?id=61586341484139"],
  };

  return (
    <html lang="en" className="bg-lightbg">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        <meta property="og:site_name" content="Foot+ Bristol" />
        <meta
          name="facebook-domain-verification"
          content="9idrp6n7fq592jktesd6z6bl4qg5kt"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@600;700&display=swap"
        />

        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />

        {/* Site name signal for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        {/* Local business / medical schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(medicalBusinessJsonLd),
          }}
        />

        {/* Organization schema for brand/site-name confidence */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>

      <body className="min-h-screen bg-lightbg text-ink flex flex-col">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7X749Z34XF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7X749Z34XF');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '948452367747908');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=948452367747908&ev=PageView&noscript=1"
          />
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
