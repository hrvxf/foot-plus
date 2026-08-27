import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Choose a location",
  description: "Choose your local Foot+ service in Bristol or Southampton.",
  alternates: { canonical: "/locations" },
  robots: { index: true, follow: true },
};

const locations = [
  { name: "Bristol", href: "/locations/bristol" },
  { name: "Southampton", href: "/locations/southampton" },
];

export default function LocationsPage() {
  return (
    <main
      aria-label="Choose your Foot+ location"
      className="fixed inset-0 z-[100] flex min-h-dvh items-center justify-center overflow-hidden bg-brand-sageDark/55 px-6 py-10 backdrop-blur-3xl"
    >
      <div
        className="absolute inset-0 bg-[url('/images/footplus-texture.png')] bg-repeat bg-size-[600px_600px] opacity-25"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-white/20 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-brand-sageLight/35 blur-[120px]"
        aria-hidden="true"
      />

      <nav
        aria-label="Foot+ locations"
        className="relative grid w-full max-w-3xl gap-5 sm:grid-cols-2"
      >
        {locations.map((location) => (
          <Link
            key={location.href}
            href={location.href}
            className="group flex min-h-36 items-center justify-center rounded-3xl border border-white/30 bg-white/12 px-8 py-10 font-heading text-2xl font-semibold text-white shadow-[0_30px_90px_-45px_rgba(0,0,0,0.75)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/55 hover:bg-white/20 hover:shadow-[0_38px_100px_-45px_rgba(0,0,0,0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-3xl"
          >
            <span className="transition-transform duration-300 group-hover:scale-[1.03]">
              {location.name}
            </span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
