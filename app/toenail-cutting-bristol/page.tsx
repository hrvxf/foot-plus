import type { Metadata } from "next";
import Link from "next/link";
import { Check, Phone, Scissors } from "lucide-react";
import {
  btnGhost,
  btnPrimary,
  container,
  eyebrow,
  h2,
  textLink,
} from "../components/site/ui";
import ClosingCta from "../components/site/ClosingCta";
import MobileActions from "../components/site/MobileActions";
import { getAdviceArticle } from "../lib/advice";
import { serviceLocations } from "../lib/locations";
import {
  ADAM_ID,
  BRISTOL_BUSINESS_ID,
  phoneDisplay,
  phoneHref,
  prices,
  SITE_URL,
} from "../lib/site";
const canonical = `${SITE_URL}/toenail-cutting-bristol`;
const title = "Toenail Cutting Bristol | At-Home Nail Care | Foot+";
const description =
  "Toenail cutting at home in Bristol with Adam James, qualified Foot Health Practitioner. First visit £60, routine visits £55. Check coverage and request a visit.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: { url: canonical, title, description },
  twitter: { title, description },
  robots: { index: true, follow: true },
};
const included = [
  "A discussion of your nail-care needs and relevant health information",
  "Foot and nail observations before care is provided",
  "Careful toenail trimming and filing of rough edges",
  "Conservative reduction of thickened nails where suitable",
  "Practical nail-care and footwear advice between visits",
  "Suitable routine skin care within the appointment, if needed",
];
const whoWeHelp = [
  {
    title: "Nails you cannot comfortably reach",
    body: "A home visit can help when bending, mobility or balance makes cutting your own toenails difficult.",
  },
  {
    title: "Thick or awkward nails",
    body: "Nails that have become hard, thickened or difficult to manage may need suitable instruments and a careful approach.",
  },
  {
    title: "Changes in eyesight or hand strength",
    body: "If seeing the nail clearly or holding clippers securely is a struggle, professional support can take over the routine care.",
  },
  {
    title: "Support for a relative or someone you care for",
    body: "You can help arrange a visit for someone else. Their preferences and consent remain central to the appointment.",
  },
];
const faqs = [
  {
    question: "How much does a toenail-cutting home visit cost?",
    answer:
      "A first appointment is £60 and takes approximately 60 minutes. A routine appointment for a returning patient is £55 and takes approximately 45 minutes. Nail care uses these appointment prices; there is no separate nail-only price. Any travel supplement is confirmed before booking.",
  },
  {
    question: "Can you visit just to help with toenail cutting?",
    answer:
      "Yes. Toenail cutting can be the main reason for your appointment. The practitioner checks suitability before care and can provide other appropriate routine nail or skin care within the visit.",
  },
  {
    question: "Can you cut thickened toenails?",
    answer:
      "Where suitable, Adam can trim and conservatively reduce thickened nails. Routine reduction manages the nail; it does not diagnose or cure every underlying cause. Unexplained changes may need assessment by another healthcare professional.",
  },
  {
    question: "Is this a pedicure or a podiatry appointment?",
    answer:
      "This is routine nail and foot care from a qualified Foot Health Practitioner. It is not a cosmetic pedicure or an appointment with an HCPC-registered podiatrist. Foot+ will explain when podiatry or medical care is more appropriate.",
  },
  {
    question: "How often will I need my toenails cut?",
    answer:
      "There is no single interval for everyone. Nail growth, footwear comfort, mobility and individual foot-health needs affect timing. Adam can discuss a suitable maintenance routine with you.",
  },
  {
    question: "Which areas of Bristol do you visit?",
    answer:
      "Foot+ visits central, north, south and east Bristol, including Clifton, Redland, Bishopston, Henleaze, Bedminster, Southville and Easton. Nearby towns may be considered by request. Exact coverage and any travel charge are confirmed from the appointment postcode.",
  },
  {
    question: "Can a relative or carer arrange and attend the visit?",
    answer:
      "Yes. A relative, carer or support worker can help enquire, coordinate access and be present, with appropriate consent from the person receiving care.",
  },
];
const advice = [
  "why-toenails-become-thick",
  "how-often-older-adults-should-cut-toenails",
  "what-happens-home-foot-health-appointment",
  "why-toenails-are-difficult-to-cut",
]
  .map(getAdviceArticle)
  .filter((article) => article !== undefined);
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Toenail cutting at home in Bristol",
      serviceType: "Routine toenail cutting and nail care",
      description,
      url: canonical,
      areaServed: { "@type": "City", name: "Bristol" },
      provider: { "@id": BRISTOL_BUSINESS_ID },
      offers: prices.map((price, index) => ({
        "@type": "Offer",
        name: price.name,
        price: price.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "GBP",
        url: `${SITE_URL}/prices`,
        description: `${index === 0 ? "First" : "Returning patient"} home-visit appointment. Any travel supplement is confirmed before booking.`,
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      name: title,
      url: canonical,
      description,
      mainEntity: { "@id": `${canonical}#service` },
      about: { "@id": BRISTOL_BUSINESS_ID },
      author: { "@id": ADAM_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Foot+ Bristol",
          item: `${SITE_URL}/locations/bristol`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Toenail cutting",
          item: canonical,
        },
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
export default function ToenailCuttingPage() {
  const adam = serviceLocations.bristol.practitioner!;
  return (
    <div className="pb-[calc(env(safe-area-inset-bottom)+88px)] md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="border-b border-brand-line bg-brand-wash">
        <div className={`${container} py-8 md:py-14`}>
          <nav aria-label="Breadcrumb" className="text-sm text-brand-muted">
            <Link href="/locations/bristol" className={textLink}>
              Foot+ Bristol
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Toenail cutting</span>
          </nav>
          <div className="mt-10 grid gap-9 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-14">
            <div>
              <p className={eyebrow}>Professional nail care · Home visits</p>
              <h1 className="mt-3 font-heading text-4xl font-semibold leading-[1.1] text-brand-sageDeep sm:text-5xl">
                Toenail cutting in Bristol, in your own home.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-muted">
                If cutting your toenails has become difficult, Foot+ can help.
                Adam James provides careful nail trimming, filing and suitable
                thickened-nail care during a professional home visit.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/book?location=bristol&service=nails"
                  className={btnPrimary}
                  data-analytics-id="nails-hero-book"
                >
                  Request a nail-care visit
                </Link>
                <a
                  href={phoneHref}
                  className={btnGhost}
                  data-analytics-id="nails-hero-phone"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {phoneDisplay}
                </a>
              </div>
              <p className="mt-5 text-sm text-brand-muted">
                Bristol appointments available.{" "}
                <Link
                  href="/locations/bristol/areas-we-cover"
                  className={textLink}
                >
                  Check your area
                </Link>
                .
              </p>
            </div>
            <aside className="rounded-3xl border border-brand-line bg-white p-7">
              <Scissors
                className="h-8 w-8 text-brand-sage"
                aria-hidden="true"
              />
              <h2 className="mt-4 font-heading text-2xl font-semibold text-brand-sageDeep">
                Clear home-visit prices
              </h2>
              <dl className="mt-5 space-y-4">
                <div className="flex justify-between gap-4">
                  <dt>
                    First visit{" "}
                    <span className="block text-sm text-brand-muted">
                      About 60 minutes
                    </span>
                  </dt>
                  <dd className="font-heading text-2xl font-semibold text-brand-sageDeep">
                    {prices[0].price}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-brand-line pt-4">
                  <dt>
                    Returning patients{" "}
                    <span className="block text-sm text-brand-muted">
                      About 45 minutes
                    </span>
                  </dt>
                  <dd className="font-heading text-2xl font-semibold text-brand-sageDeep">
                    {prices[1].price}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-sm leading-relaxed text-brand-muted">
                Nail care uses our standard appointment prices. Any travel
                supplement is confirmed before booking.
              </p>
              <Link href="/prices" className={`${textLink} mt-4 inline-block`}>
                Full prices and appointment details
              </Link>
            </aside>
          </div>
        </div>
      </section>
      <section
        className={`${container} py-12 md:py-16`}
        aria-labelledby="included-heading"
      >
        <h2 id="included-heading" className={h2}>
          What your nail-care visit includes
        </h2>
        <ul className="mt-7 grid gap-4 md:grid-cols-2">
          {included.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl border border-brand-line p-5"
            >
              <Check
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-sage"
                aria-hidden="true"
              />
              <span className="leading-relaxed text-brand-muted">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl leading-relaxed text-brand-muted">
          Nail cutting can be the main reason for your visit. Foot+ also offers{" "}
          <Link href="/services" className={textLink}>
            corn, callus, hard-skin and cracked-heel care
          </Link>
          , where suitable.
        </p>
      </section>
      <section className="border-y border-brand-line bg-brand-wash">
        <div className={`${container} py-12 md:py-16`}>
          <h2 className={h2}>Who may find a home visit helpful?</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {whoWeHelp.map((item) => (
              <div key={item.title}>
                <h3 className="font-heading text-xl font-semibold text-brand-sageDeep">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-brand-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="thickened-nails"
        className={`${container} scroll-mt-28 py-12 md:py-16`}
      >
        <h2 className={h2}>Care for thickened or difficult nails</h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-brand-muted">
          Thick nails may be awkward to cut or uncomfortable inside shoes. Where
          suitable, careful trimming and conservative reduction can help manage
          their length and bulk. Thickening has several possible causes, and
          routine care does not diagnose or cure an underlying condition.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-brand-muted">
          For painful, infected, bleeding or suddenly changing nails, or acute
          diabetes-related foot concerns, seek appropriate medical or podiatry
          advice. Foot+ provides routine care and can explain when another
          service is needed.
        </p>
        <Link
          href="/advice/why-toenails-become-thick"
          className={`${textLink} mt-5 inline-block`}
        >
          Read why toenails become thick
        </Link>
      </section>
      <section className="border-y border-brand-line bg-brand-wash">
        <div
          className={`${container} grid gap-8 py-12 md:grid-cols-2 md:py-16`}
        >
          <div>
            <p className={eyebrow}>Your Bristol practitioner</p>
            <h2 className={`${h2} mt-3`}>Nail care with {adam.name}</h2>
            <p className="mt-4 leading-relaxed text-brand-muted">
              Diploma-trained Foot Health Practitioner, MCFHP and MAFHP. Adam is
              fully insured and DBS checked, and uses sterile instruments for
              appointments.
            </p>
            <Link
              href="/about#adam-james"
              className={`${textLink} mt-5 inline-block`}
            >
              Adam’s qualifications and approach
            </Link>
          </div>
          <div>
            <h2 className={h2}>Home visits across Bristol</h2>
            <p className="mt-4 leading-relaxed text-brand-muted">
              Central, north, south and east Bristol are covered, including
              Clifton, Redland, Bishopston, Henleaze, Bedminster, Southville and
              Easton. Nearby towns are considered by request. Send the
              appointment postcode so coverage can be confirmed.
            </p>
            <Link
              href="/locations/bristol/areas-we-cover"
              className={`${textLink} mt-5 inline-block`}
            >
              See Bristol areas we cover
            </Link>
          </div>
        </div>
      </section>
      <section className={`${container} py-12 md:py-16`}>
        <h2 className={h2}>What happens next?</h2>
        <ol className="mt-7 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Request your visit",
              text: "Tell us about the nails you need help with and provide the appointment postcode.",
            },
            {
              title: "Confirm the details",
              text: "Foot+ confirms suitability, coverage, availability and cost before the visit.",
            },
            {
              title: "Receive care at home",
              text: "Adam checks your feet, provides suitable nail care and discusses aftercare with you.",
            },
          ].map((step, index) => (
            <li key={step.title} className="border-t border-brand-line pt-5">
              <p className={eyebrow}>Step {index + 1}</p>
              <h3 className="mt-3 font-heading text-xl font-semibold text-brand-sageDeep">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-brand-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section className="border-y border-brand-line bg-brand-wash">
        <div className={`${container} py-12 md:py-16`}>
          <h2 className={h2}>Questions about toenail-cutting visits</h2>
          <div className="mt-7">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="border-t border-brand-line py-5"
              >
                <summary className="cursor-pointer font-semibold text-brand-sageDeep">
                  {faq.question}
                </summary>
                <p className="mt-3 max-w-3xl leading-relaxed text-brand-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className={`${container} py-12 md:py-16`}>
        <h2 className={h2}>Useful nail-care guides</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {advice.map((article) => (
            <li
              key={article.slug}
              className="rounded-2xl border border-brand-line p-5"
            >
              <Link href={`/advice/${article.slug}`} className={textLink}>
                {article.shortTitle}
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                {article.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <ClosingCta
        bookingHref="/book?location=bristol&service=nails"
        analyticsId="nails"
        title="Request a Bristol nail-care home visit"
        text="Tell us what you need help with and where you live. We’ll confirm coverage, suitability and availability."
      />
      <MobileActions
        bookingHref="/book?location=bristol&service=nails"
        analyticsId="nails"
      />
    </div>
  );
}
