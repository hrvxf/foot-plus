import Link from "next/link";
import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import Button from "../../../components/Button";
import CoverageMap from "../../../components/CoverageMap";
import { locationPages, type LocationRegion } from "../../../lib/location-pages";
import {
  bookingHref,
  emailHref,
  phoneDisplay,
  phoneHref,
  SITE_URL,
} from "../../../lib/site";

const canonical = `${SITE_URL}/locations/bristol/areas-we-cover`;

export const metadata: Metadata = {
  title: "Areas We Cover in Bristol | Home Visits",
  description:
    "Explore the Bristol areas covered by Foot+ home visits, including central, north, east and south Bristol. Central Bristol travel is included; surrounding areas may incur a fee confirmed before booking.",
  alternates: { canonical },
  openGraph: {
    url: canonical,
    title: "Areas We Cover in Bristol | Home Visits",
    description:
      "Explore the Bristol areas covered by Foot+ home visits, including central, north, east and south Bristol. Central Bristol travel is included; surrounding areas may incur a fee confirmed before booking.",
  },
  robots: { index: true, follow: true },
};

const regionContent: Record<
  LocationRegion,
  { title: string; description: string }
> = {
  "north-west": {
    title: "North and north-west Bristol",
    description:
      "Home visits across established residential neighbourhoods north and north-west of the city centre.",
  },
  central: {
    title: "Central and inner Bristol",
    description:
      "Home visits across central neighbourhoods and areas close to the Foot+ BS2 base.",
  },
  east: {
    title: "East Bristol",
    description:
      "Home visits in east Bristol neighbourhoods within the current appointment planning area.",
  },
  south: {
    title: "South Bristol",
    description:
      "Home visits across south Bristol neighbourhoods including areas around the river and Wells Road.",
  },
};

const regionOrder: LocationRegion[] = [
  "north-west",
  "central",
  "east",
  "south",
];

const groupedLocations = regionOrder.map((region) => ({
  region,
  ...regionContent[region],
  locations: locationPages.filter((location) => location.region === region),
}));

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${canonical}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Bristol areas covered",
      item: canonical,
    },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${canonical}#covered-areas`,
  name: "Foot+ Bristol home-visit coverage areas",
  itemListElement: locationPages.map((location, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: location.area,
    url: `${SITE_URL}/${location.slug}`,
  })),
};

export default function AreasWeCoverPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-8 md:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-5 text-sm text-brand-charcoal/65"
      >
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

      <section className="overflow-hidden rounded-3xl border border-brand-sageLight/35 bg-linear-to-br from-white via-white to-brand-sageLight/20 p-7 shadow-sm md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark/75">
          Areas We Cover
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">
          Home visits across Bristol
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
          Foot+ provides professional foot care in patients’ homes across
          Bristol. Travel within central Bristol is included; surrounding
          Bristol and farther afield may incur a fee confirmed before booking.
        </p>
        <p className="mt-4 inline-flex items-center rounded-full bg-brand-sageLight/20 px-3 py-1 text-xs font-semibold text-brand-sageDark">
          <MapPin aria-hidden="true" className="mr-1.5 h-4 w-4" />
          Based in central Bristol, BS2
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={bookingHref} variant="solid">
            Book an appointment
          </Button>
          <Button href="/services" variant="outline">
            View services
          </Button>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="coverage-map-heading">
        <div className="mb-5 max-w-3xl">
          <h2
            id="coverage-map-heading"
            className="font-heading text-2xl font-semibold text-brand-sageDark"
          >
            Bristol areas currently covered
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
            Select an area on the map or browse the regional lists below.
          </p>
        </div>
        <CoverageMap locations={locationPages} />
      </section>

      <section className="mt-12" aria-labelledby="browse-area-heading">
        <h2
          id="browse-area-heading"
          className="font-heading text-2xl font-semibold text-brand-sageDark"
        >
          Browse by area
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {groupedLocations.map((group) => (
            <article
              key={group.region}
              className="rounded-3xl border border-brand-sageLight/30 bg-white p-5 shadow-sm md:p-6"
            >
              <MapPin
                aria-hidden="true"
                className="h-5 w-5 text-brand-sageDark/70"
              />
              <h3 className="mt-3 font-heading text-xl font-semibold text-brand-sageDark">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.locations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      className="inline-flex min-h-8 items-center font-semibold text-brand-sageDark underline underline-offset-4 transition hover:text-brand-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageLight"
                      href={`/${location.slug}`}
                    >
                      {location.area}
                      <span aria-hidden="true" className="ml-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-brand-sageLight/30 bg-brand-sageLight/10 p-6 shadow-sm md:p-8">
        <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">
          Not sure whether your postcode is covered?
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
          Foot+ is based in central Bristol and plans home visits across nearby
          areas. Travel within central Bristol is included; surrounding Bristol
          and farther afield may incur a fee. If your neighbourhood is not
          listed, contact Foot+ with your postcode to confirm availability and
          any supplement before booking.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button href={bookingHref} variant="solid">
            Check your postcode
          </Button>
          <Button href={emailHref} variant="outline">
            Email Foot+
          </Button>
        </div>
      </section>

      <section className="mt-12 rounded-3xl bg-brand-sageDark p-7 text-white shadow-sm md:p-9">
        <h2 className="font-heading text-2xl font-semibold">
          Book a home foot care appointment
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80 md:text-base">
          Arrange professional foot and nail care in the comfort of your own
          home.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={bookingHref} variant="primary">
            Book an appointment
          </Button>
          <Button href={phoneHref} variant="secondary">
            Call {phoneDisplay}
          </Button>
        </div>
      </section>
    </main>
  );
}
