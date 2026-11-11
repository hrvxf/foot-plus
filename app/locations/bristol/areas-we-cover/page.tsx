import Link from "next/link";
import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import Button from "../../../components/Button";
import PostcodeChecker from "../../../components/home/PostcodeChecker";
import { locationPages } from "../../../lib/location-pages";
import {
  BRISTOL_BUSINESS_ID,
  emailHref,
  phoneDisplay,
  phoneHref,
  SITE_URL,
} from "../../../lib/site";

const canonical = `${SITE_URL}/locations/bristol/areas-we-cover`;
const metaTitle = "Areas We Cover in Bristol | Home Visits";
const metaDescription =
  "Check whether Foot+ visits your Bristol postcode. Home foot care across central, north, east and south Bristol, with travel included in central Bristol.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical },
  openGraph: { url: canonical, title: metaTitle, description: metaDescription },
  twitter: { title: metaTitle, description: metaDescription },
  robots: { index: true, follow: true },
};

type Zone = {
  id: string;
  title: string;
  travel: "included" | "supplement" | "request";
  postcodes: string[];
  places: string[];
};

// Coverage mirrors the service areas already published in lib/site.ts.
// Exact coverage and any travel supplement are always confirmed from the full postcode.
const zones: Zone[] = [
  {
    id: "central",
    title: "Central Bristol",
    travel: "included",
    postcodes: ["BS1", "BS2", "BS6", "BS8"],
    places: [
      "City Centre",
      "Harbourside",
      "Redcliffe",
      "St Philips",
      "Old Market",
      "Stokes Croft",
      "Clifton",
      "Hotwells",
      "Cotham",
      "Redland",
    ],
  },
  {
    id: "north",
    title: "North Bristol",
    travel: "supplement",
    postcodes: ["BS7", "BS9", "BS34"],
    places: [
      "Bishopston",
      "Horfield",
      "Ashley Down",
      "Filton",
      "Henleaze",
      "Westbury-on-Trym",
      "Stoke Bishop",
      "Sneyd Park",
    ],
  },
  {
    id: "east",
    title: "East Bristol",
    travel: "supplement",
    postcodes: ["BS5"],
    places: ["Easton", "Barton Hill"],
  },
  {
    id: "south",
    title: "South Bristol",
    travel: "supplement",
    postcodes: ["BS3", "BS4"],
    places: ["Bedminster", "Southville", "Totterdown", "Knowle", "Brislington"],
  },
  {
    id: "further",
    title: "Further afield",
    travel: "request",
    postcodes: ["BS15", "BS16", "BS31"],
    places: ["Fishponds", "Kingswood", "Stoke Gifford", "Keynsham"],
  },
];

const travelLabel: Record<Zone["travel"], string> = {
  included: "Travel included",
  supplement: "Travel supplement may apply",
  request: "By request",
};

const pageByArea = new Map(
  locationPages.map((page) => [page.area, `/${page.slug}`])
);

