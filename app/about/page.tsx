import type { Metadata } from "next";
import Link from "next/link";
import { serviceLocations } from "../lib/locations";
import { homeStandards } from "../lib/home";
import { ADAM_ID, BUSINESS_ID, SITE_URL } from "../lib/site";
import {
  btnPrimary,
  container,
  eyebrow,
  h2,
  textLink,
} from "../components/site/ui";
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
export default function AboutPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="border-b border-brand-line bg-brand-wash">
        <div className={`${container} py-10 md:py-16`}>
          <nav aria-label="Breadcrumb" className="text-sm text-brand-muted">
            <Link href="/" className={textLink}>
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">About Foot+</span>
          </nav>
          <p className={`${eyebrow} mt-9`}>
            Your practitioners · Our standards
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-semibold leading-tight text-brand-sageDeep md:text-5xl">
            Professional nail and foot care, with a person you know.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-muted">
            Foot+ brings routine nail and skin care to your home. Each location
            has a local, qualified Foot Health Practitioner, with clear
            information about who will visit and what care they provide.
          </p>
        </div>
      </section>
      <section
        className={`${container} py-12 md:py-16`}
        aria-labelledby="practitioners-heading"
      >
        <h2 id="practitioners-heading" className={h2}>
          Meet your Foot Health Practitioners
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {Object.values(serviceLocations).map((location) => {
            const practitioner = location.practitioner!;
            return (
              <article
                id={
                  location.slug === "bristol" ? "adam-james" : "katie-preston"
                }
                key={location.slug}
                className="scroll-mt-28 rounded-3xl border border-brand-line p-6 md:p-8"
              >
                <p className={eyebrow}>{location.displayName}</p>
                <h3 className="mt-3 font-heading text-2xl font-semibold text-brand-sageDeep">
                  {practitioner.name}
                </h3>
                <p className="mt-2 font-medium text-brand-muted">
                  {practitioner.role}
                </p>
                <p className="mt-3 text-sm font-semibold text-brand-sageDeep">
                  {practitioner.credentials
                    .filter(
                      (credential) =>
                        credential !== "BA (Hons)" && credential !== "BSc",
                    )
                    .join(" · ")}
                </p>
                <div className="mt-5 space-y-4 leading-relaxed text-brand-muted">
                  {location.slug === "bristol" ? (
                    practitioner.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))
                  ) : (
                    <p>
                      Katie Preston is the practitioner for Foot+ Southampton,
                      opening on 7 November 2026. Register your interest with
                      your postcode to discuss the routine nail and skin care
                      you need.
                    </p>
                  )}
                </div>
                <Link
                  href={`/locations/${location.slug}`}
                  className={`${textLink} mt-5 inline-block`}
                >
                  {location.slug === "bristol"
                    ? "Bristol home visits and availability"
                    : "Southampton launch information"}
                </Link>
                {location.slug === "bristol" ? (
                  <p className="mt-4">
                    <Link href="/toenail-cutting-bristol" className={textLink}>
                      Toenail-cutting home visits with Adam
                    </Link>
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
      <section className="border-y border-brand-line bg-brand-wash">
        <div className={`${container} py-12 md:py-16`}>
          <h2 className={h2}>What the qualifications mean</h2>
          <div className="mt-6 max-w-3xl space-y-4 leading-relaxed text-brand-muted">
            <p>
              Dip FH indicates a Diploma in Foot Health. MCFHP and MAFHP
              indicate membership of the College of Foot Health Practitioners
              and the Association of Foot Health Practitioners.
            </p>
            <p>
              Foot Health Practitioners provide routine nail and skin care
              within their training and scope. Foot+ services include toenail
              cutting, suitable thickened-nail reduction, hard skin and callus
              care, corn care and cracked-heel maintenance.
            </p>
            <p>
              A Foot Health Practitioner is different from an HCPC-registered
              podiatrist or chiropodist. Foot+ does not use those titles.
              Concerns needing diagnosis, complex treatment, nail surgery or
              urgent medical care should be assessed by the appropriate service.
            </p>
            <Link href="/services" className={textLink}>
              Explore the full service offering and scope
            </Link>
          </div>
        </div>
      </section>
      <section className={`${container} py-12 md:py-16`}>
        <h2 className={h2}>The Foot+ standard</h2>
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          {homeStandards.map((standard) => (
            <div
              key={standard.title}
              className="border-t border-brand-line pt-5"
            >
              <h3 className="font-heading text-xl font-semibold text-brand-sageDeep">
                {standard.title}
              </h3>
              <p className="mt-3 leading-relaxed text-brand-muted">
                {standard.body}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-7 max-w-3xl leading-relaxed text-brand-muted">
          Tell us about any mobility, communication, sensory or anxiety-related
          needs when enquiring. A relative, carer or support worker can help
          with arrangements or be present, with appropriate consent from the
          person receiving care.
        </p>
      </section>
      <section className="border-t border-brand-line bg-brand-wash">
        <div className={`${container} py-12 md:py-16`}>
          <h2 className={h2}>Choose your local home-visit service</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-brand-muted">
            Bristol appointments are available now. Southampton opens on 7
            November 2026. Check{" "}
            <Link href="/prices" className={textLink}>
              appointment prices
            </Link>{" "}
            and{" "}
            <Link href="/locations/bristol/areas-we-cover" className={textLink}>
              Bristol coverage
            </Link>{" "}
            before requesting a visit.
          </p>
          <Link href="/locations" className={`${btnPrimary} mt-6`}>
            Choose your location
          </Link>
        </div>
      </section>
    </div>
  );
}
