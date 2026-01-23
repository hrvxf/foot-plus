import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Foot+ | Foot Health in Bristol",
  description: "Professional foot health services in Bristol.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
      </head>
      <body>
        <Header />
        <main className="min-h-screen px-6 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
