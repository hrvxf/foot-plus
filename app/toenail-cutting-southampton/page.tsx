import type { Metadata } from "next";
import Link from "next/link";
import { Check, Scissors } from "lucide-react";

import PostcodeChecker from "../components/home/PostcodeChecker";
import ContactIcons from "../components/site/ContactIcons";
import { ClosingBand, FaqList } from "../components/site/blocks";
import MobileActions from "../components/site/MobileActions";
import { btnPrimary, container, eyebrow, h2, textLink } from "../components/site/ui";
import { getAdviceArticle } from "../lib/advice";
import { serviceLocations } from "../lib/locations";
import { locationEmails, phoneDisplay, phoneHref, prices, SITE_URL } from "../lib/site";
import { southamptonTravelSummary } from "../lib/travel";

// Southampton counterpart of /toenail-cutting-bristol. Keep it specific to
// Southampton (practitioner, coverage, travel base) rather than a copy of the
// Bristol page with the town swapped, so the two don't read as duplicates.

const canonical = `${SITE_URL}/toenail-cutting-southampton`;
const SOUTHAMPTON_BUSINESS_ID = `${SITE_URL}/locations/southampton#medicalbusiness`;
const title = "Toenail Cutting at Home in Southampton | Foot+";
const description = `Toenail cutting at home in Southampton, Romsey, Chandler's Ford and Totton with Katie Preston, Foot Health Practitioner. First visit ${prices[0].price}; returning visits ${prices[1].price}.`;
const bookingHref = "/book?location=southampton&service=nails";

const socialImage = {
  url: "/images/social-card.png",
  width: 1200,
  height: 630,
  alt: "Foot+ professional home-visit foot care",
};

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { type: "website", siteName: "Foot+", url: canonical, title, description, images: [socialImage] },
  twitter: { card: "summary_large_image", title, description, images: [socialImage.url] },
  robots: { index: true, follow: true },
};

const included = [
  "A chat about your nails, health and anything that makes cutting them hard",
  "Nails trimmed to a comfortable length and rough edges filed",
  "Thick or hard nails carefully reduced, where suitable",
  "Simple advice on footwear and looking after your nails between visits",
];

const faqs = [
  {
    question: "Which parts of Southampton do you visit?",
    answer: `${serviceLocations.southampton.coverage} Check your postcode on this page to see whether we visit you and any travel fee.`,
  },
  {
    question: "Who will cut my toenails?",
    answer:
      "Katie Preston, a diploma-trained Foot Health Practitioner (MCFHP, MAFHP) who runs Foot+ Southampton. She is insured and DBS checked, and uses sterilised instruments.",
  },
  {
    question: "How much does it cost?",
    answer: `A first visit is ${prices[0].price} and takes about 60 minutes. Returning visits are ${prices[1].price} and take about 45 minutes. There is no separate nail-only price. ${southamptonTravelSummary}`,
  },
  {
    question: "Can I book for a parent or someone I care for?",
    answer:
      "Yes. A relative, carer or support worker can arrange the visit and be there, with the agreement of the person receiving care.",
  },
  {
    question: "Is this a pedicure or a podiatry appointment?",
    answer:
      "Neither. It is routine nail and foot care from a qualified Foot Health Practitioner, not a cosmetic pedicure or an appointment with an HCPC-registered podiatrist. Katie will tell you if something needs a podiatrist or your GP.",
  },
];

