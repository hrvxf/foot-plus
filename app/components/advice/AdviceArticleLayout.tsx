import Image from "next/image";
import Link from "next/link";
import AdviceJumpBar from "./AdviceJumpBar";
import AdviceTracker, { AdviceTrackedLink } from "./AdviceTracker";
import { AdviceArticle, AdviceLink, AdviceNextStep, AdviceSection, getAdviceArticle, getAdviceNextStep } from "../../lib/advice";
import { focusRing, texturedGreen } from "../site/ui";

// Nov 2026 redesign: short answer first, a sticky "jump to" bar, sections as cards, safety in amber.

function sectionId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Last third of the title in sage, as in every page heading on the site. */
function TwoToneTitle({ title }: { title: string }) {
  const words = title.split(" ");
  const tail = Math.max(1, Math.ceil(words.length / 3));
  return (
    <>
      {words.slice(0, -tail).join(" ")} <span className="text-brand-sage">{words.slice(-tail).join(" ")}</span>
    </>
  );
}

const amberEdge = "shadow-[0_0_0_1px_var(--color-brand-line),inset_4px_0_0_#B08A3E]";
const card = "rounded-[22px] bg-white shadow-[0_0_0_1px_var(--color-brand-line)]";

function PlusList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={item}
          className={`flex gap-3 py-[11px] text-[0.96875rem] leading-[1.5] text-[#36433b] ${index ? "border-t border-brand-line" : ""}`}
        >
          <span aria-hidden="true" className="font-heading text-[1.1875rem] font-semibold leading-[1.2] text-brand-sage">
            +
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function AdviceSafetyNotice() {
  return (
    <aside className={`mx-3.5 mt-5 rounded-[22px] bg-white px-5 py-[18px] sm:mx-auto sm:max-w-2xl ${amberEdge}`}>
      <h2 className="font-heading text-base font-semibold text-brand-charcoal">Safety note</h2>
      <p className="mt-2 text-sm leading-[1.55] text-brand-muted">
        This guide provides general information only. It does not diagnose your foot concern.
      </p>
      <p className="mt-2 text-sm leading-[1.55] text-brand-muted">
        If you need help urgently, contact your GP or call NHS 111. Call 999 for a medical emergency. If you have diabetes and
        notice a new wound, redness, swelling or colour change on your foot, seek same-day advice from your GP, diabetes team or
        NHS 111.
      </p>
    </aside>
  );
}

