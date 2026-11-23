import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import AudienceSwitch from "../components/services/AudienceSwitch";
import VisitDeck, { type VisitStep } from "../components/care/VisitDeck";
import { portraits } from "../components/site/blocks";
import MessageClose from "../components/location/MessageClose";
import { focusRing } from "../components/site/ui";
import { careSettingsReview, formatReviewMonth } from "../lib/reviews";
import { BRISTOL_BUSINESS_ID, paymentMethods, prices, SITE_URL } from "../lib/site";

// Foot care for people in care homes and supported living, for managers and
// families. Bristol only: the care experience described is Adam's.
// Uses the slate "care" palette (globals.css) so it reads as its own space.

const canonical = `${SITE_URL}/care-homes-bristol`;
const title = "Care Home & Supported Living Foot Care, Bristol | Foot+";
const description =
  "We come to you. Toenail cutting and foot care for people in care homes and supported living across Bristol, one resident or a set day for the whole house.";
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
  robots: { index: true, follow: true },
};

const bookingHref = "/book?location=bristol";
const referHref = "/book?location=bristol&for=client";
const whatsAppHref = `https://wa.me/447380301555?text=${encodeURIComponent("Hi Adam, I’d like to ask about foot care visits for someone I support.")}`;

const steps: VisitStep[] = [
  {
    title: "We talk first",
    text: "You or the family tell me what works: time of day, who they're comfortable with, anything that worries them.",
  },
  { title: "Nothing's a surprise", text: "I show what I'm doing before I do it. If they need a break, we take one." },
  {
    title: "Familiar faces welcome",
    text: "Support staff or family can stay. I've worked in supported living, so I know how a house runs.",
  },
  { title: "Easier each time", text: "I note what went well, so the next visit is calmer still." },
];

const payers = ["The person, from their own money", "A family member", "Your service, by invoice"];

