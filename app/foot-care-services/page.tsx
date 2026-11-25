import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import MobileActions from "../components/site/MobileActions";
import AudienceSwitch from "../components/services/AudienceSwitch";
import ServiceDeck from "../components/services/ServiceDeck";
import ServiceSpotlight from "../components/services/ServiceSpotlight";
import { portraits } from "../components/site/blocks";
import { focusRing, texturedGreen } from "../components/site/ui";
import { serviceLocations } from "../lib/locations";
import { referOnSigns, serviceDetails, whoWeHelp } from "../lib/services";
import { BUSINESS_ID, prices, SITE_URL, DEFAULT_SOCIAL_IMAGE } from "../lib/site";

const PAGE_URL = `${SITE_URL}/foot-care-services`;
const TITLE = "Foot Care Services at Home: Nails, Corns & Hard Skin | Foot+";
const DESCRIPTION =
  "We come to you. Toenail cutting, thickened nails, corns, hard skin and diabetic foot care in your own home, across Bristol and Southampton.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [DEFAULT_SOCIAL_IMAGE], url: PAGE_URL, title: TITLE, description: DESCRIPTION },
  twitter: {
    images: [DEFAULT_SOCIAL_IMAGE.url], title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

const areaServed = [
  { "@type": "City", name: "Bristol" },
  { "@type": "City", name: "Southampton" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@type": "WebSite", name: "Foot+", url: `${SITE_URL}/` },
      about: { "@id": BUSINESS_ID },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: PAGE_URL },
      ],
    },
    ...serviceDetails.map((service) => ({
      "@type": "Service",
      "@id": `${PAGE_URL}#${service.id}`,
      name: service.title,
      serviceType: service.title,
      description: service.summary,
      areaServed,
      provider: { "@id": BUSINESS_ID },
      url: `${PAGE_URL}#${service.id}`,
      offers: {
        "@type": "Offer",
        priceCurrency: "GBP",
        price: prices[1].price.replace(/[^0-9.]/g, ""),
        description: "Returning-patient routine home visit. Any travel charge is confirmed before booking.",
        url: `${SITE_URL}/prices`,
      },
    })),
  ],
};

// Page type (Nov 2026 redesign): centred, two-tone Poppins headlines, green cards.
// Desktop (lg+): the treatments become a spotlight list with a green summary card (ServiceSpotlight),
// the two green cards sit side by side, and "When we'll point you elsewhere" and "Choose your area" split
// into two columns. Phones are unchanged.
const eyebrow = "text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark";
const headline = "font-heading font-bold tracking-[-0.025em] text-brand-charcoal";
const greenCard = `${texturedGreen} mx-3.5 rounded-[28px] px-6 py-11 text-center md:mx-auto md:max-w-[1100px] md:py-16 lg:mx-0 lg:max-w-none lg:px-11 lg:py-12 lg:text-left`;
const arrowLink = `inline-flex min-h-11 items-center gap-1.5 rounded-lg font-semibold text-brand-sageDeep ${focusRing}`;

const healthCheck = serviceDetails.find((service) => service.group === "check");

const areas = [
  { location: serviceLocations.bristol, href: "/locations/bristol" },
  { location: serviceLocations.southampton, href: "/locations/southampton" },
];

export default function ServicesPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <AudienceSwitch />
      <Hero />
      <div className="lg:mx-auto lg:grid lg:max-w-[1200px] lg:grid-cols-2 lg:gap-4 lg:px-8 lg:pt-[88px]">
        <EveryVisit />
        <WhoFor />
      </div>
      <Scope />
      <ChooseArea />
      <MobileActions analyticsId="services" />
    </div>
  );
}

function Hero() {
  return (
    <section aria-labelledby="services-heading" className="pt-7 md:pt-12 lg:pt-14">
      <div className="px-6 text-center">
        <h1
          id="services-heading"
          className={`${headline} mb-7 text-[2.75rem] leading-[1.04] md:text-7xl lg:mb-16 lg:text-[4rem] xl:text-[5rem]`}
        >
          Foot care,{" "}
          {/* One line on desktop. */}
          <br className="lg:hidden" />
          <span className="text-brand-sage">in your own chair.</span>
        </h1>
      </div>
      <div className="lg:hidden">
        <ServiceDeck services={serviceDetails} />
      </div>
      <ServiceSpotlight services={serviceDetails} />
    </section>
  );
}

function EveryVisit() {
  if (!healthCheck) return null;
  return (
    <section id={healthCheck.id} className={`${greenCard} scroll-mt-24`} aria-labelledby={`${healthCheck.id}-title`}>
      <span className="pointer-events-none absolute left-4 top-3.5 font-heading text-3xl font-semibold text-brand-sageLight/50" aria-hidden="true">+</span>
      <span className="pointer-events-none absolute bottom-4 right-[18px] font-heading text-[2.75rem] font-semibold leading-none text-brand-sageLight/60" aria-hidden="true">+</span>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageLight">Every visit</p>
      <h2 id={`${healthCheck.id}-title`} className="mt-3 font-heading text-[1.875rem] font-bold leading-[1.08] tracking-[-0.02em] md:text-5xl lg:text-[2.5rem]">
        A foot-health check,
        <br />
        <span className="text-brand-sageLight">every time.</span>
      </h2>
      <p className="mx-auto mt-3 max-w-[40ch] leading-[1.55] text-white/85 lg:mx-0 lg:mt-4 lg:text-[1.0625rem]">{healthCheck.summary}</p>
    </section>
  );
}

