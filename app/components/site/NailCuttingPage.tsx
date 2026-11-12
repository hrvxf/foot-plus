import Link from "next/link";
import { Check } from "lucide-react";

import PostcodeChecker from "../home/PostcodeChecker";
import ContactIcons, { type ContactAction } from "./ContactIcons";
import { FaqList } from "./blocks";
import MobileActions from "./MobileActions";
import { btnPrimary, container, h2, textLink } from "./ui";
import { getAdviceArticle } from "../../lib/advice";
import type { ServiceLocation } from "../../lib/locations";
import { prices } from "../../lib/site";

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
  aboutHref,
  bookingHref,
  contactActions,
  faqs,
  analyticsPrefix,
}: NailCuttingPageProps) {
  const practitioner = location.practitioner!;
  return (
    <div className="pb-[calc(env(safe-area-inset-bottom)+88px)] md:pb-0">
      <section className="border-b border-brand-line bg-brand-wash">
        <div className={`${container} py-8 md:py-14`}>
          <nav aria-label="Breadcrumb" className="text-sm text-brand-muted">
            <Link href={location.href} className={textLink}>
              {location.displayName}
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Toenail cutting</span>
          </nav>
          <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-14">
            <div>
              <h1 className="font-heading text-4xl font-semibold leading-[1.1] text-brand-sageDeep sm:text-5xl">
                Toenail cutting in {location.name}, in your own home.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-muted">{intro}</p>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <Link href={bookingHref} className={btnPrimary} data-analytics-id={`${analyticsPrefix}-hero-book`}>
                  Request a visit
                </Link>
                <ContactIcons actions={contactActions} />
              </div>
            </div>
            <dl className="rounded-3xl border border-brand-line bg-white p-6">
              {[
                { name: "First visit", detail: "About 60 minutes", price: prices[0].price },
                { name: "Returning visits", detail: "About 45 minutes", price: prices[1].price },
              ].map((row, index) => (
                <div
                  key={row.name}
                  className={`flex items-center justify-between gap-4 ${index ? "mt-4 border-t border-brand-line pt-4" : ""}`}
                >
                  <dt>
                    {row.name} <span className="block text-sm text-brand-muted">{row.detail}</span>
                  </dt>
                  <dd className="font-heading text-2xl font-semibold text-brand-sageDeep">{row.price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className={`${container} py-12 md:py-16`} aria-labelledby="included-heading">
        <h2 id="included-heading" className={h2}>
          What&rsquo;s included
        </h2>
        <ul className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed text-brand-muted">
              <Check className="mt-1 h-5 w-5 shrink-0 text-brand-sage" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-brand-muted">
          Painful, infected or suddenly changing nails need your GP or a podiatrist first.
        </p>
      </section>

      <section className="border-y border-brand-line bg-brand-wash">
        <div className={`${container} grid gap-10 py-12 md:grid-cols-2 md:py-16`}>
          <div>
            <h2 className={h2}>With {practitioner.name}</h2>
            <p className="mt-4 leading-relaxed text-brand-muted">
              {practitioner.role} ({practitioner.credentials.join(", ")}). Insured, DBS checked and using sterilised
              instruments.
            </p>
            <Link href={aboutHref} className={`${textLink} mt-4 inline-block`}>
              About {practitioner.name.split(" ")[0]}
            </Link>
          </div>
          <div>
            <h2 className={h2}>Do we visit you?</h2>
            <p className="mt-4 leading-relaxed text-brand-muted">{coverage}</p>
            <div className="mt-5">
              <PostcodeChecker tone="panel" source={analyticsPrefix} label="Postcode for the visit" />
            </div>
          </div>
        </div>
      </section>

      <section className={`${container} py-12 md:py-16`} aria-labelledby="nail-faq-heading">
        <h2 id="nail-faq-heading" className={h2}>
          Questions
        </h2>
        <FaqList faqs={faqs} className="mt-6" />
        {guides.length ? (
          <p className="mt-8 text-sm leading-relaxed text-brand-muted">
            Guides:{" "}
            {guides.map((article, index) => (
              <span key={article.slug}>
                {index ? " · " : null}
                <Link href={`/advice/${article.slug}`} className={textLink}>
                  {article.shortTitle}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
      </section>

      <MobileActions bookingHref={bookingHref} analyticsId={analyticsPrefix} />
    </div>
  );
}
