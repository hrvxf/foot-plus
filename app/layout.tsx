import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const SITE_URL = "https://foot-plus.co.uk";

export const metadata = {
  metadataBase: new URL(SITE_URL),

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
    images: [
      {
        url: "/images/social-card.png",
        width: 1200,
        height: 630,
        alt: "Foot+ - Professional foot health services in Bristol",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Foot+ | Foot Health in Bristol",
    description: "Professional foot health services in Bristol.",
    images: ["/images/social-card.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Foot+ Bristol",
    alternateName: ["Foot Plus", "Foot+ Bristol"],
    url: `${SITE_URL}/`,
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Foot+ Bristol",
    url: SITE_URL,
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
