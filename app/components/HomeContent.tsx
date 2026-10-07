import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CircleDot,
  Droplets,
  Footprints,
  GraduationCap,
  HeartHandshake,
  Layers,
  Plus,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

import { publishedAdviceArticles } from "../lib/advice";
import { homeFaqs, homeServices, homeStandards, homeSteps, type HomeServiceIcon } from "../lib/home";
import { serviceLocations } from "../lib/locations";
import { phoneDisplay, phoneHref, prices } from "../lib/site";
import LaunchCountdown from "./home/LaunchCountdown";
import ClosingCta from "./site/ClosingCta";
import MobileActions from "./site/MobileActions";
import { btnGhost, btnOutlineWhite, btnPrimary, btnWhite, container, eyebrow, h2, textLink } from "./site/ui";
import PostcodeChecker from "./home/PostcodeChecker";

const serviceIcons: Record<HomeServiceIcon, LucideIcon> = {
  nail: Scissors,
  thick: Layers,
  corn: CircleDot,
  skin: Droplets,
  heel: Footprints,
  check: Stethoscope,
};

const standardIcons: LucideIcon[] = [GraduationCap, Sparkles, ShieldCheck, HeartHandshake];

const bristol = serviceLocations.bristol;
const southampton = serviceLocations.southampton;
const adam = bristol.practitioner!;
const katie = southampton.practitioner!;

const latestAdvice = [...publishedAdviceArticles]
  .sort((a, b) => Number(b.relatedServiceRoutes.some((link) => link.href === "/toenail-cutting-bristol")) - Number(a.relatedServiceRoutes.some((link) => link.href === "/toenail-cutting-bristol")) || b.dateModified.localeCompare(a.dateModified))
  .slice(0, 3);

const pricing = [
  {
    tag: "First visit",
    title: "New patient appointment",
    price: prices[0].price,
    detail: "About 60 minutes. Assessment and treatment.",
    featured: true,
  },
  {
    tag: "Returning patients",
    title: "Routine appointment",
    price: prices[1].price,
    detail: "About 45 minutes. Ongoing nail and skin care.",
    featured: false,
  },
];

