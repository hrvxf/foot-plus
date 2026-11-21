import Link from "next/link";
import type { Metadata } from "next";
import PostcodeChecker from "../../../components/home/PostcodeChecker";
import AreaDeck, { type AreaGroup } from "../../../components/areas/AreaDeck";
import { bristolContactActions, ContactGlyph } from "../../../components/site/ContactIcons";
import { focusRing, texturedGreen } from "../../../components/site/ui";
import {
  estimateTravel,
  travelSummary,
} from "../../../lib/travel";
import {
  BRISTOL_BUSINESS_ID,
  phoneDisplay,
  SITE_URL,
 DEFAULT_SOCIAL_IMAGE } from "../../../lib/site";

const canonical = `${SITE_URL}/locations/bristol/areas-we-cover`;
const metaTitle = "Areas We Cover in Bristol | Home Visits";
const metaDescription =
  "Home foot and nail care visits across Bristol, from Clifton and Bishopston to Bedminster, Easton and Westbury-on-Trym. Check your postcode in seconds.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical },
  openGraph: {
    images: [DEFAULT_SOCIAL_IMAGE], url: canonical, title: metaTitle, description: metaDescription },
  twitter: {
    images: [DEFAULT_SOCIAL_IMAGE.url], title: metaTitle, description: metaDescription },
  robots: { index: true, follow: true },
};

type Direction = "Central" | "North" | "East" | "South" | "West";

type Place = { name: string; direction: Direction; lat: number; lng: number };