const advice = [
  "why-toenails-are-difficult-to-cut",
  "how-often-older-adults-should-cut-toenails",
  "thickened-toenails-causes-treatment-and-when-to-worry",
]
  .map(getAdviceArticle)
  .filter((article) => article !== undefined);

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Toenail cutting at home in Southampton",
      serviceType: "Routine toenail cutting and nail care",
      description,
      url: canonical,
      areaServed: { "@type": "City", name: "Southampton" },
      provider: { "@id": SOUTHAMPTON_BUSINESS_ID },
      offers: prices.map((price, index) => ({
        "@type": "Offer",
        name: price.name,
        price: price.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "GBP",
        url: `${SITE_URL}/prices`,
        description: `${index === 0 ? "First" : "Returning patient"} home-visit appointment. Any travel fee is confirmed before booking.`,
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      name: title,
      url: canonical,
      description,
      mainEntity: { "@id": `${canonical}#service` },
      about: { "@id": SOUTHAMPTON_BUSINESS_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Foot+ Southampton", item: `${SITE_URL}/locations/southampton` },
        { "@type": "ListItem", position: 2, name: "Toenail cutting", item: canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function ToenailCuttingSouthamptonPage() {
  const katie = serviceLocations.southampton.practitioner!;
  return (
    <div className="pb-[calc(env(safe-area-inset-bottom)+88px)] md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="border-b border-brand-line bg-brand-wash">
        <div className={`${container} py-8 md:py-14`}>
          <nav aria-label="Breadcrumb" className="text-sm text-brand-muted">
            <Link href="/locations/southampton" className={textLink}>
              Foot+ Southampton
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Toenail cutting</span>
          </nav>
          <div className="mt-10 grid gap-9 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-14">
            <div>
              <p className={eyebrow}>Home visits · Southampton</p>
              <h1 className="mt-3 font-heading text-4xl font-semibold leading-[1.1] text-brand-sageDeep sm:text-5xl">
                Toenail cutting in Southampton, in your own home.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-muted">
                {katie.name} visits you at home to cut, file and thin difficult toenails.
              </p>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <Link href={bookingHref} className={btnPrimary} data-analytics-id="nails-soton-hero-book">
                  Request a nail-care visit
                </Link>
                <ContactIcons
                  actions={[
                    { kind: "phone", href: phoneHref, label: `Call Foot+ on ${phoneDisplay}`, analyticsId: "nails-soton-hero-phone" },
                    { kind: "email", href: locationEmails.southampton.href, label: locationEmails.southampton.label, analyticsId: "nails-soton-hero-email" },
                  ]}
                />
              </div>
            </div>
            <aside className="rounded-3xl border border-brand-line bg-white p-7">
              <Scissors className="h-8 w-8 text-brand-sage" aria-hidden="true" />
              <dl className="mt-4 space-y-4">
                <div className="flex justify-between gap-4">
                  <dt>
                    First visit <span className="block text-sm text-brand-muted">About 60 minutes</span>
                  </dt>
                  <dd className="font-heading text-2xl font-semibold text-brand-sageDeep">{prices[0].price}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-brand-line pt-4">
                  <dt>
                    Returning patients <span className="block text-sm text-brand-muted">About 45 minutes</span>
                  </dt>
                  <dd className="font-heading text-2xl font-semibold text-brand-sageDeep">{prices[1].price}</dd>
                </div>
              </dl>
              <Link href="/prices" className={`${textLink} mt-5 inline-block`}>
                Full prices
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className={`${container} py-12 md:py-16`} aria-labelledby="soton-included-heading">
        <h2 id="soton-included-heading" className={h2}>
          What the visit includes
        </h2>
        <ul className="mt-7 grid gap-4 md:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="flex gap-3 rounded-2xl border border-brand-line p-5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-sage" aria-hidden="true" />
              <span className="leading-relaxed text-brand-muted">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl leading-relaxed text-brand-muted">
          Painful, infected or suddenly changing nails, or acute diabetic foot concerns, need your GP or a podiatrist
          first.
        </p>
      </section>

      <section className="border-y border-brand-line bg-brand-wash">
        <div className={`${container} grid gap-10 py-12 md:grid-cols-2 md:py-16`}>
          <div>
            <p className={eyebrow}>Your Southampton practitioner</p>
            <h2 className={`${h2} mt-3`}>Nail care with {katie.name}</h2>
            <p className="mt-4 leading-relaxed text-brand-muted">
              {katie.role} ({katie.credentials.join(", ")}). Insured, DBS checked and using sterilised instruments.
            </p>
            <Link href="/about#katie-preston" className={`${textLink} mt-5 inline-block`}>
              About Katie
            </Link>
          </div>
          <div>
            <h2 className={h2}>Do we visit you?</h2>
            <p className="mt-4 leading-relaxed text-brand-muted">{serviceLocations.southampton.coverage}</p>
            <div className="mt-5">
              <PostcodeChecker tone="panel" source="nails-southampton" label="Postcode for the visit" />
            </div>
          </div>
        </div>
      </section>

      <section className={`${container} py-12 md:py-16`} aria-labelledby="soton-faq-heading">
        <h2 id="soton-faq-heading" className={h2}>
          Questions
        </h2>
        <FaqList faqs={faqs} className="mt-7" />
      </section>

      {advice.length ? (
        <section className={`${container} pb-12 md:pb-16`} aria-labelledby="soton-guides-heading">
          <h2 id="soton-guides-heading" className={h2}>
            Nail-care guides
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {advice.map((article) => (
              <li key={article.slug} className="rounded-2xl border border-brand-line p-5">
                <Link href={`/advice/${article.slug}`} className={textLink}>
                  {article.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ClosingBand
        id="soton-nails-closing"
        heading="Request a nail-care visit in Southampton"
        text="Tell us your postcode and what you need help with. We'll confirm coverage and a time."
        action={{ label: "Request a visit", href: bookingHref, analyticsId: "nails-soton-cta-book" }}
      />
      <MobileActions bookingHref={bookingHref} analyticsId="nails-soton" />
    </div>
  );
}
