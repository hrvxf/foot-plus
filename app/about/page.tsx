import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import CredentialChips from "../components/about/CredentialChips";
import StandardsSpotlight from "../components/about/StandardsSpotlight";
import { portraits } from "../components/site/blocks";
import { focusRing, texturedGreen } from "../components/site/ui";
import { founderStory } from "../lib/about";
import { homeStandards } from "../lib/home";
import { serviceLocations } from "../lib/locations";
import { ADAM_ID, BUSINESS_ID, SITE_URL, DEFAULT_SOCIAL_IMAGE } from "../lib/site";

const canonical = `${SITE_URL}/about`;
const title = "Meet Your Foot Health Practitioners | Foot+";
const description =
  "Meet Adam in Bristol and Katie in Southampton: qualified, insured and DBS-checked Foot Health Practitioners who come to you for toenail cutting and foot care at home.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: {
    images: [DEFAULT_SOCIAL_IMAGE], title, description, url: canonical },
};
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      about: { "@id": BUSINESS_ID },
      mainEntity: [{ "@id": ADAM_ID }, { "@id": `${canonical}#katie-preston` }],
    },
    {
      "@type": "Person",
      "@id": `${canonical}#katie-preston`,
      name: "Katie Preston",
      jobTitle: "Foot Health Practitioner",
      url: `${canonical}#katie-preston`,
      worksFor: { "@id": `${SITE_URL}/locations/southampton#medicalbusiness` },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: "Diploma in Foot Health",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Foot+",
          item: canonical,
        },
      ],
    },
  ],
};
// Anchor ids are linked from elsewhere (e.g. "/about#adam-james"), so keep them stable.
const practitionerAnchors = { bristol: "adam-james", southampton: "katie-preston" } as const;

const eyebrow = "text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark";
const headline = "font-heading font-bold tracking-[-0.025em] text-brand-charcoal";
const arrowLink = `inline-flex min-h-11 items-center gap-1.5 rounded-lg font-semibold text-brand-sageDeep ${focusRing}`;

