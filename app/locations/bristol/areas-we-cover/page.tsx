import Link from "next/link";
import type { Metadata } from "next";
import { Check, Info, Mail, MapPin, Phone } from "lucide-react";
import Button from "../../../components/Button";
import PostcodeChecker from "../../../components/home/PostcodeChecker";
import { locationPages, type LocationRegion } from "../../../lib/location-pages";
import {
  estimateTravel,
  travelBands,
  travelSummary,
  type TravelBand,
} from "../../../lib/travel";
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
  "Check whether Foot+ visits your Bristol postcode and what travel costs. Free travel within 2 miles of our BS2 base, £5 across most of Bristol.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical },
  openGraph: { url: canonical, title: metaTitle, description: metaDescription },
  twitter: { title: metaTitle, description: metaDescription },
  robots: { index: true, follow: true },
};

type Direction = "Central" | "North" | "East" | "South" | "West";

type Place = { name: string; direction: Direction; lat: number; lng: number };

// Approximate neighbourhood centres. Each place's travel band is worked out with the
// same estimate the postcode checker uses, so the list and the checker always agree.
const extraPlaces: Place[] = [
  { name: "City Centre", direction: "Central", lat: 51.4545, lng: -2.597 },
  { name: "Harbourside", direction: "Central", lat: 51.449, lng: -2.6 },
  { name: "Lawrence Hill", direction: "East", lat: 51.458, lng: -2.57 },
  { name: "St Pauls", direction: "North", lat: 51.463, lng: -2.581 },
  { name: "Stokes Croft", direction: "North", lat: 51.464, lng: -2.59 },
  { name: "Kingsdown", direction: "North", lat: 51.461, lng: -2.594 },
  { name: "Montpelier", direction: "North", lat: 51.468, lng: -2.588 },
  { name: "St Werburghs", direction: "North", lat: 51.469, lng: -2.577 },
  { name: "Redfield", direction: "East", lat: 51.459, lng: -2.559 },
  { name: "St Annes", direction: "East", lat: 51.448, lng: -2.553 },
  { name: "Windmill Hill", direction: "South", lat: 51.439, lng: -2.589 },
  { name: "Hotwells", direction: "West", lat: 51.4495, lng: -2.6185 },
  { name: "St George", direction: "East", lat: 51.46, lng: -2.545 },
  { name: "Eastville", direction: "East", lat: 51.472, lng: -2.56 },
  { name: "Knowle", direction: "South", lat: 51.432, lng: -2.57 },
  { name: "Brislington", direction: "South", lat: 51.433, lng: -2.548 },
  { name: "Horfield", direction: "North", lat: 51.488, lng: -2.585 },
  { name: "Ashley Down", direction: "North", lat: 51.48, lng: -2.585 },
  { name: "Lockleaze", direction: "North", lat: 51.488, lng: -2.562 },
  { name: "Southmead", direction: "North", lat: 51.497, lng: -2.596 },
  { name: "Filton", direction: "North", lat: 51.505, lng: -2.577 },
  { name: "Henbury", direction: "North", lat: 51.507, lng: -2.627 },
  { name: "Fishponds", direction: "East", lat: 51.481, lng: -2.527 },
  { name: "Kingswood", direction: "East", lat: 51.456, lng: -2.505 },
  { name: "Downend", direction: "East", lat: 51.487, lng: -2.496 },
  { name: "Stoke Gifford", direction: "North", lat: 51.516, lng: -2.545 },
  { name: "Bedminster Down", direction: "South", lat: 51.427, lng: -2.611 },
  { name: "Bishopsworth", direction: "South", lat: 51.417, lng: -2.617 },
  { name: "Hengrove", direction: "South", lat: 51.414, lng: -2.582 },
  { name: "Keynsham", direction: "South", lat: 51.4135, lng: -2.498 },
  { name: "Long Ashton", direction: "West", lat: 51.43, lng: -2.655 },
  { name: "Portishead", direction: "West", lat: 51.484, lng: -2.766 },
  { name: "Nailsea", direction: "West", lat: 51.43, lng: -2.758 },
  { name: "Clevedon", direction: "West", lat: 51.442, lng: -2.854 },
  { name: "Thornbury", direction: "North", lat: 51.609, lng: -2.524 },
  { name: "Yate", direction: "East", lat: 51.54, lng: -2.411 },
];

const regionDirection: Record<LocationRegion, Direction> = {
  "north-west": "North",
  central: "Central",
  east: "East",
  south: "South",
};

const pagePlaces: Place[] = locationPages.map((page) => ({
  name: page.area,
  // Clifton, Redland and Cotham sit north-west of the centre rather than in it.
  direction: ["Clifton"].includes(page.area)
    ? "West"
    : ["Redland", "Cotham"].includes(page.area)
      ? "North"
      : regionDirection[page.region],
  lat: page.mapCoordinates.lat,
  lng: page.mapCoordinates.lng,
}));

const places = [...pagePlaces, ...extraPlaces].map((place) => ({
  ...place,
  ...estimateTravel(place.lat, place.lng),
}));

const bandOrder: TravelBand[] = ["free", "standard", "extended"];
const directionOrder: Direction[] = ["Central", "North", "East", "South", "West"];

