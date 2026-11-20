import type { Metadata } from "next";
import Link from "next/link";
import AdviceIndex from "../components/advice/AdviceIndex";

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

function topicFor(article: AdviceArticle) {
  return topicGroups.find((group) => group.categories.includes(article.category))?.id ?? "care-at-home";
}

export default function AdvicePage() {
  const items = publishedAdviceArticles.map((article) => ({
    slug: article.slug,
    title: article.title,
    readingTime: article.readingTime,
    topic: topicFor(article),
    searchText: [article.title, article.shortTitle, article.description, article.category, ...article.sections.map((s) => s.heading)]
      .join(" ")
      .toLowerCase(),
  }));
  return (
    <main className="pb-16">
      <section className="px-6 pb-5 pt-8 text-center md:pt-14" aria-labelledby="advice-heading">
        <nav aria-label="Breadcrumb" className="mb-3.5 text-[0.8125rem] text-brand-muted">
          <ol className="flex justify-center gap-1.5">
            <li>
              <Link href="/" className="rounded font-semibold text-brand-sageDeep">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Advice</li>
          </ol>
        </nav>
        <h1
          id="advice-heading"
          className="font-heading text-[2.625rem] font-bold leading-[1.04] tracking-[-0.03em] text-brand-charcoal md:text-7xl"
        >
          Foot-health
          <br />
          <span className="text-brand-sage">advice.</span>
        </h1>
        <p className="mt-2.5 text-[1.0625rem] text-brand-muted">Short answers from your practitioner.</p>
      </section>

      <AdviceIndex topics={topicGroups.map(({ id, title }) => ({ id, title }))} items={items} />

      <p className="mx-auto mt-10 max-w-md px-6 text-center text-[0.8125rem] leading-[1.55] text-brand-muted">
        These guides give general information and don&rsquo;t replace an individual assessment. Seek urgent help for wounds,
        signs of infection, sudden severe pain or serious diabetic foot concerns.
      </p>
    </main>
  );
}