export default function AboutPage() {
  const locations = Object.values(serviceLocations);
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section aria-labelledby="about-heading" className="pt-10 md:pt-16">
        <h1 id="about-heading" className={`${headline} px-6 pb-8 text-center text-[2.75rem] leading-[1.04] md:pb-12 md:text-7xl`}>
          <span className="sr-only">About Foot+. </span>
          Two practitioners.
          <br />
          <span className="text-brand-sage">One standard.</span>
        </h1>

        <div className="mx-auto flex max-w-md flex-col gap-3.5 px-3.5 md:max-w-5xl md:flex-row md:items-stretch md:gap-6 md:px-8">
          {locations.map((location) => {
            const practitioner = location.practitioner;
            if (!practitioner) return null;
            const anchor = practitionerAnchors[location.slug];
            return (
              <article
                key={location.slug}
                id={anchor}
                aria-labelledby={`${anchor}-name`}
                className="flex flex-1 scroll-mt-28 flex-col overflow-hidden rounded-[30px] bg-white text-center shadow-[0_0_0_1px_var(--color-brand-line)]"
              >
                <div className="h-[300px] overflow-hidden bg-white md:h-[340px]">
                  <Image
                    src={portraits[location.slug]}
                    alt={practitioner.imageAlt}
                    width={440}
                    height={540}
                    sizes="(min-width: 768px) 290px, 250px"
                    className="h-full w-full object-cover object-[center_15%]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-[22px] pb-6 pt-[22px]">
                  <p className={eyebrow}>{location.name}</p>
                  <h2 id={`${anchor}-name`} className="mt-1.5 font-heading text-[1.75rem] font-bold tracking-[-0.02em] text-brand-charcoal">
                    {practitioner.name}
                  </h2>
                  <p className="text-[0.9375rem] text-brand-muted">{practitioner.role}</p>
                  <CredentialChips credentials={practitioner.credentials} />
                  <p className="mt-2.5 flex-1 leading-[1.55] text-brand-muted">{practitioner.intro}</p>
                  <Link href={location.href} className={`${arrowLink} mt-3 self-center`}>
                    {location.name} home visits <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {founderStory.length ? (
        <section className="mx-auto max-w-xl px-6 pt-14 text-center md:pt-20" aria-labelledby="story-heading">
          <h2 id="story-heading" className={eyebrow}>
            Why Foot+
          </h2>
          <div className="mt-4 space-y-4 text-lg leading-[1.6] text-brand-charcoal">
            {founderStory.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-4 font-semibold text-brand-sageDeep">Adam James, founder</p>
        </section>
      ) : null}

      <section className="mx-auto max-w-2xl px-[22px] pb-10 pt-14 text-center md:pt-20" aria-labelledby="standard-heading">
        <h2 id="standard-heading" className={eyebrow}>
          The Foot+ standard
        </h2>
        <StandardsSpotlight standards={homeStandards} />
      </section>

      <section
        className={`${texturedGreen} mx-3.5 rounded-[28px] px-6 py-11 text-center md:mx-auto md:max-w-3xl md:px-14 md:py-16`}
        aria-labelledby="help-heading"
      >
        <span className="pointer-events-none absolute left-4 top-3.5 font-heading text-3xl font-semibold text-brand-sageLight/50" aria-hidden="true">+</span>
        <span className="pointer-events-none absolute bottom-4 right-[18px] font-heading text-[2.75rem] font-semibold leading-none text-brand-sageLight/60" aria-hidden="true">+</span>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageLight">Help with your visit</p>
        <h2 id="help-heading" className="mt-3 font-heading text-[1.875rem] font-bold leading-[1.08] tracking-[-0.02em] md:text-5xl">
          Tell us what
          <br />
          <span className="text-brand-sageLight">would help.</span>
        </h2>
        <p className="mx-auto mt-3.5 max-w-[46ch] leading-[1.55] text-white/85">
          Tell us about any mobility, communication, sensory or anxiety-related needs when you enquire. A relative, carer or
          support worker can help with arrangements or be there during the visit, with consent from the person receiving care.
        </p>
      </section>

      <section className="mx-auto max-w-xl px-6 pt-14 text-center md:pt-20" aria-labelledby="scope-heading">
        <p className={eyebrow}>Good to know</p>
        <h2 id="scope-heading" className={`${headline} mt-2.5 text-[1.875rem] leading-[1.08] md:text-5xl`}>
          Not a podiatrist, <span className="text-brand-sage">and we&rsquo;ll say so.</span>
        </h2>
        <p className="mt-3 leading-[1.55] text-brand-muted">
          Foot Health Practitioners are not HCPC-registered podiatrists or chiropodists, and Foot+ does not use those titles.
          If something needs a podiatrist or your GP, we will tell you.
        </p>
        <Link href="/advice/foot-health-practitioner-podiatrist-or-chiropodist" className={`${arrowLink} mt-2`}>
          Practitioner, podiatrist or chiropodist? <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="mx-auto max-w-xl px-[18px] pb-16 pt-12 text-center md:pb-24" aria-labelledby="area-heading">
        <p className={eyebrow}>Book a home visit</p>
        <h2 id="area-heading" className={`${headline} mt-2.5 text-[2.125rem] leading-[1.06] md:text-5xl`}>
          Choose your <span className="text-brand-sage">area.</span>
        </h2>
        <div className="mt-6 flex gap-2">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={location.href}
              className={`flex-1 rounded-3xl bg-white px-2.5 py-[18px] shadow-[0_0_0_1px_var(--color-brand-line)] transition-shadow hover:shadow-[0_0_0_1.5px_var(--color-brand-sage)] ${focusRing}`}
            >
              <span className="block font-heading text-xl font-semibold text-brand-charcoal">{location.name}</span>
              <span className="text-[0.8125rem] text-brand-muted">with {location.practitioner?.name.split(" ")[0]}</span>
            </Link>
          ))}
        </div>
        <Link
          href="/book"
          className={`mt-2.5 flex h-[52px] items-center justify-center rounded-full bg-brand-sageDark px-7 font-semibold text-white transition-colors duration-150 hover:bg-brand-sageDeep ${focusRing}`}
          data-analytics-id="about-close-book"
        >
          Request a visit
        </Link>
      </section>
    </div>
  );
}
