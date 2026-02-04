import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: {
    default: "Foot+ | Foot Health in Bristol",
    template: "%s | Foot+",
  },
  description: "Professional foot health services in Bristol.",
  openGraph: {
    images: ["/images/foot-health-practitioner-home-visit-bristol.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/foot-health-practitioner-home-visit-bristol.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-lightbg">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Foot+ Bristol",
              description: "Professional home-visit foot health practitioner in Bristol.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bristol",
                postalCode: "BS2",
                addressCountry: "UK",
              },
              areaServed: "Bristol",
              url: "https://www.foot-plus.co.uk",
              telephone: "+447000000000",
              priceRange: "££",
              sameAs: ["https://www.facebook.com/profile.php?id=61586341484139"],
            }),
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
