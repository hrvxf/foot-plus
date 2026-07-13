import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Activity, Footprints, HeartPulse, Scissors, ShieldCheck, UsersRound } from "lucide-react";
import Button from "../components/Button";
import { bookingHref, BUSINESS_ID, SITE_URL } from "../lib/site";

const serviceSections = [
  {
    label: "Start here",
    title: "New Patient Assessment",
    summary: "A first home appointment to understand your foot health, medical history and current concerns before treatment begins.",
    duration: "Approximately 60 minutes",
    checklist: [
      "Foot health and medical history",
      "Neurovascular checks where appropriate",
      "Treatment and practical aftercare advice",
    ],
    featured: true,
  },
  {
    label: "Ongoing care",
    title: "Routine Foot Care",
    summary: "Regular professional care for nails, skin, hard skin or callus concerns that affect everyday comfort and mobility.",
    duration: "Approximately 45 minutes",
    checklist: [
      "Routine nail and skin care",
      "Hard-skin and callus management",
      "Advice to maintain comfort between visits",
    ],
    featured: false,
  },
  {
    label: "Prevention focused",
    title: "Diabetic Foot Checks",
    summary: "Structured home-visit support for people with diabetes who want calm, preventative checks and clear guidance.",
    duration: "Included where clinically appropriate",
    checklist: [
      "Skin, nail and pressure review",
      "Circulation and sensation guidance",
      "Advice on changes to monitor",
    ],
    featured: false,
  },
];

const conditionCards = [
  {
    title: "Hard Skin & Calluses",
    description: "Support for thickened skin, pressure points and recurring callus that can make walking uncomfortable.",
    href: "/hard-skin-treatment-bristol",
    icon: Footprints,
  },
  {
    title: "Corns",
    description: "Assessment and careful care for focused pressure points that may feel sharp or tender in shoes.",
    href: "/corn-removal-bristol",
    icon: Activity,
  },
  {
    title: "Cracked Heels",
    description: "Help with dry, hard or fissured heel skin, including practical moisturising and aftercare advice.",
    href: "/cracked-heels-bristol",
    icon: HeartPulse,
  },
  {
    title: "Thickened Toenails",
    description: "Professional nail care for thicker or awkward nails that are difficult to manage safely at home.",
    href: "/toenail-cutting-bristol",
    icon: ShieldCheck,
  },
  {
    title: "Toenail Cutting and Nail Care",
    description: "Routine toenail cutting and foot care in your home, focused on comfort rather than cosmetic pedicure.",
    href: "/toenail-cutting-bristol",
    icon: Scissors,
  },
];

const inclusiveCarePoints = [
  "Clear explanations at a comfortable pace",
  "Treatment provided in familiar surroundings",
  "Carers, relatives and support workers are welcome",
  "Individual communication and sensory needs considered",
  "Dignity, consent and personal choice respected",
];

const serviceFaqs = [
  {
    question: "Do you provide foot care for adults with learning disabilities?",
    answer:
      "Yes. Home visits can be adapted for adults who need additional time, reassurance or communication support. Please explain any individual needs when arranging the appointment so the visit can be planned appropriately.",
  },
  {
    question: "Can a carer or support worker be present during the appointment?",
    answer:
      "Yes. A relative, carer or support worker is welcome to be present where this helps the patient feel comfortable and supports communication or practical arrangements.",
  },
  {
    question: "Can the appointment be adapted for someone who feels anxious?",
    answer:
      "Appointments are provided calmly and at an appropriate pace. You can share relevant communication, sensory or anxiety-related needs before the visit.",
  },
  {
    question: "Do you support vulnerable adults in Bristol?",
    answer:
      "Foot+ provides respectful home-visit foot care for adults who may need additional support, including people with reduced mobility, learning disabilities or help from relatives, carers and support workers.",
  },
];

