import type { AppProps } from "next/app";
import { Inter, Poppins } from "next/font/google";

import "../app/globals.css";
import Footer from "../app/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${poppins.variable} min-h-screen bg-lightbg text-ink`}>
      <main className="min-h-screen">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