const faqs = [
  {
    question: "What if someone gets anxious?",
    answer: "We go at their pace. If today isn't the day, we stop and try again another time.",
  },
  {
    question: "What about consent?",
    answer:
      "If someone can't decide for themselves, I'll work with their support team and family to agree what's in their best interests.",
  },
  {
    question: "Can you help with diabetic feet?",
    answer: "Yes. I offer diabetic foot care and will tell you if anything needs checking by their GP.",
  },
  { question: "Are you DBS-checked?", answer: "Yes. I'm fully qualified, insured and DBS-checked." },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Foot care for care homes and supported living in Bristol",
      serviceType: "Toenail cutting and routine foot care at home",
      description,
      url: canonical,
      areaServed: { "@type": "City", name: "Bristol" },
      audience: { "@type": "Audience", audienceType: "Care homes, supported living services and families" },
      provider: { "@id": BRISTOL_BUSINESS_ID },
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
const pill = `inline-flex min-h-[52px] items-center justify-center rounded-full px-7 font-heading text-[0.9375rem] font-semibold transition-colors ${focusRing}`;

const marks = [
  "left-[5%] top-24 text-[1.75rem] opacity-50",
  "right-[6%] top-40 text-[3rem] opacity-30",
  "bottom-10 left-[9%] text-xl opacity-50",
];

export default function CareHomesBristolPage() {
  const review = careSettingsReview;
  return (
    <div className="bg-care-bg text-care-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <AudienceSwitch />

      {/* Opening */}
      <section
        aria-labelledby="care-heading"
        className="relative mx-3 mt-5 overflow-hidden rounded-[32px] bg-care-deep px-6 pb-14 pt-14 text-center text-white md:mx-auto md:mt-8 md:max-w-5xl md:pb-20 md:pt-20"
      >
        {marks.map((className) => (
          <span key={className} aria-hidden="true" className={`pointer-events-none absolute font-heading font-semibold text-care-soft ${className}`}>
            +
          </span>
        ))}
        <p className={`${eyebrow} text-care-soft`}>Care homes &amp; supported living</p>
        <h1
          id="care-heading"
          className="mx-auto mt-4 max-w-[15ch] font-heading text-[2.5rem] font-bold leading-[1.04] tracking-[-0.025em] md:text-6xl"
        >
          Foot care that fits <span className="text-care-soft">their routine.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[34ch] text-base leading-[1.55] text-white/85 md:text-lg">
          Home visits across Bristol for the people you support, at their pace, with someone who&apos;s worked in supported living.
        </p>
        <a
          href="#care-contact"
          className={`${pill} mt-7 bg-white text-care-deep hover:bg-care-mist`}
          data-analytics-id="care-hero-talk"
        >
          Talk to Adam
        </a>
      </section>

      {/* Adam's quote, then the parent's review once agreed */}
      <section aria-label="Why Adam does this" className="mx-auto max-w-xl px-[22px] pt-12 text-center">
        <figure className="rounded-[30px] bg-care-mist px-[22px] py-8">
          <p className={`${eyebrow} text-care-deep`}>Why I do this</p>
          <blockquote className="mt-3.5 font-heading text-[1.4375rem] font-semibold leading-[1.25] tracking-[-0.015em]">
            &ldquo;In five years of care, nail care was the thing that{" "}
            <span className="text-care-accent">always got missed.</span> So now it&apos;s what I do.&rdquo;
          </blockquote>
          <figcaption className="mt-5 flex items-center justify-center gap-3 text-left text-sm text-care-muted">
            <span className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full border-[3px] border-white bg-care-line">
              <Image src={portraits.bristol} alt="" fill sizes="52px" className="object-cover object-[center_15%]" />
            </span>
            <span>
              <b className="block text-care-ink">Adam James</b>
              Foot Health Practitioner, Bristol
            </span>
          </figcaption>
        </figure>

        {review ? (
          <figure className="mt-3 rounded-[30px] bg-white px-[22px] py-7 shadow-[0_0_0_1px_var(--color-care-line)]">
            <p aria-label={`Rated ${review.rating} out of 5`} className="text-lg tracking-[0.15em] text-brand-gold">
              <span aria-hidden="true">{"★".repeat(review.rating)}</span>
            </p>
            <blockquote className="mt-2 text-[1.0625rem] leading-[1.6] text-care-ink">&ldquo;{review.excerpt ?? review.text}&rdquo;</blockquote>
            <figcaption className="mt-3 text-sm text-care-muted">
              {review.name}, Google review, {formatReviewMonth(review.month)}
            </figcaption>
          </figure>
        ) : null}
      </section>

      {/* How a visit goes */}
      <section aria-labelledby="visit-heading" className="pt-14 text-center">
        <div className="px-[22px]">
          <p className={`${eyebrow} text-care-deep`}>How a visit goes</p>
          <h2 id="visit-heading" className={h2}>
            At their pace,
            <span className="block text-care-accent">in their home.</span>
          </h2>
        </div>
        <VisitDeck steps={steps} />
      </section>

      {/* Booking */}
      <section
        aria-labelledby="booking-heading"
        className="mx-3 mt-14 rounded-[32px] bg-care-deep px-[22px] py-12 text-center text-white md:mx-auto md:max-w-3xl"
      >
        <p className={`${eyebrow} text-care-soft`}>Booking</p>
        <h2 id="booking-heading" className={h2}>
          One person or <span className="text-care-soft">the whole house.</span>
        </h2>
        <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-2.5">
          {[
            { mark: "1", title: "Just one", text: "A single home visit, like any other." },
            { mark: "+", title: "A set day", text: "A regular day to see everyone who needs me." },
          ].map((option) => (
            <div key={option.title} className="min-w-0 rounded-[24px] border border-white/20 bg-white/[0.08] px-4 py-5">
              <p aria-hidden="true" className="font-heading text-[2rem] font-bold leading-none text-care-soft">
                {option.mark}
              </p>
              <h3 className="mt-2 font-heading text-[0.9375rem] font-semibold">{option.title}</h3>
              <p className="mt-1.5 text-[0.8125rem] leading-[1.5] text-white/80">{option.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-7 flex justify-center gap-8">
          {[
            { price: prices[0].price, label: "First visit" },
            { price: prices[1].price, label: "Routine visit" },
          ].map((item) => (
            <p key={item.label}>
              <span className="block font-heading text-[2.125rem] font-bold leading-none tracking-[-0.02em]">{item.price}</span>
              <span className="mt-1 block text-xs text-white/75">{item.label}</span>
            </p>
          ))}
        </div>
        <p className="mt-3 text-[0.8125rem] text-white/75">
          Per person. A small travel fee may apply.{" "}
          <Link href="/prices" className={`rounded font-semibold text-white ${focusRing}`}>
            Travel and prices <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>

      {/* Who pays */}
      <section aria-labelledby="pay-heading" className="mx-auto max-w-xl px-[22px] pt-14 text-center">
        <p className={`${eyebrow} text-care-deep`}>Who pays</p>
        <h2 id="pay-heading" className={h2}>
          Whatever&apos;s <span className="text-care-accent">easiest.</span>
        </h2>
        <ul className="mt-6 flex flex-col gap-2 text-left">
          {payers.map((payer) => (
            <li
              key={payer}
              className="flex items-center justify-between gap-3 rounded-2xl bg-white px-[18px] py-[15px] text-[0.9375rem] shadow-[0_0_0_1px_var(--color-care-line)]"
            >
              {payer}
              <span aria-hidden="true" className="font-semibold text-care-accent">
                ✓
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[0.8125rem] text-care-muted">
          {paymentMethods.map((method, index) => (index === 0 ? method[0].toUpperCase() + method.slice(1) : method)).join(", ").replace(/, ([^,]*)$/, " or $1")}.
        </p>
      </section>

      {/* Questions */}
      <section aria-labelledby="care-faq-heading" className="mx-auto max-w-xl px-[22px] pt-14">
        <p className={`${eyebrow} text-center text-care-deep`}>Good to know</p>
        <h2 id="care-faq-heading" className={`${h2} mb-2 text-center`}>
          Questions managers <span className="text-care-accent">ask.</span>
        </h2>
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-b border-care-line">
            <summary
              className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded py-4 font-heading text-base font-semibold [&::-webkit-details-marker]:hidden ${focusRing}`}
            >
              {faq.question}
              <span aria-hidden="true" className="text-[1.375rem] leading-none text-care-accent transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-[18px] text-[0.9375rem] leading-[1.6] text-care-muted">{faq.answer}</p>
          </details>
        ))}
      </section>

      {/* Close: message Adam, like the location pages. Ends the page; the footer is left out (Footer.tsx). */}
      <div className="mt-16">
        <MessageClose
          id="care-contact-heading"
          sectionId="care-contact"
          name="Adam"
          greeting="Talk"
          tone="care"
          portraitSrc={portraits.bristol}
          messageHref={whatsAppHref}
          messageLabel="Message Adam on WhatsApp"
          examples={["Hi Adam, could you visit on Tuesdays?", "Can you see three of our residents?", "Could you visit my son?"]}
        >
          <div className="mt-4 flex flex-wrap justify-center gap-x-5">
            <Link href={bookingHref} className={`inline-flex min-h-11 items-center gap-1 rounded-lg text-sm font-semibold text-white ${focusRing}`} data-analytics-id="care-close-book">
              Request a visit <span aria-hidden="true">→</span>
            </Link>
            <Link href={referHref} className={`inline-flex min-h-11 items-center gap-1 rounded-lg text-sm font-semibold text-care-soft ${focusRing}`} data-analytics-id="care-close-refer">
              Refer someone <span aria-hidden="true">→</span>
            </Link>
          </div>
        </MessageClose>
      </div>
    </div>
  );
}
