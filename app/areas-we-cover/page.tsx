import Link from "next/link";
import type { Metadata } from "next";
import Button from "../components/Button";
import { locationPages } from "../lib/location-pages";
import { bookingHref, SITE_URL } from "../lib/site";

const canonical = `${SITE_URL}/areas-we-cover`;

export const metadata: Metadata = {
  title: "Areas We Cover in Bristol | Foot+ Home Visits",
  description:
    "Foot+ provides professional home-visit foot care across selected areas of Bristol. Explore Clifton, Redland, Bishopston, Henleaze and Westbury-on-Trym.",
  alternates: { canonical },
  openGraph: {
    url: canonical,
    title: "Areas We Cover in Bristol | Foot+ Home Visits",
    description:
      "Explore selected Bristol areas where Foot+ provides professional foot care in patients’ homes.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${canonical}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Areas We Cover", item: canonical },
  ],
};

export default function AreasWeCoverPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-16 pt-8 md:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-brand-charcoal/65">
        <ol className="flex flex-wrap gap-2"><li><Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page">Areas We Cover</li></ol>
      </nav>
      <section className="overflow-hidden rounded-3xl border border-brand-sageLight/35 bg-linear-to-br from-white via-white to-brand-sageLight/20 p-7 shadow-sm md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark/75">Areas We Cover</p>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">Home-visit foot care across Bristol</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-charcoal/75 md:text-base">Foot+ provides professional foot care in patients’ homes across selected areas of Bristol. Explore your local area below or contact Foot+ with your postcode to confirm availability.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button href={bookingHref} variant="solid">Book an appointment</Button><Button href="/services" variant="outline">View services</Button></div>
      </section>
      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Local service areas">
        {locationPages.map((area) => <Link key={area.slug} href={`/${area.slug}`} className="group rounded-2xl border border-brand-sageLight/30 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-sageLight/60 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageLight"><h2 className="font-heading text-xl font-semibold text-brand-sageDark">{area.area}</h2><p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75">{area.intro}</p><span className="mt-4 inline-flex text-sm font-semibold text-brand-sageDark underline underline-offset-4">Explore home visits in {area.area}</span></Link>)}
      </section>
      <section className="mt-8 rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm"><h2 className="font-heading text-2xl font-semibold text-brand-sageDark">Not sure whether your postcode is covered?</h2><p className="mt-3 text-sm leading-relaxed text-brand-charcoal/75 md:text-base">The areas above are helpful local guides rather than a guarantee of every appointment slot. If you are nearby, contact Foot+ with your postcode so availability and any travel details can be confirmed before booking.</p><div className="mt-5 flex flex-col gap-3 sm:flex-row"><Button href={bookingHref} variant="solid">Enquire with your postcode</Button><Button href="/areas" variant="outline">View wider Bristol areas</Button></div></section>
    </main>
  );
}
