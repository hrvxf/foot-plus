import Image from "next/image";
import Link from "next/link";

import StandardsSpotlight from "../about/StandardsSpotlight";
import PostcodeChecker from "../home/PostcodeChecker";
import { type ContactAction } from "./ContactIcons";
import { portraits } from "./blocks";
import MobileActions from "./MobileActions";
import { ContactRow, FaqCards, PriceTickets } from "./statement";
import { focusRing } from "./ui";
import { getAdviceArticle } from "../../lib/advice";
import type { ServiceLocation } from "../../lib/locations";
import { locationPhones } from "../../lib/site";

// Shared layout for the town toenail cutting pages. Each page keeps its own
// metadata, schema and wording (practitioner, areas, FAQs); this only fixes
// the structure, so both stay short and consistent.

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
      <section className="px-6 pb-7 pt-8 text-center md:pt-14" aria-labelledby="nail-heading">
        <nav aria-label="Breadcrumb" className="mb-3.5 text-[0.8125rem] text-brand-muted">
          <ol className="flex justify-center gap-1.5">
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
          className="font-heading text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-charcoal md:text-7xl"
        >
          Toenail cutting in {location.name},
          <br />
          <span className="text-brand-sage">in your own home.</span>
        </h1>
        <p className="mx-auto mt-3 max-w-[36ch] text-[1.0625rem] leading-[1.55] text-brand-muted md:text-lg">{intro}</p>
        <div className="mx-auto mt-6 max-w-sm">
          <Link
            href={bookingHref}
            className={`flex h-[52px] items-center justify-center rounded-full bg-brand-sageDark px-7 font-semibold text-white transition-colors hover:bg-brand-sageDeep ${focusRing}`}
            data-analytics-id={`${analyticsPrefix}-hero-book`}
          >
            Request a visit
          </Link>
          <ContactRow actions={contactActions} />
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-[22px] pb-8 pt-10 text-center md:pt-16" aria-labelledby="included-heading">
        <h2 id="included-heading" className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark">
          What&rsquo;s included
        </h2>
        <StandardsSpotlight standards={included.map((title) => ({ title }))} />
        <p className="mx-auto mt-3 max-w-[40ch] text-[0.84375rem] leading-[1.5] text-brand-muted">
          Painful, infected or suddenly changing nails need your GP first.
        </p>
      </section>

      <PriceTickets />

      <section
        className="mx-[18px] mt-5 flex items-center gap-3.5 rounded-3xl bg-white p-3.5 shadow-[0_0_0_1px_var(--color-brand-line)] sm:mx-auto sm:max-w-md"
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
            {practitioner.role} ({practitioner.credentials.join(", ")}). Insured and DBS checked.
          </p>
          <Link href={aboutHref} className={`mt-1 inline-flex min-h-8 items-center rounded text-[0.8125rem] font-semibold text-brand-sageDeep ${focusRing}`}>
            About {firstName} <span aria-hidden="true">&nbsp;→</span>
          </Link>
        </div>
      </section>

      <section
        className="mx-3.5 mt-6 rounded-3xl bg-white p-5 text-center shadow-[0_18px_40px_-26px_rgba(36,48,40,0.45),0_0_0_1px_var(--color-brand-line)] sm:mx-auto sm:max-w-md"
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

      <FaqCards faqs={faqs} headingId="nail-faq-heading" />

      {guides.length ? (
        <section className="pb-16 pt-10 md:pb-24" aria-labelledby="guides-heading">
          <h2 id="guides-heading" className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark">
            Guides
          </h2>
          <ul className="flex gap-2.5 overflow-x-auto px-[18px] pb-1.5 pt-3.5 [scrollbar-width:none] md:justify-center [&::-webkit-scrollbar]:hidden">
            {guides.map((article) => (
              <li key={article.slug} className="w-[72%] max-w-[300px] shrink-0 md:w-[280px]">
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
    </div>
  );
}
