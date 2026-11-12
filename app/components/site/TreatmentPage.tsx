import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import PostcodeChecker from "../home/PostcodeChecker";
import ContactIcons from "./ContactIcons";
import { FaqList } from "./blocks";
import MobileActions from "./MobileActions";
import { btnPrimary, container, h2, textLink } from "./ui";
import { isPublishedAdviceHref } from "../../lib/advice";
import { BUSINESS_ID, emailHref, phoneDisplay, phoneHref, prices, SITE_URL } from "../../lib/site";
import { treatments, treatmentUrl, type Treatment } from "../../lib/treatments";

// Location-neutral treatment page (corns, hard skin and callus, cracked
// heels). Same structure as the toenail cutting pages, without a town.

const socialImage = { url: "/images/social-card.png", width: 1200, height: 630, alt: "Foot+ professional home-visit foot care" };

export function treatmentMetadata(treatment: Treatment): Metadata {
  const url = treatmentUrl(treatment.slug);
  return {
    title: { absolute: treatment.metaTitle },
    description: treatment.description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Foot+", url, title: treatment.metaTitle, description: treatment.description, images: [socialImage] },
    twitter: { card: "summary_large_image", title: treatment.metaTitle, description: treatment.description, images: [socialImage.url] },
    robots: { index: true, follow: true },
  };
}

function schemaFor(treatment: Treatment) {
  const url = treatmentUrl(treatment.slug);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: treatment.title,
        serviceType: treatment.name,
        description: treatment.description,
        url,
        areaServed: [
          { "@type": "City", name: "Bristol" },
          { "@type": "City", name: "Southampton" },
        ],
        provider: { "@id": BUSINESS_ID },
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
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 2, name: treatment.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: treatment.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}

export default function TreatmentPage({ treatment }: { treatment: Treatment }) {
  const analytics = `treatment-${treatment.slug}`;
  const others = treatments.filter((item) => item.slug !== treatment.slug);
  const guide = treatment.guide && isPublishedAdviceHref(treatment.guide.href) ? treatment.guide : undefined;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFor(treatment)) }} />

      <section className="border-b border-brand-line bg-brand-wash">
        <div className={`${container} py-8 md:py-14`}>
          <nav aria-label="Breadcrumb" className="text-sm text-brand-muted">
            <Link href="/services" className={textLink}>
              Services
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{treatment.name}</span>
          </nav>
          <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-14">
            <div>
              <h1 className="font-heading text-4xl font-semibold leading-[1.1] text-brand-sageDeep sm:text-5xl">
                {treatment.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-muted">{treatment.intro}</p>
              <p className="mt-2 text-base text-brand-muted">Home visits in Bristol and Southampton.</p>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <Link href="/book" className={btnPrimary} data-analytics-id={`${analytics}-hero-book`}>
                  Request a visit
                </Link>
                <ContactIcons
                  actions={[
                    { kind: "phone", href: phoneHref, label: `Call Foot+ on ${phoneDisplay}`, analyticsId: `${analytics}-phone` },
                    { kind: "email", href: emailHref, label: "Email Foot+", analyticsId: `${analytics}-email` },
                  ]}
                />
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

      <section className={`${container} grid gap-10 py-12 md:grid-cols-2 md:gap-14 md:py-16`}>
        <div>
          <h2 className={h2}>What it is</h2>
          {treatment.about.map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-relaxed text-brand-muted">
              {paragraph}
            </p>
          ))}
        </div>
        <div>
          <h2 className={h2}>What we do</h2>
          <ul className="mt-4 grid gap-3">
            {treatment.care.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-brand-muted">
                <Check className="mt-1 h-5 w-5 shrink-0 text-brand-sage" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-brand-muted">{treatment.safety}</p>
        </div>
      </section>

      <section className="border-y border-brand-line bg-brand-wash">
        <div className={`${container} grid gap-10 py-12 md:grid-cols-2 md:py-16`}>
          <div>
            <h2 className={h2}>Who visits</h2>
            <p className="mt-4 leading-relaxed text-brand-muted">
              Adam James in Bristol and Katie Preston in Southampton. Both are diploma-trained Foot Health Practitioners,
              insured, DBS checked and using sterilised instruments.
            </p>
            <Link href="/about" className={`${textLink} mt-4 inline-block`}>
              About our practitioners
            </Link>
          </div>
          <div>
            <h2 className={h2}>Do we visit you?</h2>
            <div className="mt-4">
              <PostcodeChecker tone="panel" source={analytics} label="Postcode for the visit" />
            </div>
          </div>
        </div>
      </section>

      <section className={`${container} py-12 md:py-16`} aria-labelledby="treatment-faq-heading">
        <h2 id="treatment-faq-heading" className={h2}>
          Questions
        </h2>
        <FaqList faqs={treatment.faqs} className="mt-6" />
        <p className="mt-8 text-sm leading-relaxed text-brand-muted">
          {guide ? (
            <>
              Guide:{" "}
              <Link href={guide.href} className={textLink}>
                {guide.label}
              </Link>
              <span aria-hidden="true"> · </span>
            </>
          ) : null}
          Also:{" "}
          {others.map((item, index) => (
            <span key={item.slug}>
              {index ? " · " : null}
              <Link href={`/${item.slug}`} className={textLink}>
                {item.name}
              </Link>
            </span>
          ))}
          <span aria-hidden="true"> · </span>
          <Link href="/toenail-cutting" className={textLink}>
            Toenail cutting
          </Link>
        </p>
        <p className="mt-3 text-sm text-brand-muted">Reviewed by Adam James, Foot Health Practitioner, {treatment.lastReviewed}.</p>
      </section>

      <MobileActions analyticsId={analytics} />
    </div>
  );
}
