import "./globals.css";
import Script from "next/script";
import Header from "./components/Header";
import Footer from "./components/Footer";

const SITE_URL = "https://foot-plus.co.uk";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/site.webmanifest",

  // Canonical (site-wide default)
  alternates: {
    canonical: `${SITE_URL}/`,
  },

  title: {
    default: "Foot+ Bristol | Foot Health Practitioner Bristol",
    template: "%s | Foot+ Bristol",
  },

  description:
    "Foot+ Bristol provides mobile foot health care and home visits across Bristol for healthy, comfortable feet.",

  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: "Foot+ Bristol",
    title: "Foot+ Bristol | Foot Health Practitioner Bristol",
    description:
      "Foot+ Bristol provides mobile foot health care and home visits across Bristol for healthy, comfortable feet.",
    images: [
      {
        url: "/images/social-card.png",
        width: 1200,
        height: 630,
        alt: "Foot+ Bristol - mobile foot health care and home visits in Bristol",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Foot+ Bristol | Foot Health Practitioner Bristol",
    description:
      "Foot+ Bristol provides mobile foot health care and home visits across Bristol for healthy, comfortable feet.",
    images: ["/images/social-card.png"],
  },

  icons: {
    icon: [
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
    alternateName: ["Foot+", "Foot Plus Bristol"],
    url: `${SITE_URL}/`,
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Foot+ Bristol",
    url: SITE_URL,
    logo: `${SITE_URL}/images/footplus-logo-green.svg`,
  };

  const medicalBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Foot+ Bristol",
    description:
      "Foot+ Bristol provides mobile foot health care and home visits in Bristol.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bristol",
      postalCode: "BS2",
      addressCountry: "GB",
    },
    areaServed: {
      "@type": "City",
      name: "Bristol",
    },
    url: SITE_URL,
    priceRange: "££",
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