const servicesSchema = serviceSections.map((section) => ({
  "@type": "Service",
  "@id": `${SITE_URL}/services#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  name: section.title,
  serviceType: section.title,
  areaServed: {
    "@type": "City",
    name: "Bristol",
  },
  provider: {
    "@id": BUSINESS_ID,
  },
  url: `${SITE_URL}/services`,
}));

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": BUSINESS_ID,
      name: "Foot+ Bristol",
      url: SITE_URL,
      areaServed: {
        "@type": "City",
        name: "Bristol",
      },
      makesOffer: servicesSchema.map((service) => ({ "@id": service["@id"] })),
    },
    ...servicesSchema,
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/services#faq`,
      mainEntity: serviceFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export const metadata: Metadata = {
  title: "Foot Care Services in Bristol | Home Visits",
  description:
    "Explore home-visit foot care services in Bristol, including routine care, diabetic foot checks and adaptable appointments for adults who may need additional support.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    url: `${SITE_URL}/services`,
    title: "Foot Care Services in Bristol | Home Visits",
    description:
      "Explore home-visit foot care services in Bristol, including routine care, diabetic foot checks and adaptable appointments for adults who may need additional support.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function CheckIcon({ className = "text-brand-sageDark" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 shrink-0 ${className}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M16.25 5.75 8.5 13.5 4.75 9.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FootPlusHeroIcon() {
  return (
    <Image
      src="/android-chrome-512x512.png"
      alt=""
      aria-hidden="true"
      width={112}
      height={112}
      className="h-auto w-[clamp(84px,7vw,88px)] object-contain opacity-[0.58] mix-blend-multiply"
      priority={false}
    />
  );
}

export default function ServicesPage() {
  return (
    <main className="bg-brand-offwhite">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-6 md:pb-16 md:pt-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-brand-charcoal/65">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link className="font-semibold text-brand-sageDark underline underline-offset-4" href="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Services</li>
          </ol>
        </nav>

        <div className="relative overflow-hidden rounded-[32px] border border-brand-sageLight/35 bg-white p-6 sm:p-8 md:p-10">
          <div className="pointer-events-none absolute right-[-4rem] top-[-5rem] hidden h-72 w-72 rounded-full bg-brand-sageLight/18 lg:block" />
          <div className="pointer-events-none absolute bottom-[-5.5rem] right-20 hidden h-44 w-44 rounded-full border border-brand-sageDark/15 lg:block" />
          <div className="pointer-events-none absolute right-[4.25rem] top-[3.75rem] hidden lg:block">
            <FootPlusHeroIcon />
          </div>

          <div className="relative max-w-[65rem] lg:max-w-[62%]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-sageDark/75">
              HOME VISIT FOOT CARE IN BRISTOL
            </p>
            <h1 className="mt-3 max-w-[900px] font-heading text-[clamp(2.6rem,5vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-brand-sageDark">
              Foot care services in your home
            </h1>
            <p className="mt-4 max-w-[660px] text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.55] text-brand-charcoal/75">
              Professional support for routine foot care, diabetic foot checks and common skin and nail concerns.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={bookingHref} variant="solid" className="w-full rounded-full sm:w-auto">
                Book an appointment
              </Button>
              <Button href="/prices" variant="outline" className="w-full rounded-full sm:w-auto">
                View prices
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-6 md:pb-16" aria-labelledby="appointments-heading">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-sageDark/75">Appointment types</p>
          <h2 id="appointments-heading" className="mt-2 font-heading text-2xl font-semibold tracking-tight text-brand-sageDark sm:text-3xl">
            Choose the right starting point
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/72 sm:text-base">
            If you are new to Foot+, begin with a New Patient Assessment. Follow-up routine care can then be planned around your needs.
          </p>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {serviceSections.map((section) => (
            <article key={section.title} className={`flex h-full flex-col overflow-hidden rounded-[28px] border bg-white ${section.featured ? "border-brand-sageDark/35 ring-1 ring-brand-sageDark/10" : "border-brand-sageLight/35"}`}>
              <div className={`border-b px-5 py-5 sm:px-6 ${section.featured ? "border-brand-sageDark/15 bg-brand-sageDark text-white" : "border-brand-sageLight/30 bg-brand-sageLight/14 text-brand-sageDark"}`}>
                <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${section.featured ? "border-white/35 bg-white/12 text-white" : "border-brand-sageDark/20 bg-white/70 text-brand-sageDark"}`}>
                  {section.label}
                </span>
                <h3 className="mt-4 font-heading text-2xl font-semibold tracking-tight">{section.title}</h3>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-brand-charcoal/76 sm:text-base">{section.summary}</p>
                <p className="mt-3 text-sm font-semibold text-brand-sageDark">{section.duration}</p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-brand-charcoal/78">
                  {section.checklist.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-sageLight/20"><CheckIcon /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {section.featured && <div className="mt-auto pt-7"><Button href={bookingHref} variant="solid" className="w-full rounded-full">Book your first appointment</Button></div>}
              </div>
            </article>
          ))}
        </div>
      </section>


      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-6 md:pb-16" aria-labelledby="inclusive-care-heading">
        <div className="overflow-hidden rounded-[28px] border border-brand-sageLight/40 bg-brand-sageLight/16 shadow-[0_18px_50px_-48px_rgba(15,23,42,0.22)]">
          <div className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-10">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-sageDark/75">INCLUSIVE HOME VISITS</p>
              <h2 id="inclusive-care-heading" className="mt-2 font-heading text-2xl font-semibold tracking-tight text-brand-sageDark sm:text-3xl">
                Foot care for adults who need additional support
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-charcoal/78 sm:text-base">
                Foot+ provides calm, respectful home visits for adults who may need additional time, reassurance or communication support. Appointments can be adapted for people with learning disabilities, reduced mobility, anxiety or other support needs.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-brand-charcoal/75 sm:text-base">
                This includes foot care for adults with learning disabilities in Bristol, foot care for adults with additional needs and accessible home foot care in Bristol. Carers and support workers welcome at appointments when that helps the patient feel comfortable.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={bookingHref} variant="solid" className="w-full rounded-full sm:w-auto">
                  Discuss support needs
                </Button>
                <Button href="/advice/foot-care-learning-disabilities-bristol" variant="outline" className="w-full rounded-full sm:w-auto">
                  Read the accessible foot-care guide
                </Button>
              </div>
            </div>

            <div className="rounded-[24px] border border-brand-sageDark/15 bg-white/76 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-sageLight/22 text-brand-sageDark" aria-hidden="true">
                  <UsersRound className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-lg font-semibold tracking-tight text-brand-sageDark">How visits can be adapted</h3>
              </div>
              <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-brand-charcoal/78 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {inclusiveCarePoints.map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl border border-brand-sageLight/28 bg-white p-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-sageLight/20"><CheckIcon /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-sageLight/30 bg-brand-sageLight/18" aria-labelledby="conditions-heading">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-sageDark/75">Common foot concerns</p>
            <h2 id="conditions-heading" className="mt-2 font-heading text-2xl font-semibold tracking-tight text-brand-sageDark sm:text-3xl">
              Skin and nail concerns treated at home
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/72 sm:text-base">
              These concerns can often be assessed and cared for during a Foot+ home visit, with clear advice for comfort between appointments.
            </p>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {conditionCards.map((condition) => {
              const Icon = condition.icon;
              return (
                <Link key={`${condition.title}-${condition.href}`} href={condition.href} className="group rounded-[24px] border border-brand-sageLight/35 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-sageDark/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageLight">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-sageLight/18 text-brand-sageDark" aria-hidden="true"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 font-heading text-lg font-semibold tracking-tight text-brand-sageDark">{condition.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/72">{condition.description}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-brand-sageDark underline underline-offset-4">Learn more<span className="sr-only"> about {condition.title}</span></span>
                </Link>
              );
            })}
          </div>
          <div className="mt-6 flex flex-col gap-2 text-sm font-semibold text-brand-sageDark sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href="/callus-removal-bristol" className="underline underline-offset-4">Learn about localised callus removal</Link>
            <Link href="/foot-health-practitioner-bristol" className="underline underline-offset-4">Learn about Foot Health Practitioner home visits in Bristol</Link>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16" aria-labelledby="services-faq-heading">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-sageDark/75">Support needs FAQs</p>
          <h2 id="services-faq-heading" className="mt-2 font-heading text-2xl font-semibold tracking-tight text-brand-sageDark sm:text-3xl">
            Questions about accessible home foot care
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/72 sm:text-base">
            These answers explain how home-visit foot care for vulnerable adults and other adults who need support can be discussed before booking.
          </p>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {serviceFaqs.map((faq) => (
            <article key={faq.question} className="rounded-[24px] border border-brand-sageLight/35 bg-white p-5">
              <h3 className="font-heading text-lg font-semibold tracking-tight text-brand-sageDark">{faq.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/74">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16">
        <div className="rounded-[28px] border border-brand-sageDark/20 bg-white p-6 sm:p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-brand-sageDark sm:text-3xl">Ready to arrange home foot care?</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/75 sm:text-base">
              Book an appointment, or check pricing first if you would like to compare appointment types.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <Button href={bookingHref} variant="solid" className="w-full rounded-full sm:w-auto">Book an appointment</Button>
            <Button href="/prices" variant="outline" className="w-full rounded-full sm:w-auto">View prices</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
