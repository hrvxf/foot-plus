import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Foot+ | Foot Health in Bristol",
  description: "Professional foot health services in Bristol.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
      </head>

      {/* 
        Global background: one continuous texture behind header/hero/footer.
        - fixed: prevents scroll "edge" where texture appears to stop
        - -z-10: stays behind all content
      */}
      <body className="relative min-h-screen text-ink flex flex-col bg-brand-sage">
        {/* Texture layer */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-brand-sage bg-[url('/images/footplus-texture.svg')] bg-cover bg-center bg-no-repeat bg-fixed" />
        {/* Tint overlay for readability */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-brand-sage/60" />

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