const bands = bandOrder.map((band) => {
  const inBand = places
    .filter((place) => place.band === band)
    .sort((a, b) => a.roadMiles - b.roadMiles);
  return {
    band,
    ...travelBands[band],
    groups: directionOrder
      .map((direction) => ({
        direction,
        places: inBand.filter((place) => place.direction === direction),
      }))
      .filter((group) => group.places.length),
  };
});

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
      `${travelSummary} Distances are by road, so the checker gives you an estimate for your exact postcode.`,
  },
  {
    question: "My area isn't listed. Can you still visit?",
    answer: `Probably. The list is a guide, not a limit. Check your postcode above, or call ${phoneDisplay} or email Foot+ and we'll let you know.`,
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
      areaServed: places
        .filter((place) => place.band !== "extended")
        .map((place) => ({ "@type": "Place", name: place.name })),
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

      {/* Hero: the question people arrive with, answered straight away */}
      <section className="grid gap-8 rounded-3xl border border-brand-sageLight/35 bg-linear-to-br from-white via-white to-brand-sageLight/20 p-6 shadow-sm md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:items-center lg:gap-12">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-brand-sageDark md:text-[2.6rem] md:leading-tight">
            Home visits across Bristol
          </h1>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-brand-charcoal/75">
            Foot+ comes to you for routine foot and nail care. Check your
            postcode to see if we visit and what travel costs.
          </p>
          <p className="mt-4 inline-flex items-center text-sm font-semibold text-brand-sageDark">
            <MapPin aria-hidden="true" className="mr-1.5 h-4 w-4" />
            Based in central Bristol, BS2
          </p>
          <nav aria-label="Jump to an area" className="mt-6 hidden border-t border-brand-line pt-5 lg:block">
            <ul className="flex flex-wrap gap-2">
              {bands.map((band) => (
                <li key={band.band}>
                  <a
                    href={`#${band.band}`}
                    className="inline-flex min-h-9 items-center rounded-full bg-white px-3.5 text-sm font-semibold text-brand-sageDark ring-1 ring-brand-line transition hover:ring-brand-sageDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageLight"
                  >
                    {band.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <PostcodeChecker source="areas" label="Check your postcode" />
      </section>

      {/* Zones: one scannable list, so sparse zones don't leave empty cards */}
      <section className="mt-14" aria-labelledby="zones-heading">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
          <h2
            id="zones-heading"
            className="font-heading text-2xl font-semibold text-brand-sageDark"
          >
            Where we visit
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-brand-charcoal/70">
            Travel is charged by road distance from our BS2 base. Areas are
            grouped by their centre, so check your postcode for your exact fee.
          </p>
        </div>

        <div className="mt-6 divide-y divide-brand-line overflow-hidden rounded-3xl border border-brand-sageLight/30 bg-white shadow-sm">
          {bands.map((band) => (
            <BandRow key={band.band} band={band} />
          ))}
        </div>
      </section>

      {/* Questions beside a persistent contact card, rather than two stacked full-width blocks */}
      <section
        className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start"
        aria-labelledby="faq-heading"
      >
        <div>
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
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl bg-brand-sageDark p-6 text-white shadow-sm lg:sticky lg:top-24 lg:mt-12">
          <h2 className="font-heading text-xl font-semibold">Ready to book?</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            Professional foot and nail care in your own home. Not sure about
            your area? Just ask.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <Button href="/book?location=bristol" variant="primary">
              Book an appointment
            </Button>
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              {phoneDisplay}
            </a>
            <a
              href={emailHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              Email Foot+
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}

type Band = (typeof bands)[number];

function BandRow({ band }: { band: Band }) {
  const free = band.band === "free";
  const StatusIcon = free ? Check : Info;

  return (
    <article
      id={band.band}
      className={`grid scroll-mt-24 gap-4 p-5 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8 md:p-6 ${
        free ? "bg-brand-wash/60" : ""
      }`}
    >
      <div>
        <h3 className="flex items-baseline gap-2 font-heading text-lg font-semibold text-brand-sageDark">
          {band.label}
        </h3>
        <p
          className={`mt-1 inline-flex items-center gap-1.5 text-sm ${
            free ? "font-semibold text-brand-sageDeep" : "text-brand-charcoal/70"
          }`}
        >
          <StatusIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
          {band.range}
        </p>
      </div>
      <div className="space-y-3">
        {band.groups.map((group) => (
          <div
            key={group.direction}
            className="grid gap-2 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:items-start"
          >
            <p className="pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-charcoal/50">
              {group.direction}
            </p>
            <ul className="flex flex-wrap gap-2" aria-label={`${band.label}: ${group.direction}`}>
              {group.places.map((place) => {
                const href = pageByArea.get(place.name);
                const chip =
                  "inline-flex min-h-9 items-center rounded-full border bg-white px-3 text-sm";
                return (
                  <li key={place.name}>
                    {href ? (
                      <Link
                        href={href}
                        className={`${chip} border-brand-sageLight/60 font-semibold text-brand-sageDark transition hover:border-brand-sageDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageLight`}
                      >
                        {place.name}
                      </Link>
                    ) : (
                      <span className={`${chip} border-brand-line text-brand-charcoal/75`}>
                        {place.name}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}
