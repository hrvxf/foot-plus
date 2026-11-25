import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ComfortStage from "../components/care/ComfortStage";
import SharedExperience from "../components/care/SharedExperience";
import AudienceSwitch from "../components/services/AudienceSwitch";
import { portraits } from "../components/site/blocks";
import { focusRing } from "../components/site/ui";
import { careSettingsReview, formatReviewMonth } from "../lib/reviews";
import { BRISTOL_BUSINESS_ID, SITE_URL, SOUTHAMPTON_BUSINESS_ID, bristolReferralForms } from "../lib/site";

// Foot care for supported living and care homes, in both locations. Written for managers, support teams and
// families arranging visits for adults with learning disabilities, autism or extra support needs.
// Only what this audience needs and can't find elsewhere: no prices (on /prices), no treatment list (on
// /services). Experience is described as the practitioners' combined experience, not one person's story.
// Uses the slate "care" palette (globals.css) so it reads as its own space.

const canonical = `${SITE_URL}/supported-living-foot-care`;
const title = "Foot Care for Supported Living & Care Homes, Bristol & Southampton | Foot+";
const description =
  "Calm foot care visits for adults with learning disabilities, autism or extra support needs, in supported living and care homes across Bristol and Southampton.";
const socialImage = {
  url: "/images/social-card-v2.jpg",
  width: 1200,
  height: 630,
  alt: "Foot+: foot care that comes to you, in Bristol and Southampton",
};

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { type: "website", siteName: "Foot+", url: canonical, title, description, images: [socialImage] },
  twitter: { card: "summary_large_image", title, description, images: [socialImage.url] },
};

const guideHref = "/advice/foot-care-learning-disabilities-bristol";

const contacts = [
  { slug: "bristol", area: "Bristol", action: "Send Adam a referral", href: bristolReferralForms.careHome },
  { slug: "southampton", area: "Southampton", action: "Talk to Katie", href: "/book?location=southampton&for=client" },
] as const;

const faqs = [
  {
    question: "What if they can't give consent?",
    answer:
      "If someone can't decide for themselves, we work with their support team and family to agree what's in their best interests.",
  },
  {
    question: "What if they get anxious?",
    answer:
      "Tell us what helps before we come, like a time of day or a familiar face, and we'll plan the visit around it.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Foot care for supported living and care homes",
      serviceType: "Toenail cutting and routine foot care at home",
      description,
      url: canonical,
      areaServed: [
        { "@type": "City", name: "Bristol" },
        { "@type": "City", name: "Southampton" },
      ],
      audience: {
        "@type": "Audience",
        audienceType: "Supported living services, care homes and families of adults with learning disabilities or autism",
      },
      provider: [{ "@id": BRISTOL_BUSINESS_ID }, { "@id": SOUTHAMPTON_BUSINESS_ID }],
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
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      name: title,
      url: canonical,
      description,
      about: { "@id": `${canonical}#service` },
    },
  ],
};

const eyebrow = "text-[0.6875rem] font-semibold uppercase tracking-[0.24em]";
const h2 = "mt-2.5 font-heading text-[1.875rem] font-semibold leading-[1.08] tracking-[-0.02em] md:text-[2.5rem]";

const marks = [
  "left-[5%] top-24 text-[1.75rem] opacity-50",
  "right-[6%] top-40 text-[3rem] opacity-30",
  "bottom-10 left-[9%] text-xl opacity-50",
];

