import type { Metadata } from "next";
import Link from "next/link";
import Button from "../components/Button";
import { AdviceSafetyNotice } from "../components/advice/AdviceArticleLayout";
import { adviceCanonical, draftAdviceArticles, publishedAdviceArticles } from "../lib/advice";

export const metadata: Metadata = {
  title: "Foot Health Advice and Guides",
  description: "Practitioner-led Foot+ Bristol advice hub for routine foot care, nail care, hard skin, home appointments and choosing the right professional.",
  alternates: { canonical: adviceCanonical() },
  openGraph: {
    url: adviceCanonical(),
    title: "Foot Health Advice and Guides",
    description: "Practitioner-led Foot+ Bristol advice hub for routine foot health and home foot-care decisions.",
  },
  robots: { index: true, follow: true },
};

const categories = [...new Set(publishedAdviceArticles.map((article) => article.category))];
const featuredArticle = publishedAdviceArticles[0];

export default function AdvicePage() {
  const hasPublishedGuides = publishedAdviceArticles.length > 0;

  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-12">
      <section className="rounded-3xl border border-brand-sageLight/35 bg-linear-to-br from-white via-white to-brand-sageLight/20 p-7 shadow-sm md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark/75">Foot+ Bristol advice</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold text-brand-sageDark md:text-5xl">Foot Health Advice and Guides</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-brand-charcoal/75">
          Practical, plain-English guidance written or reviewed by Adam James, Foot Health Practitioner at Foot+ Bristol.
          Approved guides are listed below; any future drafts will remain hidden until Adam has confirmed factual, scope and procedure wording.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/book" variant="solid">Book an appointment</Button>
          <Button href="/about" variant="outline">About Adam James</Button>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
        {featuredArticle ? (
          <Link href={`/advice/${featuredArticle.slug}`} className="rounded-3xl border border-brand-sageLight/30 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark/70">Featured guide</p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-brand-sageDark">{featuredArticle.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/75">{featuredArticle.description}</p>
            <p className="mt-4 text-sm font-semibold text-brand-sageDark">Read {featuredArticle.shortTitle}</p>
          </Link>
        ) : (
          <div className="rounded-3xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark/70">Editorial status</p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-brand-sageDark">Advice guides are in practitioner review</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/75">
              {draftAdviceArticles.length} guides have been drafted but are not published, linked from public pages, included in the sitemap or available as indexable routes until Adam has approved them.
            </p>
          </div>
        )}
        <AdviceSafetyNotice />
      </section>

      {hasPublishedGuides ? (
        <>
          <section className="mt-8">
            <h2 className="font-heading text-3xl font-semibold text-brand-sageDark">Published guides</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {publishedAdviceArticles.map((article) => (
                <article key={article.slug} className="flex rounded-2xl border border-brand-sageLight/30 bg-white p-5 shadow-sm">
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-sageDark/70">{article.category}</p>
                    <h3 className="mt-2 font-heading text-xl font-semibold text-brand-sageDark">
                      <Link href={`/advice/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75">{article.description}</p>
                    <div className="mt-4 text-xs text-brand-charcoal/60">
                      <span>{article.readingTime}</span><span> • </span><time dateTime={article.datePublished}>{article.datePublished}</time><span> • Adam James</span>
                    </div>
                    <Link href={`/advice/${article.slug}`} className="mt-auto pt-4 text-sm font-semibold text-brand-sageDark underline">Read {article.shortTitle}</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-brand-sageLight/30 bg-brand-offwhite p-6">
            <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">Browse by topic</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div key={category} className="rounded-xl bg-white p-4">
                  <h3 className="font-semibold text-brand-sageDark">{category}</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    {publishedAdviceArticles.filter((article) => article.category === category).map((article) => (
                      <li key={article.slug}>
                        <Link className="text-brand-charcoal/75 underline" href={`/advice/${article.slug}`}>{article.shortTitle}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}

      <section className="mt-8 rounded-2xl border border-brand-sageLight/30 bg-white p-6">
        <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">About the author</h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
          Guides are written or reviewed by Adam James, MCFHP, MAFHP, Foot Health Practitioner at Foot+ Bristol. Adam provides mobile routine foot-health appointments across Bristol.
          <Link className="font-semibold text-brand-sageDark underline" href="/about"> Read more about Adam and Foot+ Bristol</Link>.
        </p>
      </section>
    </main>
  );
}
