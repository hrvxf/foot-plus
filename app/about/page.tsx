import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, HandHeart, Info, ShieldCheck, Sparkles, Users, type LucideIcon } from "lucide-react";

import LgbtqFriendly from "../components/site/LgbtqFriendly";
import { Breadcrumb, ClosingBand, portraits } from "../components/site/blocks";
import { body, displayH1, displayH2, displayH3, lead, linkQuiet, rule, shell, supporting } from "../components/site/ui";
import { founderStory, outsideScope, qualificationTerms, withinScope } from "../lib/about";
import { homeStandards } from "../lib/home";
import { serviceLocations } from "../lib/locations";
import { ADAM_ID, BUSINESS_ID, SITE_URL } from "../lib/site";
const canonical = `${SITE_URL}/about`;
const title = "About Foot+ | Our Foot Health Practitioners";
const description =
  "Meet Adam James in Bristol and Katie Preston in Southampton. Learn about Foot+ qualifications, professional standards and routine home nail and foot care.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical },
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
const section = "py-12 md:py-20";

// Anchor ids are linked from elsewhere (e.g. "/about#adam-james"), so keep them stable.
const practitionerAnchors = { bristol: "adam-james", southampton: "katie-preston" } as const;

const practitionerLinks = {
  bristol: [
    { label: "Bristol home visits", href: "/locations/bristol" },
    { label: "Toenail cutting in Bristol", href: "/toenail-cutting-bristol" },
  ],
  southampton: [
    { label: "Southampton home visits", href: "/locations/southampton" },
    { label: "Toenail cutting in Southampton", href: "/toenail-cutting-southampton" },
  ],
} as const;

// Used for a practitioner with no bio yet in app/lib/locations.ts.
const fallbackBio = {
  bristol: "Adam James is the practitioner for Foot+ Bristol.",
  southampton: "Katie Preston is the practitioner for Foot+ Southampton.",
} as const;

const standardIcons: Record<string, LucideIcon> = {
  "Qualified practitioners": ShieldCheck,
  "Sterile instruments": Sparkles,
  "Insured and DBS checked": Check,
  "Inclusive by default": Users,
};

