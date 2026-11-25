import Image from "next/image";
import Link from "next/link";

import CredentialChips from "../about/CredentialChips";
import StandardsSpotlight from "../about/StandardsSpotlight";
import DesktopActionPill from "./DesktopActionPill";
import PostcodeChecker from "../home/PostcodeChecker";
import { type ContactAction } from "./ContactIcons";
import { portraits } from "./blocks";
import MobileActions from "./MobileActions";
import { ContactRow, FaqCards, PriceTickets } from "./statement";
import { focusRing, texturedGreen } from "./ui";
import { getAdviceArticle } from "../../lib/advice";
import type { ServiceLocation } from "../../lib/locations";
import { locationPhones, prices } from "../../lib/site";

// Shared layout for the town toenail cutting pages. Each page keeps its own
// metadata, schema and wording (practitioner, areas, FAQs); this only fixes
// the structure, so both stay short and consistent.
//
// Desktop (lg+) lays each section out in two columns: heading beside a practitioner photo card, "What's
// included" beside the prices, coverage beside the postcode check, and the questions beside their heading,
// with a floating Request / Call pill once the hero's buttons have scrolled away. Phones are unchanged:
// each desktop-only block is `hidden lg:…` and the phone block it replaces is `lg:hidden`.

const included = [
  "Nails trimmed to a comfortable length and edges filed",
  "Thick or hard nails carefully reduced, where suitable",
  "Feet and nails checked before any care",
  "Advice on footwear and nail care between visits",
];

const guides = [
  "why-toenails-are-difficult-to-cut",
  "how-often-older-adults-should-cut-toenails",
  "thickened-toenails-causes-treatment-and-when-to-worry",
]
  .map(getAdviceArticle)
  .filter((article) => article !== undefined);

export type NailCuttingPageProps = {
  location: ServiceLocation;
  /** One line under the heading. */
  intro: string;
  /** Areas covered, shown beside the postcode checker. */
  coverage: string;
  /** Optional page listing every area covered, linked from the coverage line. */
  areasHref?: string;
  aboutHref: string;
  bookingHref: string;
  contactActions: ContactAction[];
  faqs: { question: string; answer: string }[];
  analyticsPrefix: string;
};