function SectionLinks({ links, slug }: { links: AdviceLink[]; slug: string }) {
  const shown = links.filter((link) => link.kind !== "about" && link.kind !== "book");
  if (!shown.length) return null;
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1">
      {shown.map((link) => (
        <AdviceTrackedLink
          key={link.href + link.label}
          href={link.href}
          eventName={link.kind === "article" ? "advice_related_article_click" : "advice_service_link_click"}
          params={{ article_slug: slug, cta_type: link.kind || "service", position: "inline" }}
          className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-semibold text-brand-sageDeep ${focusRing}`}
        >
          {link.label} <span aria-hidden="true">→</span>
        </AdviceTrackedLink>
      ))}
    </div>
  );
}

function Section({ section, slug }: { section: AdviceSection; slug: string }) {
  const warning = section.tone === "warning";
  const hasCards = Boolean(section.list?.length || section.subsections?.length);
  return (
    <section id={sectionId(section.heading)} className="scroll-mt-40 px-[18px] pt-9 sm:mx-auto sm:max-w-2xl">
      <h2 className="px-2 text-center font-heading text-2xl font-semibold leading-[1.15] tracking-[-0.015em] text-brand-charcoal md:text-3xl">
        {section.heading}
      </h2>
      {section.body.length ? (
        warning && section.list?.length ? null : hasCards ? (
          // A short lead-in ("If you can see and reach your nails comfortably:") sits under the heading.
          section.body.map((paragraph) => (
            <p key={paragraph} className="mt-2 text-center text-[0.9375rem] leading-[1.55] text-brand-muted">
              {paragraph}
            </p>
          ))
        ) : (
          <div className={`mt-3.5 px-5 py-[18px] ${warning ? `rounded-[22px] bg-white ${amberEdge}` : card}`}>
            {section.body.map((paragraph, index) => (
              <p key={paragraph} className={`text-[0.96875rem] leading-[1.6] text-[#36433b] ${index ? "mt-3" : ""}`}>
                {paragraph}
              </p>
            ))}
          </div>
        )
      ) : null}
      {section.list?.length ? (
        <div className={`mt-3.5 rounded-[22px] bg-white px-5 py-1.5 ${warning ? amberEdge : "shadow-[0_0_0_1px_var(--color-brand-line)]"}`}>
          {/* Safety sections keep their lead-in inside the amber card, so a warning can't be skimmed past. */}
          {warning
            ? section.body.map((paragraph) => (
                <p key={paragraph} className="border-b border-brand-line pb-3 pt-3.5 text-[0.96875rem] font-medium leading-[1.55] text-brand-charcoal">
                  {paragraph}
                </p>
              ))
            : null}
          <PlusList items={section.list} />
        </div>
      ) : null}
      {section.subsections?.length ? (
        <div className="mt-3.5 flex flex-col gap-2.5">
          {section.subsections.map((subsection, index) => (
            <div key={subsection.heading} className={`${card} px-5 py-[18px]`}>
              <h3 className="flex items-baseline gap-2.5 font-heading text-[1.09375rem] font-semibold text-brand-charcoal">
                <span className="text-xs font-semibold tracking-[0.16em] text-brand-sage" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {subsection.heading}
              </h3>
              {subsection.body?.map((paragraph) => (
                <p key={paragraph} className="mt-1.5 text-[0.96875rem] leading-[1.55] text-[#36433b]">
                  {paragraph}
                </p>
              ))}
              {subsection.list?.length ? (
                <div className="mt-1">
                  <PlusList items={subsection.list} />
                </div>
              ) : null}
              {subsection.afterList?.map((paragraph) => (
                <p key={paragraph} className="mt-1.5 text-[0.96875rem] leading-[1.55] text-[#36433b]">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      {section.links?.length ? <SectionLinks links={section.links} slug={slug} /> : null}
    </section>
  );
}

// Treatment links fire advice_service_link_click via AdviceTrackedLink. The booking link is a plain link:
// AnalyticsClickTracker already sends booking_click for every /book link, so an advice event here would double-count.
function NextStep({ slug, step }: { slug: string; step: AdviceNextStep }) {
  const headingId = `next-step-${slug}`;
  return (
    <section
      aria-labelledby={headingId}
      className={`${texturedGreen} mx-3.5 mt-10 rounded-[28px] px-6 pb-8 pt-10 text-center sm:mx-auto sm:max-w-2xl`}
    >
      <span className="pointer-events-none absolute left-4 top-3.5 font-heading text-3xl font-semibold text-brand-sageLight/50" aria-hidden="true">+</span>
      <span className="pointer-events-none absolute bottom-4 right-[18px] font-heading text-[2.75rem] font-semibold leading-none text-brand-sageLight/60" aria-hidden="true">+</span>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageLight">Need a hand?</p>
      <h2 id={headingId} className="mt-3 font-heading text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em]">
        {step.heading}
      </h2>
      <p className="mx-auto mt-3 max-w-[40ch] text-[0.9375rem] leading-[1.55] text-white/85">{step.summary}</p>
      {step.bookingHref ? (
        <Link
          href={step.bookingHref}
          data-analytics-id={`advice-${slug}-book`}
          className={`mx-auto mt-5 flex h-[52px] max-w-sm items-center justify-center rounded-full bg-brand-offwhite px-7 font-semibold text-brand-sageDeep transition-colors hover:bg-white ${focusRing}`}
        >
          Request a home visit
        </Link>
      ) : null}
      <div className="mt-2 flex flex-wrap justify-center gap-x-5">
        {step.treatments.map((link) => (
          <AdviceTrackedLink
            key={link.href}
            href={link.href}
            eventName="advice_service_link_click"
            params={{ article_slug: slug, cta_type: "service", position: "next_step" }}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-semibold text-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {link.label} <span aria-hidden="true">→</span>
          </AdviceTrackedLink>
        ))}
      </div>
    </section>
  );
}

export default function AdviceArticleLayout({ article }: { article: AdviceArticle }) {
  const related = article.relatedArticleSlugs.map(getAdviceArticle).filter(Boolean) as AdviceArticle[];
  const nextStep = getAdviceNextStep(article.slug);
  const sections = article.sections.filter(
    (section) => section.heading !== "Introduction" && section.heading !== "Sources and further reading",
  );
  const jumpItems = sections.map((section) => ({ id: sectionId(section.heading), label: section.navLabel ?? section.heading }));

  return (
    <main className="pb-16">
      <AdviceTracker slug={article.slug} title={article.title} category={article.category} />

      <header className="px-6 pb-5 pt-8 text-center md:pt-14">
        <nav aria-label="Breadcrumb" className="mb-3.5 text-[0.8125rem] text-brand-muted">
          <ol className="flex flex-wrap justify-center gap-1.5">
            <li>
              <Link href="/advice" className={`rounded font-semibold text-brand-sageDeep ${focusRing}`}>
                Advice
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{article.category}</li>
          </ol>
        </nav>
        <h1 className="mx-auto max-w-3xl font-heading text-[2.25rem] font-bold leading-[1.06] tracking-[-0.03em] text-brand-charcoal md:text-6xl">
          <TwoToneTitle title={article.title} />
        </h1>
        <div className="mt-4 flex items-center justify-center gap-2.5 text-left text-[0.8125rem] leading-[1.4] text-brand-muted">
          <span className="relative h-[34px] w-[34px] shrink-0 overflow-hidden rounded-full bg-brand-wash">
            <Image src="/images/adam-james.webp" alt="" fill sizes="34px" className="object-cover object-[center_15%]" />
          </span>
          <span>
            <Link href="/locations/bristol#adam-james" className={`rounded font-semibold text-brand-charcoal ${focusRing}`}>
              Adam James
            </Link>{" "}
            · Dip FH, MCFHP, MAFHP
            <br />
            {article.readingTime} · Updated <time dateTime={article.dateModified}>{formatDate(article.dateModified)}</time>
          </span>
        </div>
        <p className="mx-auto mt-2.5 max-w-[46ch] text-xs leading-[1.5] text-brand-muted/80">
          Foot Health Practitioner, insured and DBS-checked.
        </p>
      </header>

      <section
        className={`${texturedGreen} mx-3.5 rounded-[28px] px-[22px] py-[26px] sm:mx-auto sm:max-w-2xl`}
        aria-label="The short answer"
      >
        <span className="pointer-events-none absolute right-4 top-3 font-heading text-[2.125rem] font-semibold leading-none text-brand-sageLight/50" aria-hidden="true">+</span>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageLight">The short answer</p>
        <p className="mt-2.5 font-heading text-xl font-semibold leading-[1.38]">{article.intro}</p>
        {article.introAdditional?.map((paragraph) => (
          <p key={paragraph} className="mt-3 text-[0.9375rem] leading-[1.55] text-white/85">
            {paragraph}
          </p>
        ))}
      </section>

      {article.inBrief.length ? (
        <section className={`${card} mx-3.5 mt-3 px-5 py-1.5 sm:mx-auto sm:max-w-2xl`} aria-label="In brief">
          <PlusList items={article.inBrief} />
        </section>
      ) : null}

      <AdviceJumpBar items={jumpItems} />

      <article>
        {sections.map((section) => (
          <Section key={section.heading} section={section} slug={article.slug} />
        ))}
      </article>

      <section
        className={`${texturedGreen} mx-3.5 mt-10 rounded-[28px] px-[22px] py-7 sm:mx-auto sm:max-w-2xl`}
        aria-labelledby="practitioner-view"
      >
        <div className="flex items-center gap-3">
          <span className="relative h-[54px] w-[54px] shrink-0 overflow-hidden rounded-full bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.6)]">
            <Image src="/images/adam-james.webp" alt="" fill sizes="54px" className="object-cover object-[center_15%]" />
          </span>
          <div>
            <h2 id="practitioner-view" className="font-heading text-lg font-semibold">
              Adam&rsquo;s view
            </h2>
            <p className="text-[0.8125rem] text-white/75">Foot Health Practitioner</p>
          </div>
        </div>
        <svg viewBox="0 0 32 24" className="mt-[18px] h-5 w-7 text-[#A8E6B8]" aria-hidden="true">
          <path fill="currentColor" d="M0 24V14C0 6 4 1 12 0l1 4c-4 1-6 4-6 8h6v12H0zm19 0V14c0-8 4-13 12-14l1 4c-4 1-6 4-6 8h6v12H19z" />
        </svg>
        <p className="mt-2 font-heading text-[1.1875rem] font-semibold leading-[1.4]">{article.practitionerView}</p>
      </section>

      <AdviceSafetyNotice />

      {article.faqs.length ? (
        <section className="px-4 pt-10 sm:mx-auto sm:max-w-2xl" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark">
            {article.faqs.length === 1 ? "One more question" : "Common questions"}
          </h2>
          <div className="mt-4 flex flex-col gap-2.5">
            {article.faqs.map((faq) => (
              <details key={faq.question} className={`group ${card} [&_summary::-webkit-details-marker]:hidden`}>
                <summary className={`flex cursor-pointer list-none items-center justify-between gap-3.5 rounded-[22px] px-5 py-[18px] font-semibold text-brand-charcoal ${focusRing}`}>
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="relative h-[30px] w-[30px] shrink-0 rounded-full bg-brand-wash transition-[transform,background-color] duration-500 before:absolute before:left-1/2 before:top-1/2 before:h-0.5 before:w-[11px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded before:bg-brand-sageDeep after:absolute after:left-1/2 after:top-1/2 after:h-0.5 after:w-[11px] after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-90 after:rounded after:bg-brand-sageDeep group-open:rotate-45 group-open:bg-brand-sageDark group-open:before:bg-white group-open:after:bg-white"
                  />
                </summary>
                <p className="px-5 pb-[18px] text-[0.9375rem] leading-[1.6] text-brand-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="pt-10" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark">
            Read next
          </h2>
          <ul className="flex gap-2.5 overflow-x-auto px-[18px] pb-1.5 pt-3.5 [scrollbar-width:none] md:justify-center [&::-webkit-scrollbar]:hidden">
            {related.slice(0, 3).map((item) => (
              <li key={item.slug} className="w-[72%] max-w-[300px] shrink-0 md:w-[260px]">
                <AdviceTrackedLink
                  href={`/advice/${item.slug}`}
                  eventName="advice_related_article_click"
                  params={{ article_slug: article.slug, related_article_slug: item.slug, position: "article_end" }}
                  className={`flex h-full flex-col rounded-[22px] bg-brand-wash px-5 pb-[18px] pt-5 transition-colors hover:bg-brand-line ${focusRing}`}
                >
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brand-sage">{item.readingTime}</span>
                  <span className="mt-2 flex-1 font-heading text-[1.1875rem] font-semibold leading-[1.2] tracking-[-0.01em] text-brand-charcoal">
                    {item.title}
                  </span>
                  <span className="mt-2.5 text-[0.84375rem] font-semibold text-brand-sageDeep">
                    Read <span aria-hidden="true">→</span>
                  </span>
                </AdviceTrackedLink>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {nextStep ? <NextStep slug={article.slug} step={nextStep} /> : null}

      {article.references.length ? (
        <details className="mx-auto mt-8 max-w-2xl px-6 text-center [&_summary::-webkit-details-marker]:hidden">
          <summary className={`inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-lg text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark ${focusRing}`}>
            Sources <span aria-hidden="true">+</span>
          </summary>
          <ol className="mt-2 space-y-1.5 text-[0.8125rem] leading-[1.5] text-brand-muted">
            {article.references.map((reference) => (
              <li key={reference.url}>
                <a className="font-semibold text-brand-sageDeep underline underline-offset-4" href={reference.url} rel="noopener noreferrer" target="_blank">
                  {reference.label}
                </a>
              </li>
            ))}
          </ol>
        </details>
      ) : null}
    </main>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${value}T00:00:00Z`),
  );
}
