import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import StandardsSpotlight from "../about/StandardsSpotlight";
import DesktopActionPill from "./DesktopActionPill";
import PricesCard from "./PricesCard";
import PostcodeChecker from "../home/PostcodeChecker";
import { portraits } from "./blocks";
import MobileActions from "./MobileActions";
import { ContactRow, FaqCards, PriceTickets } from "./statement";
import { focusRing, texturedGreen } from "./ui";
import { credentialMeanings } from "../../lib/about";
import { getAdviceArticle } from "../../lib/advice";
import { serviceLocations } from "../../lib/locations";
import { BUSINESS_ID, emailHref, locationPhones, phoneDisplay, phoneHref, prices, SITE_URL } from "../../lib/site";
import { treatments, treatmentUrl, type Treatment } from "../../lib/treatments";

// Location-neutral treatment page (corns, hard skin and callus, cracked
// heels). Same "Statement" layout as the toenail cutting pages, without a town.
//
// Desktop (lg+) uses split sections: heading beside both practitioners, "What it is" beside "At your
// visit", prices beside the postcode check, the questions beside their heading, and a floating pill
// (both photos; the call button offers Adam or Katie). Phones are unchanged: each desktop-only block is
// `hidden lg:…` and the phone block it replaces is `lg:hidden`.

const amberEdge = "shadow-[0_0_0_1px_var(--color-brand-line),inset_4px_0_0_#B08A3E]";

/** "Corn treatment at home" → ["Corn treatment", "at home."]: the second line takes the brand green. */
function headingLines(title: string): [string, string] {
  const match = title.match(/^(.*?)\s+(at home)$/i);
  return match ? [match[1], `${match[2]}.`] : [title, ""];
}