function WhoFor() {
  // whoWeHelp[1] ("Anyone who finds reaching their feet difficult") is the headline.
  const groups = [whoWeHelp[0], whoWeHelp[2]];
  return (
    <section className={`${greenCard} mt-3 lg:mt-0`} aria-labelledby="who-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageLight">Who it&rsquo;s for</p>
      <h2 id="who-heading" className="mt-3 font-heading text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] md:text-5xl lg:text-[2.5rem]">
        Anyone who finds
        <br />
        <span className="text-brand-sageLight">reaching their feet hard.</span>
      </h2>
      <ul className="mx-auto mt-6 flex max-w-md flex-col gap-2 lg:mx-0 lg:mt-5 lg:items-start">
        {groups.map((group) => (
          <li key={group} className="rounded-full bg-white/10 px-4 py-3 text-[0.9375rem] leading-snug lg:py-2">
            {group}
          </li>
        ))}
      </ul>
      <p className="mt-6 leading-[1.5] text-white/85 lg:mt-5">Need extra time or someone with you? Just tell us.</p>
      <Link
        href="/advice/foot-care-visits-learning-disabilities-carers-guide"
        className="mt-1 inline-flex min-h-11 items-center gap-1.5 rounded-lg font-semibold text-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Accessible foot care guide <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

function Scope() {
  return (
    <section
      className="mx-auto max-w-xl px-5 pb-5 pt-14 text-center md:pt-20 lg:grid lg:max-w-[1200px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14 lg:px-8 lg:pb-0 lg:pt-24 lg:text-left"
      aria-labelledby="scope-heading"
    >
      <div>
      <p className={eyebrow}>Good to know</p>
      <h2 id="scope-heading" className={`${headline} mt-2.5 text-[2.125rem] leading-[1.06] md:text-5xl`}>
        When we&rsquo;ll point you <span className="text-brand-sage">elsewhere.</span>
      </h2>
      <p className="mt-3.5 leading-[1.55] text-brand-muted lg:mt-4 lg:text-[1.0625rem]">
        We provide routine foot care at home. We don&rsquo;t diagnose conditions or give emergency care, and if
        something needs your GP or urgent care, we&rsquo;ll tell you.
      </p>
      </div>
      {/* A safety notice: kept in full, with its own amber marker so it doesn't read like the rest. */}
      <div className="mt-6 rounded-3xl bg-white p-[22px] pb-4 text-left shadow-[0_0_0_1px_var(--color-brand-line)] lg:mt-0 lg:rounded-[26px] lg:px-[30px] lg:py-[26px]">
        <h3 className="flex items-center gap-2.5 font-heading text-[1.0625rem] font-semibold text-brand-charcoal">
          <span className="h-2.5 w-2.5 rounded-full bg-[#B08A3E]" aria-hidden="true" />
          Seek medical advice first for
        </h3>
        <ul className="mt-3">
          {referOnSigns.map((sign) => (
            <li key={sign} className="border-t border-brand-line py-2.5 text-[0.9375rem] leading-[1.45] text-brand-muted lg:py-3 lg:text-base">
              {sign}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ChooseArea() {
  return (
    <section
      className="mx-auto max-w-xl px-[18px] pb-14 pt-12 text-center md:pb-[4.5rem] lg:grid lg:max-w-[1200px] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-x-14 lg:px-8 lg:pb-24 lg:pt-24 lg:text-left"
      aria-labelledby="area-heading"
    >
      <div className="lg:self-end">
      <p className={eyebrow}>Who&rsquo;s visiting?</p>
      <h2 id="area-heading" className={`${headline} mt-2.5 text-[2.125rem] leading-[1.06] md:text-5xl`}>
        Choose your <span className="text-brand-sage">area.</span>
      </h2>
      </div>
      <div className="mt-6 flex gap-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:gap-4">
        {areas.map(({ location, href }) => (
          <Link
            key={location.slug}
            href={href}
            className={`group flex-1 rounded-3xl bg-white px-2.5 py-[18px] shadow-[0_0_0_1px_var(--color-brand-line)] transition-shadow hover:shadow-[0_0_0_1.5px_var(--color-brand-sage)] lg:flex lg:items-center lg:gap-5 lg:rounded-[26px] lg:p-[18px] ${focusRing}`}
          >
            <Image
              src={portraits[location.slug]}
              alt=""
              width={176}
              height={176}
              className="hidden h-[72px] w-[72px] shrink-0 rounded-full object-cover object-[center_15%] lg:block"
            />
            <span className="lg:min-w-0 lg:flex-1">
              <span className="block font-heading text-xl font-semibold text-brand-charcoal lg:text-2xl">{location.name}</span>
              <span className="text-[0.8125rem] text-brand-muted lg:text-base">with {location.practitioner?.name.split(" ")[0]}</span>
            </span>
            <span
              aria-hidden="true"
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-wash text-xl text-brand-sageDeep transition-colors group-hover:bg-brand-line lg:flex"
            >
              →
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-6 lg:col-start-1 lg:row-start-2 lg:mt-2 lg:self-start">
        <Link href="/prices" className={arrowLink}>
          See prices <span aria-hidden="true">→</span>
        </Link>
      </p>
    </section>
  );
}