export default function HomeContent() {
  return (
    <div className="pb-[calc(env(safe-area-inset-bottom)+88px)] md:pb-0">
      <Hero />
      <Locations />
      <Services />
      <PricesAndSteps />
      <Standards />
      <Advice />
      <Faq />
      <ClosingCta analyticsId="home" />
      <MobileActions analyticsId="home" />
    </div>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden" aria-labelledby="home-heading">
      <div className={`${container} grid items-center gap-10 pb-14 pt-8 md:grid-cols-[1.05fr_0.95fr] md:gap-14 md:pb-20 md:pt-14`}>
        <div>
          <p className={eyebrow}>Home-visit foot care · Bristol &amp; Southampton</p>
          <h1
            id="home-heading"
            className="mt-3 font-heading text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.01em] text-brand-sageDeep sm:text-5xl lg:text-[3.4rem]"
          >
            Professional nail and foot care, <span className="text-brand-sage">brought to your home.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-brand-muted sm:text-xl">
            Help with toenail cutting and difficult nails, alongside care for hard skin, corns and cracked heels,
            from qualified Foot Health Practitioners who come to you.
          </p>

          <p className="mt-5 text-base text-brand-muted">
            Need help with your nails? <Link href="/toenail-cutting-bristol" className={textLink}>Explore toenail-cutting home visits in Bristol</Link>.
          </p>

          <div className="mt-7 max-w-xl">
            <PostcodeChecker />
          </div>

          <p className="mt-4 text-[15px] text-brand-muted">
            Prefer to talk? Call{" "}
            <a href={phoneHref} className="font-semibold text-brand-sageDeep underline underline-offset-4" data-analytics-id="home-hero-phone">
              {phoneDisplay}
            </a>
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-medium text-brand-sageDeep" aria-label="Why choose Foot+">
            {["Qualified practitioners", "Fully insured", "DBS checked"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand-sage" aria-hidden="true" />
                {item}
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span
                className="h-3.5 w-5 rounded-sm bg-[linear-gradient(#E40303_0_16.6%,#FF8C00_0_33.3%,#FFED00_0_50%,#008026_0_66.6%,#24408E_0_83.3%,#732982_0)]"
                aria-hidden="true"
              />
              LGBTQ+ friendly
            </li>
          </ul>
        </div>

        <div className="relative mx-auto h-[380px] w-full max-w-md sm:h-[460px] md:h-[540px] md:max-w-none">
          <div
            className="absolute inset-0 overflow-hidden rounded-[2rem] bg-brand-sage bg-[url('/images/footplus-texture.png')] bg-size-[600px_600px] md:left-8"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-linear-to-br from-brand-sage/20 to-brand-sageDeep/55" />
          </div>

          <div className="absolute left-5 top-6 h-[62%] w-[58%] overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] md:left-20 md:top-10">
            <Image
              src="/images/adam-james.webp"
              alt={adam.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 320px, 60vw"
              className="object-cover object-[center_15%]"
            />
          </div>

          <div className="absolute right-4 top-6 rounded-2xl bg-brand-sageDeep px-5 py-4 text-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.5)] md:right-7 md:top-14">
            <p className="text-[13px] text-white/80">Routine visits from</p>
            <p className="font-heading text-3xl font-semibold leading-tight">
              {prices[1].price} <span className="font-body text-sm font-normal text-white/85">/ 45 min</span>
            </p>
          </div>

          <div className="absolute bottom-4 left-3 w-[78%] max-w-xs rounded-2xl bg-white px-5 py-4 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.5)] md:bottom-16 md:left-0">
            <p className="font-heading text-[17px] font-semibold text-brand-sageDeep">{adam.name}</p>
            <p className="text-sm leading-snug text-brand-muted">{adam.role} · {bristol.displayName}</p>
            <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Credentials">
              {adam.credentials.filter((c) => c !== "BA (Hons)").map((credential) => (
                <li key={credential} className="rounded-md bg-brand-wash px-2 py-0.5 text-xs font-semibold text-brand-sageDeep">
                  {credential}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section className="py-14 md:py-20" aria-labelledby="locations-heading">
      <div className={container}>
        <div className="mb-8 flex flex-col gap-3 md:mb-11 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <p className={eyebrow}>Our locations</p>
            <h2 id="locations-heading" className={h2}>Your local Foot+ service</h2>
          </div>
          <p className="max-w-md text-brand-muted">
            Each Foot+ location is run by a local, qualified practitioner. The same standards, the same promise.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          <article className="flex flex-col-reverse gap-5 rounded-[1.75rem] bg-brand-sageDark p-6 text-white sm:flex-row sm:p-8">
            <div className="flex flex-1 flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[13px] font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-200" aria-hidden="true" />
                Taking new patients
              </span>
              <h3 className="mt-4 font-heading text-3xl font-semibold">{bristol.displayName}</h3>
              <p className="mt-1 text-[15px] text-white/85">With {adam.name}, {adam.role}</p>
              <p className="mb-6 mt-3 text-white/85">
                Home visits across central, north, south and east Bristol for new and returning patients.
              </p>
              <div className="mt-auto flex flex-col gap-3 sm:flex-row md:flex-col xl:flex-row">
                <Link href="/book?location=bristol" className={btnWhite} data-analytics-id="home-location-bristol-book">
                  Book in Bristol
                </Link>
                <Link href="/locations/bristol/areas-we-cover" className={btnOutlineWhite} data-analytics-id="home-location-bristol-areas">
                  Areas we cover
                </Link>
              </div>
            </div>
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-white sm:h-auto sm:w-36 sm:rounded-2xl">
              <Image src="/images/adam-james.webp" alt="" fill sizes="144px" className="object-cover object-[center_20%]" />
            </div>
          </article>

          <article className="flex flex-col-reverse gap-5 rounded-[1.75rem] border border-brand-line bg-white p-6 sm:flex-row sm:p-8">
            <div className="flex flex-1 flex-col">
              <span className="inline-flex w-fit rounded-full bg-[#F4EBD8] px-3 py-1 text-[13px] font-semibold text-[#6E5118]">
                Opening {southampton.launchDate}
              </span>
              <h3 className="mt-4 font-heading text-3xl font-semibold text-brand-sageDeep">{southampton.displayName}</h3>
              <p className="mt-1 text-[15px] text-brand-muted">With {katie.name}, {katie.role}</p>
              <div className="mb-6 mt-4">
                <LaunchCountdown launchAt="2026-11-07T09:00:00+00:00" />
              </div>
              <div className="mt-auto flex flex-col gap-3 sm:flex-row md:flex-col xl:flex-row">
                <Link href="/book?location=southampton" className={btnPrimary} data-analytics-id="home-location-southampton">
                  Register your interest
                </Link>
              </div>
            </div>
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-white sm:h-auto sm:w-36 sm:rounded-2xl">
              <Image src="/images/katie-preston.webp" alt="" fill sizes="144px" className="object-cover object-[center_15%]" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="border-y border-brand-line bg-white py-14 md:py-20" aria-labelledby="services-heading">
      <div className={container}>
        <div className="mb-8 flex flex-col gap-3 md:mb-11 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={eyebrow}>What we treat</p>
            <h2 id="services-heading" className={h2}>Care for healthy, comfortable feet</h2>
          </div>
          <Link href="/services" className={textLink}>
            All services <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {homeServices.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <li key={service.title}>
                <Link
                  href={service.href}
                  className="group flex h-full gap-4 rounded-3xl border border-brand-line bg-brand-offwhite p-5 transition hover:border-brand-sageLight hover:bg-white sm:flex-col sm:p-7"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-wash text-brand-sageDark">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="font-heading text-xl font-semibold text-brand-sageDeep sm:mt-1">{service.title}</span>
                    <span className="mt-1.5 text-[15.5px] leading-relaxed text-brand-muted">{service.description}</span>
                    <span className="mt-4 hidden items-center gap-2 text-[15px] font-semibold text-brand-sageDeep sm:inline-flex">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function PricesAndSteps() {
  return (
    <section className="py-14 md:py-20">
      <div className={`${container} grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-14`}>
        <div>
          <p className={eyebrow}>Simple pricing</p>
          <h2 id="prices-heading" className={h2}>Clear prices, no surprises</h2>
          <ul className="mt-7 grid gap-4">
            {pricing.map((item) => (
              <li
                key={item.title}
                className={`flex flex-wrap items-center gap-x-6 gap-y-4 rounded-3xl bg-white p-5 sm:flex-nowrap sm:p-7 ${
                  item.featured ? "border-2 border-brand-sage" : "border border-brand-line"
                }`}
              >
                <p className="font-heading text-4xl font-semibold leading-none text-brand-sageDeep sm:text-[2.75rem]">{item.price}</p>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-brand-sage">{item.tag}</p>
                  <h3 className="font-heading text-xl font-semibold text-brand-sageDeep">{item.title}</h3>
                  <p className="text-[15px] text-brand-muted">{item.detail}</p>
                </div>
                <Link href="/book" className={`${item.featured ? btnPrimary : btnGhost} h-11 w-full sm:w-auto`}>
                  Book
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/prices" className={`${textLink} mt-5 text-[15px]`}>
            Full price details <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div>
          <p className={eyebrow}>How it works</p>
          <h2 id="steps-heading" className={h2}>Three easy steps</h2>
          <ol className="mt-5">
            {homeSteps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[3.25rem_1fr] gap-4 border-b border-brand-line py-5 last:border-b-0">
                <span
                  className="flex h-13 w-13 items-center justify-center rounded-full border-[1.5px] border-brand-sageLight font-heading text-lg font-semibold text-brand-sageDark"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-brand-sageDeep">{step.title}</h3>
                  <p className="text-[15.5px] leading-relaxed text-brand-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Standards() {
  return (
    <section
      className="relative isolate overflow-hidden bg-brand-sage bg-[url('/images/footplus-texture.png')] bg-size-[600px_600px] text-white"
      aria-labelledby="standards-heading"
    >
      <div className="absolute inset-0 -z-10 bg-brand-sageDeep/75" aria-hidden="true" />
      <div className={`${container} grid items-center gap-10 py-14 md:grid-cols-[1fr_1.3fr] md:gap-16 md:py-20`}>
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85">The Foot+ standard</p>
          <h2 id="standards-heading" className="mt-2 font-heading text-[1.9rem] font-semibold leading-tight sm:text-4xl">
            Calm, respectful care in familiar surroundings
          </h2>
          <p className="mt-4 text-white/90">
            Every visit is unhurried, clearly explained and led by what matters to you.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Professional memberships">
            {["College of Foot Health Practitioners", "Association of Foot Health Practitioners"].map((body) => (
              <li key={body} className="rounded-xl border border-white/40 px-3 py-2 text-sm font-semibold">
                {body}
              </li>
            ))}
          </ul>
        </div>
        <ul className="grid gap-3.5 sm:grid-cols-2">
          {homeStandards.map((standard, index) => {
            const Icon = standardIcons[index] ?? ShieldCheck;
            return (
              <li key={standard.title} className="flex gap-3.5 rounded-2xl border border-white/25 bg-white/10 p-5">
                <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">{standard.title}</h3>
                  <p className="mt-0.5 text-[15px] leading-snug text-white/85">{standard.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Advice() {
  if (latestAdvice.length === 0) return null;

  return (
    <section className="py-14 md:py-20" aria-labelledby="advice-heading">
      <div className={container}>
        <div className="mb-8 flex flex-col gap-3 md:mb-11 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={eyebrow}>Foot-health advice</p>
            <h2 id="advice-heading" className={h2}>Practical guides from our practitioners</h2>
          </div>
          <Link href="/advice" className={textLink}>
            All advice <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
          {latestAdvice.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/advice/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-line bg-white transition hover:border-brand-sageLight"
              >
                <span className="relative block h-24 overflow-hidden bg-brand-wash md:h-36" aria-hidden="true">
                  <Image
                    src="/images/foot-health-practitioner-home-visit-bristol.png"
                    alt=""
                    width={120}
                    height={220}
                    className="absolute -top-3 right-6 h-[150%] w-auto opacity-50"
                  />
                </span>
                <span className="flex flex-1 flex-col p-5 md:p-6">
                  <span className="w-fit rounded-full bg-brand-wash px-2.5 py-0.5 text-[12.5px] font-semibold text-brand-sageDeep">
                    {article.category}
                  </span>
                  <span className="mt-3 font-heading text-lg font-semibold leading-snug text-brand-sageDeep group-hover:underline group-hover:underline-offset-4">
                    {article.shortTitle}
                  </span>
                  <span className="mt-auto pt-3 text-sm text-brand-muted">{article.readingTime} · Adam James</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="pb-14 md:pb-20" aria-labelledby="faq-heading">
      <div className={`${container} grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16`}>
        <div>
          <p className={eyebrow}>Questions</p>
          <h2 id="faq-heading" className={h2}>Good to know before your visit</h2>
          <p className="mt-4 text-brand-muted">
            Can&rsquo;t see your question? Call{" "}
            <a href={phoneHref} className="font-semibold text-brand-sageDeep underline underline-offset-4">
              {phoneDisplay}
            </a>
            .
          </p>
        </div>
        <div className="border-t border-brand-line">
          {homeFaqs.map((faq, index) => (
            <details key={faq.question} className="group border-b border-brand-line" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-lg font-semibold text-brand-sageDeep [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-wash transition group-open:rotate-45" aria-hidden="true">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-5 leading-relaxed text-brand-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