export default function AboutPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section aria-labelledby="about-heading">
        <div className={`${shell} pb-12 pt-4 md:pb-16 lg:pb-20`}>
          <Breadcrumb current="About Foot+" />
          <h1 id="about-heading" className={`${displayH1} mt-4 max-w-[20ch] lg:mt-8`}>
            Professional nail and foot care, with a person you know
          </h1>
          <p className={`${lead} mt-4 max-w-[60ch] md:mt-6`}>
            Foot+ brings routine nail and skin care to your home. Each location has its own local, qualified Foot
            Health Practitioner, so you know who will visit.
          </p>
        </div>
      </section>

      <section className={`bg-white ${section}`} aria-labelledby="practitioners-heading">
        <div className={shell}>
          <h2 id="practitioners-heading" className={displayH2}>
            Meet your practitioners
          </h2>
          <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2">
            {Object.values(serviceLocations).map((location) => {
              const practitioner = location.practitioner;
              if (!practitioner) return null;
              const bio = practitioner.bio.length ? practitioner.bio : [fallbackBio[location.slug]];
              return (
                <article
                  key={location.slug}
                  id={practitionerAnchors[location.slug]}
                  className="flex scroll-mt-28 flex-col rounded-2xl border border-brand-line bg-white p-6 md:p-8"
                  aria-labelledby={`${practitionerAnchors[location.slug]}-name`}
                >
                  <div className="flex items-center gap-5">
                    <Image
                      src={portraits[location.slug]}
                      alt={practitioner.imageAlt}
                      width={176}
                      height={208}
                      sizes="(min-width: 768px) 128px, 96px"
                      className="h-28 w-24 shrink-0 rounded-xl object-cover object-[center_15%] md:h-36 md:w-32"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-brand-sageDark">{location.displayName}</p>
                      <h3
                        id={`${practitionerAnchors[location.slug]}-name`}
                        className="mt-1 font-heading text-2xl font-semibold leading-tight text-brand-sageDeep"
                      >
                        {practitioner.name}
                      </h3>
                      <p className={`${supporting} mt-1`}>{practitioner.role}</p>
                      <p className="mt-1 text-[0.9375rem] italic leading-6 tracking-[0.01em] text-brand-sageDark">
                        {practitioner.credentials.join(" · ")}
                      </p>
                    </div>
                  </div>
                  <div className={`${body} mt-6 space-y-4 border-t ${rule} pt-6`}>
                    {bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <ul className="mt-auto flex flex-wrap gap-x-6 pt-4">
                    {practitionerLinks[location.slug].map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={linkQuiet}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {founderStory.length ? (
        <section className={section} aria-labelledby="story-heading">
          <div className={`${shell} grid gap-6 lg:grid-cols-12 lg:gap-12`}>
            <h2 id="story-heading" className={`${displayH2} lg:col-span-4`}>
              Why Foot+
            </h2>
            <div className={`${body} space-y-4 lg:col-span-8`}>
              {founderStory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="font-semibold text-brand-sageDeep">Adam James, founder</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className={`border-t ${rule} ${founderStory.length ? "bg-white" : ""} ${section}`} aria-labelledby="qualifications-heading">
        <div className={shell}>
          <h2 id="qualifications-heading" className={displayH2}>
            What the qualifications mean
          </h2>
          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {qualificationTerms.map((item) => (
              <div key={item.term} className="rounded-xl bg-brand-wash p-5">
                <dt className="font-heading text-2xl font-semibold text-brand-sageDeep">{item.term}</dt>
                <dd className={`${supporting} mt-1`}>{item.meaning}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className={displayH3}>What we can help with</h3>
              <ul className="mt-4 grid gap-2.5">
                {withinScope.map((item) => (
                  <li key={item} className={`${body} flex items-start gap-3`}>
                    <Check className="mt-1 h-5 w-5 shrink-0 text-brand-sageDark" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={displayH3}>When we will point you elsewhere</h3>
              <ul className="mt-4 grid gap-2.5">
                {outsideScope.map((item) => (
                  <li key={item} className={`${body} flex items-start gap-3`}>
                    <Info className="mt-1 h-5 w-5 shrink-0 text-brand-sageDark" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className={`${supporting} mt-4`}>
                Foot Health Practitioners are not HCPC-registered podiatrists or chiropodists, and Foot+ does not use
                those titles. If something needs a podiatrist or your GP, we will tell you.
              </p>
            </div>
          </div>
          <Link href="/services" className={`${linkQuiet} mt-6`}>
            All services <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className={`border-t ${rule} ${founderStory.length ? "" : "bg-white"} ${section}`} aria-labelledby="standards-heading">
        <div className={shell}>
          <h2 id="standards-heading" className={displayH2}>
            The Foot+ standard
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {homeStandards.map((standard) => {
              const Icon = standardIcons[standard.title] ?? Check;
              return (
                <li key={standard.title} className="rounded-xl border border-brand-line bg-white p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-wash text-brand-sageDeep" aria-hidden="true">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className={`${displayH3} mt-4`}>{standard.title}</h3>
                  <p className={`${supporting} mt-1`}>{standard.body}</p>
                  {standard.title === "Inclusive by default" ? <LgbtqFriendly className="mt-3" /> : null}
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-brand-wash p-6 sm:flex-row sm:items-start md:p-8">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-sageDeep" aria-hidden="true">
              <HandHeart className="h-5 w-5" />
            </span>
            <div>
              <h3 className={displayH3}>Help with your visit</h3>
              <p className={`${body} mt-2 max-w-[65ch]`}>
                Tell us about any mobility, communication, sensory or anxiety-related needs when you enquire. A
                relative, carer or support worker can help with arrangements or be there during the visit, with
                consent from the person receiving care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ClosingBand
        id="about-closing"
        heading="Book a home visit"
        text="Choose Bristol or Southampton to check your postcode and request a visit."
        action={{ label: "Choose your location", href: "/locations" }}
      />
    </div>
  );
}
