import Link from "next/link";
import AdviceTracker, { AdviceTrackedLink } from "./AdviceTracker";
import { AdviceArticle, getAdviceArticle } from "../../lib/advice";

function sectionId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function AdviceSafetyNotice() {
  return (
    <aside className="border-l-2 border-amber-400 bg-amber-50/70 px-5 py-4 text-sm leading-relaxed text-brand-charcoal/75">
      <h2 className="font-heading text-lg font-semibold text-brand-sageDark">Safety note</h2>
      <p className="mt-1.5">This guide provides general information only. It does not diagnose your foot concern. Seek appropriate medical support for urgent symptoms, wounds, signs of infection, sudden severe pain or diabetic foot concerns.</p>
    </aside>
  );
}

export default function AdviceArticleLayout({ article }: { article: AdviceArticle }) {
  const related = article.relatedArticleSlugs.map(getAdviceArticle).filter(Boolean) as AdviceArticle[];
  const serviceLinks = article.relatedServiceRoutes.filter((link) => link.kind !== "about" && link.kind !== "book");
  const sections = article.sections.filter((section) => section.heading !== "Introduction" && section.heading !== "Sources and further reading");

  return (
    <main className="pb-20 pt-8 md:pt-12">
      <AdviceTracker slug={article.slug} title={article.title} category={article.category} />
      <div className="mx-auto max-w-7xl px-6">
        <nav className="text-sm text-brand-charcoal/55" aria-label="Breadcrumb">
          <Link className="transition hover:text-brand-sageDark" href="/">Home</Link><span aria-hidden="true"> / </span>
          <Link className="transition hover:text-brand-sageDark" href="/advice">Advice</Link><span aria-hidden="true"> / {article.shortTitle}</span>
        </nav>
        <header className="max-w-5xl pb-10 pt-12 md:pb-14 md:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark/70">{article.category}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-[1.04] tracking-tight text-brand-sageDark md:text-6xl">{article.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-brand-charcoal/75 md:text-xl">{article.intro}</p>
          {article.introAdditional?.map((paragraph) => <p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-charcoal/70" key={paragraph}>{paragraph}</p>)}
          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-brand-sageLight/30 pt-5 text-sm text-brand-charcoal/55">
            <time dateTime={article.dateModified}>Updated {article.dateModified}</time><span aria-hidden="true">·</span><span>{article.readingTime}</span><span aria-hidden="true">·</span><span>Reviewed by Adam James, Foot Health Practitioner</span>
          </div>
        </header>
      </div>

      <div className="border-y border-brand-sageLight/25 bg-brand-sageLight/10">
        <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">
          <div className="max-w-3xl md:grid md:grid-cols-[9rem_1fr] md:gap-8">
            <h2 className="font-heading text-xl font-semibold text-brand-sageDark">In brief</h2>
            <ul className="mt-4 space-y-3 text-base leading-relaxed text-brand-charcoal/75 md:mt-0">
              {article.inBrief.map((item) => <li className="flex gap-3" key={item}><span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-sageDark/70" aria-hidden="true" /><span>{item}</span></li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-12 lg:grid-cols-[minmax(0,46rem)_15rem] lg:justify-between lg:gap-20 lg:pt-16">
        <article className="min-w-0">
          <div className="space-y-12 md:space-y-14">
            {sections.map((section) => (
              <section id={sectionId(section.heading)} key={section.heading} className="scroll-mt-28">
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-brand-sageDark md:text-3xl">{section.heading}</h2>
                <div className="mt-5 space-y-4 text-base leading-7 text-brand-charcoal/75 md:text-[1.0625rem] md:leading-8">
                  {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.list?.length ? <ul className="space-y-2.5 border-l border-brand-sageLight/50 pl-5">{section.list.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                  {section.subsections?.map((subsection) => (
                    <div key={subsection.heading} className="pt-3">
                      <h3 className="font-heading text-xl font-semibold text-brand-sageDark">{subsection.heading}</h3>
                      {subsection.body?.map((paragraph) => <p className="mt-3" key={paragraph}>{paragraph}</p>)}
                      {subsection.list?.length ? <ul className="mt-4 space-y-2.5 border-l border-brand-sageLight/50 pl-5">{subsection.list.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                      {subsection.afterList?.map((paragraph) => <p className="mt-3" key={paragraph}>{paragraph}</p>)}
                    </div>
                  ))}
                </div>
                {section.links?.filter((link) => link.kind !== "about" && link.kind !== "book").length ? (
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {section.links.filter((link) => link.kind !== "about" && link.kind !== "book").map((link) => (
                      <AdviceTrackedLink key={link.href + link.label} href={link.href} eventName={link.kind === "article" ? "advice_related_article_click" : "advice_service_link_click"} params={{ article_slug: article.slug, cta_type: link.kind || "service", position: "inline" }} className="text-sm font-semibold text-brand-sageDark underline decoration-brand-sageLight underline-offset-4 transition hover:decoration-brand-sageDark">{link.label} →</AdviceTrackedLink>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-14 space-y-10 border-t border-brand-sageLight/35 pt-12">
            <section className="border-l-4 border-brand-sageDark bg-brand-offwhite px-6 py-6 md:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark/65">From the practitioner</p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-brand-sageDark">A practical view</h2>
              <p className="mt-3 text-base leading-7 text-brand-charcoal/75 md:text-lg md:leading-8">{article.practitionerView}</p>
            </section>
            <AdviceSafetyNotice />
            <section>
              <h2 className="font-heading text-3xl font-semibold text-brand-sageDark">Common questions</h2>
              <div className="mt-5 border-t border-brand-sageLight/35">
                {article.faqs.map((faq) => <details key={faq.question} className="group border-b border-brand-sageLight/35 py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-brand-sageDark marker:content-none">{faq.question}<span className="text-xl font-normal transition group-open:rotate-45" aria-hidden="true">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-7 text-brand-charcoal/70">{faq.answer}</p></details>)}
              </div>
            </section>
            {article.references.length ? (
              <details className="border-y border-brand-sageLight/35 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-heading text-xl font-semibold text-brand-sageDark marker:content-none">Sources and further reading<span className="text-xl font-normal" aria-hidden="true">+</span></summary>
                <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-brand-charcoal/70">{article.references.map((reference) => <li key={reference.url}><a className="font-semibold text-brand-sageDark underline underline-offset-4" href={reference.url} rel="noopener noreferrer" target="_blank">{reference.label}</a></li>)}</ol>
              </details>
            ) : null}
            {(related.length || serviceLinks.length) ? (
              <section className="pt-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark/65">Continue reading</p>
                <h2 className="mt-2 font-heading text-3xl font-semibold text-brand-sageDark">Related guidance</h2>
                <div className="mt-6 divide-y divide-brand-sageLight/35 border-y border-brand-sageLight/35">
                  {related.slice(0, 3).map((item) => <AdviceTrackedLink key={item.slug} href={`/advice/${item.slug}`} eventName="advice_related_article_click" params={{ article_slug: article.slug, related_article_slug: item.slug, position: "article_end" }} className="group flex items-center justify-between gap-6 py-5 font-heading text-lg font-semibold text-brand-sageDark"><span>{item.shortTitle}</span><span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></AdviceTrackedLink>)}
                  {serviceLinks.slice(0, Math.max(0, 3 - related.length)).map((link) => <AdviceTrackedLink key={link.href} href={link.href} eventName="advice_service_link_click" params={{ article_slug: article.slug, cta_type: link.kind || "service", position: "article_end" }} className="group flex items-center justify-between gap-6 py-5 font-heading text-lg font-semibold text-brand-sageDark"><span>{link.label}</span><span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></AdviceTrackedLink>)}
                </div>
              </section>
            ) : null}
          </div>
        </article>

        <aside className="hidden lg:block" aria-label="On this page">
          <nav className="sticky top-28 border-l border-brand-sageLight/40 pl-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark/60">On this page</p>
            <ol className="mt-4 space-y-3 text-sm leading-5 text-brand-charcoal/60">{sections.map((section) => <li key={section.heading}><a className="transition hover:text-brand-sageDark" href={`#${sectionId(section.heading)}`}>{section.heading}</a></li>)}</ol>
          </nav>
        </aside>
      </div>
    </main>
  );
}
