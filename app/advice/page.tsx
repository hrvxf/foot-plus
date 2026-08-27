import type { Metadata } from "next";
import Link from "next/link";

import {
  adviceCanonical,
  publishedAdviceArticles,
  type AdviceArticle,
} from "../lib/advice";
import {
  ADVICE_SOCIAL_IMAGE,
  ADVICE_SOCIAL_IMAGE_METADATA,
} from "../lib/site";

const adviceTitle = "Foot Health Advice | Foot+";
const adviceDescription =
  "Clear, practical Foot+ guidance about common foot concerns, everyday foot care and when to seek professional support.";

export const metadata: Metadata = {
  title: { absolute: adviceTitle },
  description: adviceDescription,
  alternates: { canonical: adviceCanonical() },
  openGraph: {
    type: "website",
    url: adviceCanonical(),
    siteName: "Foot+",
    title: adviceTitle,
    description: adviceDescription,
    images: [ADVICE_SOCIAL_IMAGE_METADATA],
  },
  twitter: {
    card: "summary_large_image",
    title: adviceTitle,
    description: adviceDescription,
    images: [ADVICE_SOCIAL_IMAGE],
  },
  robots: { index: true, follow: true },
};

const topicGroups = [
  {
    id: "nails",
    title: "Nails",
    description: "Changes in nail growth, thickness and safe routine care.",
    categories: ["Toenail care", "Nail care", "Foot care for older adults"],
  },
  {
    id: "skin-and-pressure",
    title: "Skin and pressure",
    description: "Hard skin, corns, calluses and other common pressure concerns.",
    categories: ["Skin and hard skin"],
  },
  {
    id: "pain-and-comfort",
    title: "Pain and comfort",
    description: "Understanding discomfort and maintaining everyday foot health.",
    categories: ["Heel pain", "Everyday foot care"],
  },
  {
    id: "care-at-home",
    title: "Care at home",
    description: "What to expect, accessible visits and choosing the right professional.",
    categories: [
      "Home foot-care appointments",
      "Choosing the right professional",
      "Accessible home visits",
    ],
  },
];

function formatArticleDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function displayTitle(article: AdviceArticle) {
  return article.slug === "foot-care-learning-disabilities-bristol"
    ? "Accessible foot care in Bristol"
    : article.shortTitle;
}