const socialImage = { url: "/images/social-card-v2.jpg", width: 1200, height: 630, alt: "Foot+: foot care that comes to you, in Bristol and Southampton" };

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
  const guideSlug = treatment.guide?.href.replace(/^\/advice\//, "");
  const guide = guideSlug ? getAdviceArticle(guideSlug) : undefined;
  const [first, second] = headingLines(treatment.title);
  const [lead, ...more] = treatment.about;
  const contactActions = [
    { kind: "phone" as const, href: phoneHref, label: `Call Foot+ on ${phoneDisplay}`, analyticsId: `${analytics}-phone` },
    { kind: "email" as const, href: emailHref, label: "Email Foot+", analyticsId: `${analytics}-email` },
  ];
  const chip = `inline-flex min-h-11 items-center rounded-full bg-white px-4 text-[0.9375rem] font-medium text-brand-charcoal shadow-[0_0_0_1.5px_var(--color-brand-line)] transition-colors hover:bg-brand-wash ${focusRing}`;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFor(treatment)) }} />

      <section
        className="px-6 pb-9 pt-8 text-center md:pt-14 lg:mx-auto lg:grid lg:max-w-[1200px] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-14 lg:px-8 lg:pb-20 lg:pt-16 lg:text-left"
        aria-labelledby="treatment-heading"
      >
        <div>
        <nav aria-label="Breadcrumb" className="mb-3.5 text-[0.8125rem] text-brand-muted">
          <ol className="flex justify-center gap-1.5 lg:justify-start">
            <li>
              <Link href="/services" className={`rounded font-semibold text-brand-sageDeep ${focusRing}`}>
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{treatment.name}</li>
          </ol>
        </nav>
        <h1
          id="treatment-heading"
          className="font-heading text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-brand-charcoal md:text-7xl lg:text-[3.5rem] xl:text-[4rem]"
        >
          {first}
          {second ? (
            <>
              <br />
              <span className="text-brand-sage">{second}</span>
            </>
          ) : null}
        </h1>
        <p className="mx-auto mt-3 max-w-[36ch] text-[1.0625rem] leading-[1.55] text-brand-muted md:text-lg lg:mx-0 lg:mt-5 lg:max-w-[40ch] lg:text-[1.1875rem]">
          {treatment.intro} Home visits in Bristol and Southampton.
        </p>
        <div className="mx-auto mt-6 max-w-sm lg:mx-0 lg:mt-8 lg:flex lg:max-w-none lg:items-start lg:gap-5" data-hero-actions>
          <Link
            href="/book"
            className={`flex h-[52px] items-center justify-center rounded-full bg-brand-sageDark px-7 font-semibold text-white lg:h-14 lg:px-8 transition-colors hover:bg-brand-sageDeep ${focusRing}`}
            data-analytics-id={`${analytics}-hero-book`}
          >
            Request a visit
          </Link>
          <ContactRow actions={contactActions} className="lg:mt-0.5 lg:justify-start" />
        </div>
        </div>
        <WhoVisitsCard analytics={analytics} />
      </section>

      <div className="lg:bg-white lg:py-[88px]">
      <div className="lg:mx-auto lg:grid lg:max-w-[1200px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14 lg:px-8">
      <section
        className={`mx-3 rounded-[28px] px-6 py-9 text-center sm:mx-auto sm:max-w-xl lg:mx-0 lg:max-w-none lg:px-10 lg:pb-11 lg:pt-10 lg:text-left ${texturedGreen}`}
        aria-labelledby="about-heading"
      >
        <h2 id="about-heading" className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
          What it is
        </h2>
        <p className="mt-3 font-heading text-[1.375rem] font-semibold leading-[1.3] tracking-[-0.02em] lg:text-2xl">{lead}</p>
        {more.map((paragraph) => (
          <p key={paragraph} className="mt-3 text-[0.9375rem] leading-[1.6] text-white/85 lg:text-base">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mx-auto max-w-2xl px-[22px] pb-4 pt-12 text-center md:pt-16 lg:mx-0 lg:max-w-none lg:p-0 lg:text-left" aria-labelledby="visit-heading">
        <h2 id="visit-heading" className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark">
          At your visit
        </h2>
        <StandardsSpotlight standards={treatment.care.map((title) => ({ title }))} />
        <aside className={`mx-auto mt-5 max-w-md rounded-[22px] bg-white px-5 py-[18px] text-left lg:mx-0 lg:max-w-none lg:px-6 lg:py-[22px] ${amberEdge}`}>
          <h3 className="font-heading text-base font-semibold text-brand-charcoal">Safety first</h3>
          <p className="mt-1.5 text-sm leading-[1.55] text-brand-muted">{treatment.safety}</p>
        </aside>
      </section>
      </div>
      </div>

      <section className="px-[18px] pt-10 text-center md:pt-14 lg:hidden" aria-labelledby="who-heading">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark">Who visits</p>
        <h2
          id="who-heading"
          className="mt-2.5 font-heading text-[2rem] font-bold leading-[1.06] tracking-[-0.025em] text-brand-charcoal md:text-5xl"
        >
          Your practitioner
          <br />
          <span className="text-brand-sage">comes to you.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[34ch] text-[0.9375rem] leading-[1.5] text-brand-muted">
          Diploma-trained Foot Health Practitioners. Insured and DBS-checked.
        </p>
        <ul className="mx-auto mt-5 flex max-w-md gap-2.5">
          {(["bristol", "southampton"] as const).map((slug) => {
            const location = serviceLocations[slug];
            const practitioner = location.practitioner!;
            return (
              <li key={slug} className="flex-1">
                <Link
                  href={location.href}
                  className={`flex h-full flex-col items-center rounded-3xl bg-white px-3 py-4 shadow-[0_0_0_1px_var(--color-brand-line)] transition-colors hover:bg-brand-wash ${focusRing}`}
                  data-analytics-id={`${analytics}-who-${slug}`}
                >
                  <Image
                    src={portraits[slug]}
                    alt=""
                    width={144}
                    height={144}
                    className="h-[72px] w-[72px] rounded-full bg-white object-cover object-[center_15%] shadow-[0_0_0_3px_#fff,0_0_0_4px_var(--color-brand-line)]"
                  />
                  <span className="mt-2.5 font-heading text-base font-semibold tracking-[-0.02em] text-brand-charcoal">
                    {practitioner.name.split(" ")[0]}
                  </span>
                  <span className="text-[0.8125rem] text-brand-muted">{location.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <PriceTickets className="mt-7 lg:hidden" />

      <section
        className="mx-3.5 mt-4 rounded-3xl bg-white p-5 text-center shadow-[0_18px_40px_-26px_rgba(36,48,40,0.45),0_0_0_1px_var(--color-brand-line)] sm:mx-auto sm:max-w-md lg:hidden"
        aria-label="Do we visit you?"
      >
        <PostcodeChecker
          tone="compact"
          source={analytics}
          bookLocation={null}
          title="Do we visit you?"
          label="Postcode for the visit"
        />
      </section>

      <section
        className="mx-auto hidden max-w-[1200px] grid-cols-2 items-stretch gap-8 px-8 pt-[88px] lg:grid"
        aria-label="Prices and postcode check"
      >
        <PricesCard />
        <div className="flex flex-col justify-center rounded-[28px] bg-white p-9 shadow-[0_24px_48px_-32px_rgba(36,48,40,0.35)]">
          <PostcodeChecker
            tone="compact"
            source={`${analytics}-desktop`}
            bookLocation={null}
            title="Do we visit you?"
            label="Postcode for the visit"
          />
        </div>
      </section>

      <FaqCards faqs={treatment.faqs} headingId="treatment-faq-heading" split />

      <section className="px-[18px] pb-16 pt-10 text-center md:pb-24 lg:mx-auto lg:grid lg:max-w-[1200px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14 lg:px-8 lg:pt-20 lg:text-left" aria-labelledby="more-heading">
        {guide ? (
          <Link
            href={`/advice/${guide.slug}`}
            className={`mx-auto mb-9 flex max-w-md flex-col rounded-[22px] bg-brand-wash px-5 pb-[18px] pt-5 text-left lg:mx-0 lg:mb-0 lg:max-w-none lg:p-6 transition-colors hover:bg-brand-line ${focusRing}`}
          >
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brand-sage">Guide</span>
            <span className="mt-2 font-heading text-[1.1875rem] font-semibold leading-[1.2] tracking-[-0.01em] text-brand-charcoal">
              {guide.shortTitle}
            </span>
            <span className="mt-2.5 text-[0.84375rem] font-semibold text-brand-sageDeep">
              Read <span aria-hidden="true">→</span>
            </span>
          </Link>
        ) : null}
        <div>
        <h2 id="more-heading" className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark">
          Also at home
        </h2>
        <ul className="mx-auto mt-3.5 flex max-w-md flex-wrap justify-center gap-2 lg:mx-0 lg:max-w-none lg:justify-start">
          {others.map((item) => (
            <li key={item.slug}>
              <Link href={`/${item.slug}`} className={chip}>
                {item.name}
              </Link>
            </li>
          ))}
          {/* Straight to each town's toenail page rather than the chooser in between. */}
          {(["bristol", "southampton"] as const).map((slug) => (
            <li key={slug}>
              <Link href={`/toenail-cutting-${slug}`} className={chip}>
                Toenail cutting, {serviceLocations[slug].name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs text-brand-muted">
          Reviewed by Adam James, Foot Health Practitioner, {treatment.lastReviewed}.
        </p>
        </div>
      </section>

      <MobileActions analyticsId={analytics} />
      <DesktopActionPill
        people={(["bristol", "southampton"] as const).map((slug) => ({
          firstName: serviceLocations[slug].practitioner!.name.split(" ")[0],
          portrait: portraits[slug],
          town: serviceLocations[slug].name,
          phoneDisplay: locationPhones[slug].display,
          callHref: locationPhones[slug].href,
        }))}
        bookingHref="/book"
        analyticsId={analytics}
      />
    </div>
  );
}

/** Desktop only (lg+): both practitioners beside the hero heading, with their letters as chips. */
function WhoVisitsCard({ analytics }: { analytics: string }) {
  return (
    <aside
      className="hidden rounded-[28px] bg-white p-8 shadow-[0_24px_48px_-32px_rgba(36,48,40,0.35)] lg:block"
      aria-labelledby="who-desktop-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark">Who visits</p>
      <h2
        id="who-desktop-heading"
        className="mt-2.5 font-heading text-[1.875rem] font-bold leading-[1.06] tracking-[-0.025em] text-brand-charcoal"
      >
        Your practitioner
        <span className="block text-brand-sage">comes to you.</span>
      </h2>
      <p className="mt-3 text-[0.9375rem] text-brand-muted">Foot Health Practitioners · Insured and DBS-checked</p>
      <ul className="mt-5 flex flex-col gap-2.5">
        {(["bristol", "southampton"] as const).map((slug) => {
          const location = serviceLocations[slug];
          const practitioner = location.practitioner!;
          return (
            <li key={slug} className="rounded-[22px] bg-white p-[18px] shadow-[0_0_0_1px_var(--color-brand-line)]">
              <Link
                href={location.href}
                className={`group flex items-center gap-3.5 rounded-2xl ${focusRing}`}
                data-analytics-id={`${analytics}-who-desktop-${slug}`}
              >
                <Image
                  src={portraits[slug]}
                  alt=""
                  width={128}
                  height={128}
                  className="h-16 w-16 rounded-full object-cover object-[center_15%]"
                />
                <span>
                  <span className="block font-heading text-lg font-semibold text-brand-charcoal">{practitioner.name}</span>
                  <span className="text-sm font-semibold text-brand-sageDark group-hover:text-brand-sageDeep">{location.name} →</span>
                </span>
              </Link>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${practitioner.name.split(" ")[0]}'s qualifications and memberships`}>
                {practitioner.credentials.map((credential) => (
                  <li
                    key={credential}
                    title={credentialMeanings[credential] ?? credential}
                    className="rounded-full bg-brand-wash px-2.5 py-[5px] text-xs font-semibold text-brand-sageDeep"
                  >
                    {credential}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