export default function SupportedLivingFootCarePage() {
  const review = careSettingsReview;
  return (
    <div className="bg-care-bg pb-16 text-care-ink md:pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <AudienceSwitch />

      {/* Who it's for */}
      <section
        aria-labelledby="care-heading"
        className="relative mx-3 mt-5 overflow-hidden rounded-[32px] bg-care-deep px-6 pb-12 pt-12 text-center text-white md:mx-auto md:mt-8 md:max-w-5xl md:pb-20 md:pt-20"
      >
        {marks.map((className) => (
          <span key={className} aria-hidden="true" className={`pointer-events-none absolute font-heading font-semibold text-care-soft ${className}`}>
            +
          </span>
        ))}
        <p className={`${eyebrow} text-care-soft`}>Supported living &amp; care homes</p>
        <h1
          id="care-heading"
          className="mx-auto mt-4 max-w-[14ch] font-heading text-[2.375rem] font-bold leading-[1.05] tracking-[-0.025em] md:text-6xl"
        >
          Foot care at a pace <span className="text-care-soft">that suits them.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[32ch] text-base leading-[1.55] text-white/85 md:text-lg">
          Visits for adults with learning disabilities, autism or extra support needs, across Bristol and Southampton.
        </p>
        <a
          href="#care-book"
          className={`mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 font-heading text-[0.9375rem] font-semibold text-care-deep transition-colors hover:bg-care-mist ${focusRing}`}
          data-analytics-id="care-hero-arrange"
        >
          Arrange visits
        </a>
      </section>

      <ComfortStage id="care-visit" />

      <SharedExperience id="care-experience" />

      {review ? (
        <figure className="mx-auto mt-3 max-w-xl px-3 md:px-0">
          <div className="rounded-[30px] bg-white px-[22px] py-7 text-center shadow-[0_0_0_1px_var(--color-care-line)]">
            <p aria-label={`Rated ${review.rating} out of 5`} className="text-lg tracking-[0.15em] text-brand-gold">
              <span aria-hidden="true">{"★".repeat(review.rating)}</span>
            </p>
            <blockquote className="mt-2 text-[1.0625rem] leading-[1.6]">&ldquo;{review.excerpt ?? review.text}&rdquo;</blockquote>
            <figcaption className="mt-3 text-sm text-care-muted">
              {review.name}, Google review, {formatReviewMonth(review.month)}
            </figcaption>
          </div>
        </figure>
      ) : null}

      {/* Care homes */}
      <section aria-labelledby="care-homes-heading" className="mx-auto max-w-xl px-[22px] pt-14 text-center md:pt-20">
        <p className={`${eyebrow} text-care-deep`}>Care homes</p>
        <h2 id="care-homes-heading" className={h2}>
          Visiting a <span className="text-care-accent">care home?</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[32ch] text-[0.9375rem] leading-[1.55] text-care-muted">
          The same calm visit for residents who find foot care hard to manage. One resident or several, in a single visit.
        </p>
      </section>

      {/* Booking for a group */}
      <section
        id="care-book"
        aria-labelledby="care-book-heading"
        className="mx-3 mt-14 scroll-mt-24 rounded-[32px] bg-care-deep px-5 py-10 text-center text-white md:mx-auto md:mt-20 md:max-w-3xl md:px-10 md:py-14"
      >
        <p className={`${eyebrow} text-care-soft`}>Booking for a group?</p>
        <h2 id="care-book-heading" className={h2}>
          Tell us who <span className="text-care-soft">needs a visit.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[32ch] text-[0.9375rem] leading-[1.55] text-white/85">
          We&apos;ll agree the day and numbers with you. Pay per person, or one invoice for everyone.
        </p>
        <ul className="mx-auto mt-6 flex max-w-md flex-col gap-2 text-left">
          {contacts.map((contact) => (
            <li key={contact.slug}>
              <Link
                href={contact.href}
                data-analytics-id={`care-book-${contact.slug}`}
                className={`flex min-h-[76px] items-center gap-3.5 rounded-[22px] bg-white py-3 pl-3 pr-4 text-care-ink transition-colors hover:bg-care-bg focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white`}
              >
                <span className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full bg-care-line">
                  <Image src={portraits[contact.slug]} alt="" fill sizes="52px" className="object-cover object-[center_15%]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-lg font-semibold">{contact.area}</span>
                  <span className="text-sm text-care-muted">{contact.action}</span>
                </span>
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-care-deep text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* After the visit */}
      <section aria-labelledby="care-after-heading" className="mx-auto max-w-xl px-[22px] pt-14 text-center md:pt-20">
        <p className={`${eyebrow} text-care-deep`}>After the visit</p>
        <h2 id="care-after-heading" className={h2}>
          We don&apos;t just <span className="text-care-accent">leave it there.</span>
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-2.5 text-left">
          {[
            { title: "Aftercare", text: "Simple advice for them and their staff, if they need it." },
            { title: "Flagged early", text: "Anything worrying goes to their GP, or we refer them on." },
          ].map((item) => (
            <div key={item.title} className="min-w-0 rounded-[22px] bg-white px-4 py-[18px] shadow-[0_0_0_1px_var(--color-care-line)]">
              <h3 className="font-heading text-[0.9375rem] font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-[0.8125rem] leading-[1.5] text-care-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Questions */}
      <section aria-labelledby="care-faq-heading" className="mx-auto max-w-xl px-[22px] pt-14 md:pt-20">
        <p className={`${eyebrow} text-center text-care-deep`}>Good to know</p>
        <h2 id="care-faq-heading" className={`${h2} mb-2 text-center`}>
          Before you <span className="text-care-accent">book.</span>
        </h2>
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-b border-care-line">
            <summary
              className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 py-3 font-semibold [&::-webkit-details-marker]:hidden ${focusRing}`}
            >
              {faq.question}
              <span aria-hidden="true" className="text-[1.375rem] leading-none text-care-accent transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-[18px] text-[0.9375rem] leading-[1.6] text-care-muted">{faq.answer}</p>
          </details>
        ))}
        <p className="mt-6 text-center">
          <Link href={guideHref} className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg font-semibold text-care-deep ${focusRing}`}>
            Our accessible foot care guide <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>
    </div>
  );
}