export default function AdvicePage() {
  const featuredArticle = publishedAdviceArticles[0];
  const remainingArticles = featuredArticle
    ? publishedAdviceArticles.filter((article) => article.slug !== featuredArticle.slug)
    : publishedAdviceArticles;

  return (
    <main className="bg-brand-offwhite">
      <section className="border-b border-brand-sageLight/30 bg-linear-to-br from-brand-offwhite via-white to-brand-sageLight/10">
        <div className="mx-auto max-w-[1360px] px-6 pb-14 pt-8 md:px-10 md:pb-20 md:pt-10 xl:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-charcoal/60">
            <Link
              className="font-semibold text-brand-sageDark underline underline-offset-4"
              href="/"
            >
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Advice</span>
          </nav>

          <div className="max-w-5xl pt-14 lg:pt-20">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">
              Foot+ advice
            </p>
            <h1 className="mt-5 font-heading text-[clamp(3.25rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-brand-sageDark">
              Foot-health advice
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-brand-charcoal/72 md:text-xl">
              Clear, practical guidance for understanding common foot concerns, caring for your
              feet and knowing when to seek professional help.
            </p>
          </div>

          <nav
            aria-label="Advice topics"
            className="mt-12 border-y border-brand-sageLight/40"
          >
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-brand-sageLight/40">
              {topicGroups.map((topic) => (
                <li key={topic.id} className="border-b border-brand-sageLight/35 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0">
                  <Link
                    href={`#${topic.id}`}
                    className="block py-5 font-heading text-lg font-semibold text-brand-sageDark underline-offset-4 hover:underline sm:px-5 first:sm:pl-0 last:sm:pr-0"
                  >
                    {topic.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {featuredArticle ? (
        <section className="border-b border-brand-sageLight/30 bg-brand-sageLight/16">
          <Link
            href={`/advice/${featuredArticle.slug}`}
            className="group mx-auto grid max-w-[1360px] gap-8 px-6 py-14 md:px-10 md:py-20 lg:grid-cols-[0.58fr_1.42fr] lg:items-end lg:gap-20 xl:px-14"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/65">
                Featured guide
              </p>
              <p className="mt-5 text-sm text-brand-charcoal/55">
                {featuredArticle.readingTime}
                <span aria-hidden="true"> · </span>
                Updated {formatArticleDate(featuredArticle.dateModified)}
              </p>
            </div>
            <div>
              <h2 className="max-w-4xl font-heading text-3xl font-semibold leading-tight tracking-[-0.025em] text-brand-sageDark md:text-5xl">
                {featuredArticle.title}
              </h2>
              <p className="mt-5 max-w-3xl leading-relaxed text-brand-charcoal/70">
                {featuredArticle.description}
              </p>
              <p className="mt-6 text-sm font-semibold text-brand-sageDark underline decoration-brand-sageLight underline-offset-4">
                Read the featured guide{" "}
                <span
                  className="inline-block transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </p>
            </div>
          </Link>
        </section>
      ) : null}

      <section
        className="mx-auto max-w-[1360px] px-6 py-14 md:px-10 md:py-20 xl:px-14"
        aria-labelledby="guide-library-heading"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/70">
            Guide library
          </p>
          <h2
            id="guide-library-heading"
            className="mt-3 font-heading text-3xl font-semibold tracking-tight text-brand-sageDark md:text-4xl"
          >
            Explore by topic
          </h2>
        </div>

        <div className="mt-10 border-t border-brand-sageLight/40">
          {topicGroups.map((topic) => {
            const articles = remainingArticles.filter((article) =>
              topic.categories.includes(article.category)
            );

            if (articles.length === 0) return null;

            return (
              <section
                key={topic.id}
                id={topic.id}
                className="scroll-mt-24 grid gap-7 border-b border-brand-sageLight/40 py-9 lg:grid-cols-[0.58fr_1.42fr] lg:gap-20"
                aria-labelledby={`${topic.id}-heading`}
              >
                <div>
                  <h3
                    id={`${topic.id}-heading`}
                    className="font-heading text-2xl font-semibold text-brand-sageDark"
                  >
                    {topic.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-brand-charcoal/62">
                    {topic.description}
                  </p>
                </div>

                <div className="border-y border-brand-sageLight/35">
                  {articles.map((article, index) => (
                    <Link
                      key={article.slug}
                      href={`/advice/${article.slug}`}
                      className="group grid gap-4 border-b border-brand-sageLight/35 py-6 last:border-b-0 sm:grid-cols-[2.5rem_1fr_auto] sm:items-center sm:gap-6"
                    >
                      <span className="text-xs font-semibold tracking-[0.16em] text-brand-sageDark/35">
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="font-heading text-xl font-semibold leading-snug text-brand-sageDark md:text-2xl">
                          {displayTitle(article)}
                        </h4>
                        <p className="mt-2 text-sm text-brand-charcoal/55">
                          {article.readingTime}
                          <span aria-hidden="true"> · </span>
                          Updated {formatArticleDate(article.dateModified)}
                        </p>
                      </div>
                      <span
                        className="hidden text-brand-sageDark/45 transition-transform group-hover:translate-x-1 sm:block"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <aside className="mt-12 border-l-2 border-amber-300 bg-amber-50/55 px-5 py-4 text-sm leading-relaxed text-brand-charcoal/70">
          <p>
            <strong className="text-brand-sageDark">Important:</strong> These guides provide
            general information and do not replace individual medical assessment. Seek urgent
            help for wounds, infection signs, sudden severe pain or serious diabetic-foot
            concerns.
          </p>
        </aside>
      </section>
    </main>
  );
}