// Approximate neighbourhood centres. Each place's travel band is worked out with the
// same estimate the postcode checker uses, so the list and the checker always agree.
const placeList: Place[] = [
  { name: "Clifton", direction: "West", lat: 51.4619, lng: -2.619 },
  { name: "Redland", direction: "North", lat: 51.4683, lng: -2.6018 },
  { name: "Cotham", direction: "North", lat: 51.4629, lng: -2.5952 },
  { name: "Bishopston", direction: "North", lat: 51.475, lng: -2.5896 },
  { name: "Henleaze", direction: "North", lat: 51.4893, lng: -2.609 },
  { name: "Westbury-on-Trym", direction: "North", lat: 51.4935, lng: -2.6194 },
  { name: "Stoke Bishop", direction: "North", lat: 51.4779, lng: -2.6347 },
  { name: "Sneyd Park", direction: "North", lat: 51.4789, lng: -2.625 },
  { name: "St Philips", direction: "Central", lat: 51.4524, lng: -2.5701 },
  { name: "Old Market", direction: "Central", lat: 51.4563, lng: -2.5842 },
  { name: "Redcliffe", direction: "Central", lat: 51.4477, lng: -2.5902 },
  { name: "Easton", direction: "East", lat: 51.4613, lng: -2.555 },
  { name: "Barton Hill", direction: "East", lat: 51.4527, lng: -2.56 },
  { name: "Totterdown", direction: "South", lat: 51.4386, lng: -2.5787 },
  { name: "Southville", direction: "South", lat: 51.4446, lng: -2.6063 },
  { name: "Bedminster", direction: "South", lat: 51.4412, lng: -2.6015 },
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

const places = placeList.map((place) => ({
  ...place,
  ...estimateTravel(place.lat, place.lng),
}));

const directionOrder: Direction[] = ["Central", "North", "East", "South", "West"];

const areaTitles: Record<Direction, string> = {
  Central: "Central Bristol",
  North: "North Bristol",
  East: "East Bristol",
  South: "South Bristol",
  West: "West Bristol",
};

const byDistance = (a: { roadMiles: number }, b: { roadMiles: number }) =>
  a.roadMiles - b.roadMiles;

// Areas lead the page. Travel stays in the checker and FAQ, not in the structure.
const areaGroups = [
  ...directionOrder.map((direction) => ({
    id: direction.toLowerCase(),
    title: areaTitles[direction],
    note: undefined as string | undefined,
    places: places
      .filter((place) => place.direction === direction && place.band !== "extended")
      .sort(byDistance),
  })),
  {
    id: "nearby-towns",
    title: "Nearby towns",
    note: "By arrangement",
    places: places.filter((place) => place.band === "extended").sort(byDistance),
  },
].filter((group) => group.places.length);

// What the cards need: two-line headings ("North / Bristol.") and plain place names.
const deckGroups: AreaGroup[] = areaGroups.map((group) => ({
  id: group.id,
  short: group.id === "nearby-towns" ? "Nearby towns" : group.title.replace(" Bristol", ""),
  lines: group.id === "nearby-towns" ? ["Nearby", "towns."] : [group.title.replace(" Bristol", ""), "Bristol."],
  note: group.note ? `${group.note}. Just ask.` : undefined,
  places: group.places.map((place) => place.name),
}));

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

const contactLabels = { phone: "Call", whatsapp: "WhatsApp", email: "Email" } as const;

export default function AreasWeCoverPage() {
  return (
    <main className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="px-6 pb-6 pt-8 text-center md:pt-14" aria-labelledby="areas-page-heading">
        <nav aria-label="Breadcrumb" className="mb-3.5 text-[0.8125rem] text-brand-muted">
          <ol className="flex justify-center gap-1.5">
            <li>
              <Link href="/locations/bristol" className={`rounded font-semibold text-brand-sageDeep ${focusRing}`}>
                Foot+ Bristol
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Areas we cover</li>
          </ol>
        </nav>
        <h1
          id="areas-page-heading"
          className="font-heading text-[2.625rem] font-bold leading-[1.04] tracking-[-0.03em] text-brand-charcoal md:text-7xl"
        >
          Home visits
          <br />
          <span className="text-brand-sage">across Bristol.</span>
        </h1>
      </section>

      <div className="mx-3.5 max-w-md rounded-3xl bg-white p-5 shadow-[0_18px_40px_-26px_rgba(36,48,40,0.45),0_0_0_1px_var(--color-brand-line)] sm:mx-auto">
        <PostcodeChecker
          tone="compact"
          source="areas"
          bookLocation="bristol"
          title="Do we visit you?"
          label="Postcode for the visit"
          helper="Or find your area below."
        />
      </div>

      <AreaDeck groups={deckGroups} />

      <section className="mx-auto max-w-2xl px-4 pt-10 md:pt-16" aria-labelledby="faq-heading">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark">Good to know</p>
        <h2
          id="faq-heading"
          className="mt-2.5 text-center font-heading text-[2rem] font-bold leading-[1.06] tracking-[-0.025em] text-brand-charcoal md:text-5xl"
        >
          Coverage <span className="text-brand-sage">questions.</span>
        </h2>
        <div className="mt-6 flex flex-col gap-2.5">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-[22px] bg-white shadow-[0_0_0_1px_var(--color-brand-line)] [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className={`flex cursor-pointer list-none items-center justify-between gap-3.5 rounded-[22px] px-5 py-[18px] font-semibold text-brand-charcoal ${focusRing}`}>
                {faq.question}
                <span
                  aria-hidden="true"
                  className="relative h-[30px] w-[30px] shrink-0 rounded-full bg-brand-wash transition-[transform,background-color] duration-500 before:absolute before:left-1/2 before:top-1/2 before:h-0.5 before:w-[11px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded before:bg-brand-sageDeep after:absolute after:left-1/2 after:top-1/2 after:h-0.5 after:w-[11px] after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-90 after:rounded after:bg-brand-sageDeep group-open:rotate-45 group-open:bg-brand-sageDark group-open:before:bg-white group-open:after:bg-white"
                />
              </summary>
              <p className="px-5 pb-[18px] text-[0.9375rem] leading-[1.55] text-brand-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        className={`${texturedGreen} mx-3.5 mt-10 rounded-[28px] px-[22px] pb-8 pt-11 text-center md:mx-auto md:max-w-2xl md:py-14`}
        aria-labelledby="ask-heading"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageLight">Not sure?</p>
        <h2 id="ask-heading" className="mt-3 font-heading text-[2rem] font-bold leading-[1.06] tracking-[-0.02em] md:text-5xl">
          Just ask
          <br />
          <span className="text-brand-sageLight">Adam.</span>
        </h2>
        <Link
          href="/book?location=bristol"
          className={`mx-auto mt-6 flex h-[52px] max-w-sm items-center justify-center rounded-full bg-brand-offwhite px-7 font-semibold text-brand-sageDeep transition-colors hover:bg-white ${focusRing}`}
          data-analytics-id="areas-close-book"
        >
          Request a visit
        </Link>
        <ul className="mt-4 flex justify-center gap-5">
          {bristolContactActions({ analyticsPrefix: "areas-close" }).map((action) => (
            <li key={action.kind}>
              <a
                href={action.href}
                aria-label={action.label}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                data-analytics-id={action.analyticsId}
                className="group flex flex-col items-center gap-1.5 rounded-xl focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white/12 transition-colors group-hover:bg-white/20">
                  <ContactGlyph kind={action.kind} className="h-[19px] w-[19px]" />
                </span>
                <span aria-hidden="true" className="text-[0.71875rem] text-white/75">
                  {contactLabels[action.kind]}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
