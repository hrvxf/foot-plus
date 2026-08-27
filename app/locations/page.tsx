import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Locations",
  description: "Choose your local Foot+ home-visit foot-care service in Bristol or Southampton.",
  alternates: { canonical: "/locations" },
};

const locations = [
  {
    name: "Foot+ Bristol",
    status: "Appointments available",
    description: "Professional home-visit foot care across Bristol, with local coverage, practitioner information and booking.",
    href: "/locations/bristol",
    action: "Explore Bristol",
  },
  {
    name: "Foot+ Southampton",
    status: "Launching 20 October 2026",
    description: "Professional home-visit foot care coming to Southampton. View the launch information and register your interest.",
    href: "/locations/southampton",
    action: "Explore Southampton",
  },
];

export default function LocationsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:pt-16">
      <nav aria-label="Breadcrumb" className="text-sm text-brand-charcoal/65">
        <Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Locations</span>
      </nav>
      <section className="mt-6 rounded-3xl border border-brand-sageLight/35 bg-linear-to-br from-white via-white to-brand-sageLight/20 p-7 shadow-sm md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">Locations</p>
        <h1 className="mt-3 max-w-3xl font-heading text-4xl font-semibold text-brand-sageDark md:text-5xl">Choose your local Foot+ service</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-charcoal/75 md:text-lg">
          Each location contains its own coverage, practitioner, availability and booking information. Foot+ services and standards remain shared across the website.
        </p>
      </section>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {locations.map((location) => (
          <Link key={location.name} href={location.href} className="group rounded-3xl border border-brand-sageLight/35 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-9">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-sageDark/65">{location.status}</span>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-brand-sageDark">{location.name}</h2>
            <p className="mt-4 leading-relaxed text-brand-charcoal/70">{location.description}</p>
            <span className="mt-7 inline-block font-semibold text-brand-sageDark">{location.action} →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