export default function NailCuttingPage({
  location,
  intro,
  coverage,
  areasHref,
  aboutHref,
  bookingHref,
  contactActions,
  faqs,
  analyticsPrefix,
}: NailCuttingPageProps) {
  const practitioner = location.practitioner!;
  const firstName = practitioner.name.split(" ")[0];
  return (
    <div>
      <section
        className="px-6 pb-7 pt-8 text-center md:pt-14 lg:mx-auto lg:grid lg:max-w-[1200px] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-14 lg:px-8 lg:pb-20 lg:pt-16 lg:text-left"
        aria-labelledby="nail-heading"
      >
        <div>
        <nav aria-label="Breadcrumb" className="mb-3.5 text-[0.8125rem] text-brand-muted">
          <ol className="flex justify-center gap-1.5 lg:justify-start">
            <li>
              <Link href={location.href} className={`rounded font-semibold text-brand-sageDeep ${focusRing}`}>
                {location.displayName}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Toenail cutting</li>
          </ol>
        </nav>
        <h1
          id="nail-heading"
          className="font-heading text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-charcoal md:text-7xl lg:text-[3.5rem] xl:text-[4rem]"
        >
          {/* Desktop breaks after "cutting", so both town names fit the heading column. */}
          Toenail cutting <br className="hidden lg:inline" />
          in {location.name},
          <br />
          <span className="text-brand-sage">in your own home.</span>
        </h1>
        <p className="mx-auto mt-3 max-w-[36ch] text-[1.0625rem] leading-[1.55] text-brand-muted md:text-lg lg:mx-0 lg:mt-5 lg:text-[1.1875rem]">{intro}</p>
        <div className="mx-auto mt-6 max-w-sm lg:mx-0 lg:mt-8 lg:flex lg:max-w-none lg:items-start lg:gap-5" data-hero-actions>
          <Link
            href={bookingHref}
            className={`flex h-[52px] items-center justify-center rounded-full bg-brand-sageDark px-7 font-semibold lg:h-14 lg:px-8 text-white transition-colors hover:bg-brand-sageDeep ${focusRing}`}
            data-analytics-id={`${analyticsPrefix}-hero-book`}
          >
            Request a visit
          </Link>
          <ContactRow actions={contactActions} className="lg:mt-0.5 lg:justify-start" />
        </div>
        </div>
        <figure className="hidden overflow-hidden rounded-[28px] bg-white shadow-[0_24px_48px_-32px_rgba(36,48,40,0.35)] lg:block">
          <div className="relative h-[300px] bg-brand-wash">
            <Image
              src={practitioner.imageSrc}
              alt={practitioner.imageAlt}
              fill
              sizes="480px"
              className="object-cover object-[center_20%]"
              priority
            />
          </div>
          <figcaption className="px-7 pb-6 pt-6">
            <p className="font-heading text-[1.375rem] font-semibold tracking-[-0.01em] text-brand-charcoal">With {practitioner.name}</p>
            <p className="mt-1 text-[0.9375rem] leading-[1.5] text-brand-muted">
              {practitioner.role} · Insured and DBS-checked
            </p>
            <CredentialChips credentials={practitioner.credentials} align="start" />
            <Link href={aboutHref} className={`inline-flex min-h-10 items-center rounded text-[0.9375rem] font-semibold text-brand-sageDeep ${focusRing}`}>
              About {firstName} <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </figcaption>
        </figure>
      </section>

      <div className="lg:bg-white lg:py-[88px]">
      <div className="lg:mx-auto lg:grid lg:max-w-[1200px] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-14 lg:px-8">
      <section className="mx-auto max-w-2xl px-[22px] pb-8 pt-10 text-center md:pt-16 lg:mx-0 lg:max-w-none lg:p-0 lg:text-left" aria-labelledby="included-heading">
        <h2 id="included-heading" className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark">
          What&rsquo;s included
        </h2>
        <StandardsSpotlight standards={included.map((title) => ({ title }))} />
        <p className="mx-auto mt-3 max-w-[40ch] text-[0.84375rem] leading-[1.5] text-brand-muted lg:mx-0 lg:mt-5 lg:text-[0.9375rem]">
          Painful, infected or suddenly changing nails need your GP first.
        </p>
      </section>

      <PriceTickets className="lg:hidden" />
      <PricesCard />
      </div>
      </div>

      <section
        className="mx-[18px] mt-5 flex items-center gap-3.5 rounded-3xl bg-white p-3.5 shadow-[0_0_0_1px_var(--color-brand-line)] sm:mx-auto sm:max-w-md lg:hidden"
        aria-labelledby="practitioner-heading"
      >
        <div className="relative h-[74px] w-[74px] shrink-0 overflow-hidden rounded-full bg-brand-wash">
          <Image
            src={portraits[location.slug]}
            alt={practitioner.imageAlt}
            fill
            sizes="74px"
            className="object-cover object-[center_15%]"
          />
        </div>
        <div>
          <h2 id="practitioner-heading" className="font-heading text-lg font-semibold tracking-[-0.01em] text-brand-charcoal">
            With {practitioner.name}
          </h2>
          <p className="mt-0.5 text-[0.8125rem] leading-[1.45] text-brand-muted">
            {practitioner.role} ({practitioner.credentials.join(", ")}). Insured and DBS-checked.
          </p>
          <Link href={aboutHref} className={`mt-1 inline-flex min-h-8 items-center rounded text-[0.8125rem] font-semibold text-brand-sageDeep ${focusRing}`}>
            About {firstName} <span aria-hidden="true">&nbsp;→</span>
          </Link>
        </div>
      </section>

      <section
        className="mx-3.5 mt-6 rounded-3xl bg-white p-5 text-center shadow-[0_18px_40px_-26px_rgba(36,48,40,0.45),0_0_0_1px_var(--color-brand-line)] sm:mx-auto sm:max-w-md lg:hidden"
        aria-label="Do we visit you?"
      >
        <PostcodeChecker
          tone="compact"
          source={analyticsPrefix}
          bookLocation={location.slug}
          title="Do we visit you?"
          label="Postcode for the visit"
          helper={coverage}
        />
        {areasHref ? (
          <Link href={areasHref} className={`mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg font-semibold text-brand-sageDeep ${focusRing}`}>
            See every area we cover in {location.name} <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </section>

      <section
        className="mx-auto hidden max-w-[1200px] grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-center gap-14 px-8 pt-[88px] lg:grid"
        aria-labelledby="nail-visit-heading"
      >
        <div>
          <h2 id="nail-visit-heading" className="font-heading text-5xl font-semibold leading-[1.06] tracking-[-0.02em] text-brand-charcoal">
            Do we visit you?
          </h2>
          <p className="mt-[18px] max-w-[46ch] text-lg leading-[1.6] text-brand-muted">{coverage}</p>
          {areasHref ? (
            <Link href={areasHref} className={`mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-lg font-semibold text-brand-sageDeep ${focusRing}`}>
              See every area we cover in {location.name} <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>
        <div className="rounded-[28px] bg-white p-9 shadow-[0_24px_48px_-32px_rgba(36,48,40,0.35)]">
          <PostcodeChecker tone="compact" source={`${analyticsPrefix}-desktop`} bookLocation={location.slug} label="Postcode for the visit" />
        </div>
      </section>

      <FaqCards faqs={faqs} headingId="nail-faq-heading" split />

      {guides.length ? (
        <section className="pb-16 pt-10 md:pb-24 lg:mx-auto lg:max-w-[1200px] lg:px-8 lg:pt-20" aria-labelledby="guides-heading">
          <h2 id="guides-heading" className="text-center lg:text-left text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark">
            Guides
          </h2>
          <ul className="flex gap-2.5 overflow-x-auto px-[18px] pb-1.5 pt-3.5 [scrollbar-width:none] md:justify-center lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0 lg:pt-[18px] [&::-webkit-scrollbar]:hidden">
            {guides.map((article) => (
              <li key={article.slug} className="w-[72%] max-w-[300px] shrink-0 md:w-[280px] lg:w-auto lg:max-w-none">
                <Link
                  href={`/advice/${article.slug}`}
                  className={`flex h-full flex-col rounded-[22px] bg-brand-wash px-5 pb-[18px] pt-5 transition-colors hover:bg-brand-line ${focusRing}`}
                >
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brand-sage">Guide</span>
                  <span className="mt-2 flex-1 font-heading text-[1.1875rem] font-semibold leading-[1.2] tracking-[-0.01em] text-brand-charcoal">
                    {article.shortTitle}
                  </span>
                  <span className="mt-2.5 text-[0.84375rem] font-semibold text-brand-sageDeep">
                    Read <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className="pb-16" />
      )}

      <MobileActions bookingHref={bookingHref} callHref={locationPhones[location.slug].href} analyticsId={analyticsPrefix} />
      <DesktopActionPill
        firstName={firstName}
        portrait={portraits[location.slug]}
        bookingHref={bookingHref}
        callHref={locationPhones[location.slug].href}
        analyticsId={analyticsPrefix}
      />
    </div>
  );
}

/** Desktop only (lg+): the two visit prices on a green card, beside "What's included". */
function PricesCard() {
  const tickets = [
    { tag: "First visit", price: prices[0].price, detail: "About 60 minutes", tilt: "-rotate-2" },
    { tag: "Returning", price: prices[1].price, detail: "About 45 minutes", tilt: "rotate-2" },
  ];
  return (
    <div className={`hidden rounded-[28px] px-10 py-12 text-center lg:block ${texturedGreen}`}>
      <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-[#A8E6B8]">Prices</h2>
      <div className="mt-4 flex justify-center gap-3.5">
        {tickets.map((ticket) => (
          <div
            key={ticket.tag}
            className={`min-w-[140px] rounded-[18px] bg-white px-[22px] py-[18px] shadow-[0_22px_34px_-18px_rgba(0,0,0,0.45)] ${ticket.tilt}`}
          >
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark">{ticket.tag}</p>
            <p className="mt-1.5 font-heading text-[2.75rem] font-semibold leading-none text-brand-sageDeep">{ticket.price}</p>
            <p className="mt-1.5 text-[0.8125rem] text-brand-muted">{ticket.detail}</p>
          </div>
        ))}
      </div>
      <Link href="/prices" className={`mt-5 inline-flex min-h-11 items-center text-base font-semibold text-white hover:text-[#A8E6B8] ${focusRing}`}>
        Travel and prices <span aria-hidden="true">&nbsp;→</span>
      </Link>
    </div>
  );
}