const faqs = [
  {
    question: "How do I know if you visit my address?",
    answer:
      "Enter your postcode in the checker above. If it is a Bristol postcode, you can go straight to booking and Foot+ will confirm the exact address before your visit.",
  },
  {
    question: "Is there a travel fee?",
    answer:
      "Travel within central Bristol is included. Visits elsewhere in Bristol may have a small travel supplement, which is always confirmed before you book.",
  },
  {
    question: "My area isn't listed. Can you still visit?",
    answer: `Possibly. Nearby towns can be considered by request. Call ${phoneDisplay} or email Foot+ with your postcode.`,
  },
  {
    question: "Can a relative or carer book for someone else?",
    answer:
      "Yes. A relative, carer or support worker can make the enquiry or be present at the visit, with consent from the person receiving care.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Foot+ Bristol",
          item: `${SITE_URL}/locations/bristol`,
        },
        { "@type": "ListItem", position: 3, name: "Areas We Cover", item: canonical },
      ],
    },
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Home-visit foot care in Bristol",
      serviceType: "Home visit foot care",
      provider: { "@id": BRISTOL_BUSINESS_ID },
      areaServed: zones
        .filter((zone) => zone.travel !== "request")
        .flatMap((zone) => zone.places)
        .map((name) => ({ "@type": "Place", name: `${name}, Bristol` })),
      url: canonical,
    },
    {
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function AreasWeCoverPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-8 md:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-brand-charcoal/65">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link
              className="font-semibold text-brand-sageDark underline underline-offset-4"
              href="/locations/bristol"
            >
              Foot+ Bristol
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Areas We Cover</li>
        </ol>
      </nav>

      <section className="grid gap-8 overflow-hidden rounded-3xl border border-brand-sageLight/35 bg-linear-to-br from-white via-white to-brand-sageLight/20 p-7 shadow-sm md:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark/75">
            Areas We Cover
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">
            Home visits across Bristol
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
            Foot+ comes to you for routine foot and nail care. Pop your
            postcode in to check we visit your area.
          </p>
          <p className="mt-4 inline-flex items-center rounded-full bg-brand-sageLight/20 px-3 py-1 text-xs font-semibold text-brand-sageDark">
            <MapPin aria-hidden="true" className="mr-1.5 h-4 w-4" />
            Based in central Bristol, BS2
          </p>
        </div>
        <PostcodeChecker source="areas" label="Check your postcode" />
      </section>

      <section className="mt-12" aria-labelledby="zones-heading">
        <div className="max-w-3xl">
          <h2
            id="zones-heading"
            className="font-heading text-2xl font-semibold text-brand-sageDark"
          >
            Where we visit
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
            Neighbourhoods are a guide. Your postcode decides coverage, and any
            travel supplement is confirmed before you book.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {zones
            .filter((zone) => zone.travel !== "request")
            .map((zone) => (
              <ZoneCard key={zone.id} zone={zone} />
            ))}
        </div>
        {zones
          .filter((zone) => zone.travel === "request")
          .map((zone) => (
            <div key={zone.id} className="mt-5">
              <ZoneCard zone={zone} compact />
            </div>
          ))}
      </section>

      <section className="mt-12" aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="font-heading text-2xl font-semibold text-brand-sageDark"
        >
          Coverage questions
        </h2>
        <div className="mt-5 divide-y divide-brand-line overflow-hidden rounded-3xl border border-brand-sageLight/30 bg-white shadow-sm">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5 md:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-sageDark">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="text-xl leading-none transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl bg-brand-sageDark p-7 text-white shadow-sm md:p-9">
        <h2 className="font-heading text-2xl font-semibold">
          Book a home foot care appointment
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80 md:text-base">
          Professional foot and nail care in the comfort of your own home.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/book?location=bristol" variant="primary">
            Book an appointment
          </Button>
          <Button href={phoneHref} variant="secondary">
            Call {phoneDisplay}
          </Button>
          <Button href={emailHref} variant="secondary">
            Email Foot+
          </Button>
        </div>
      </section>
    </main>
  );
}

function ZoneCard({ zone, compact = false }: { zone: Zone; compact?: boolean }) {
  const included = zone.travel === "included";

  return (
    <article
      id={zone.id}
      className={`scroll-mt-24 rounded-3xl border bg-white p-5 shadow-sm md:p-6 ${
        included ? "border-brand-sageDark/40" : "border-brand-sageLight/30"
      } ${compact ? "md:flex md:items-start md:gap-8" : ""}`}
    >
      <div className={compact ? "md:w-64 md:shrink-0" : ""}>
        <h3 className="font-heading text-xl font-semibold text-brand-sageDark">
          {zone.title}
        </h3>
        <p
          className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            included
              ? "bg-brand-sageDark text-white"
              : "bg-brand-wash text-brand-sageDeep"
          }`}
        >
          {travelLabel[zone.travel]}
        </p>
        <p className="mt-3 text-xs font-semibold tracking-wide text-brand-charcoal/60">
          {zone.postcodes.join(" · ")}
        </p>
      </div>
      <ul
        className={`mt-4 flex flex-wrap gap-2 ${compact ? "md:mt-0" : ""}`}
        aria-label={`${zone.title} neighbourhoods`}
      >
        {zone.places.map((place) => {
          const href = pageByArea.get(place);
          const chip =
            "inline-flex min-h-9 items-center rounded-full border px-3 text-sm font-medium";
          return (
            <li key={place}>
              {href ? (
                <Link
                  href={href}
                  className={`${chip} border-brand-sageLight/50 text-brand-sageDark underline-offset-4 transition hover:border-brand-sageDark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageLight`}
                >
                  {place}
                </Link>
              ) : (
                <span className={`${chip} border-brand-line text-brand-charcoal/75`}>
                  {place}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
