import Link from "next/link";
import Button from "../Button";
import AuthorCard from "../AuthorCard";
import type { ConditionPage as ConditionPageData } from "../../lib/condition-pages";
import { isPublishedAdviceHref } from "../../lib/advice";
import { bookingHref, emailHref, phoneDisplay, phoneHref, prices, serviceAreas } from "../../lib/site";

const safetyItems = [
  "open wounds or bleeding",
  "signs of infection",
  "sudden swelling or severe pain",
  "loss of sensation or significant circulation concerns",
  "diabetes-related complications",
];

export default function ConditionPage({ page }: { page: ConditionPageData }) {
  const publishedAdviceLinks = page.relatedAdvice?.filter((link) => isPublishedAdviceHref(link.href)) ?? [];

  return (
    <main className="mx-auto max-w-5xl px-6 pb-16 pt-12">
      <section className="overflow-hidden rounded-3xl border border-brand-sageLight/35 bg-linear-to-br from-white via-white to-brand-sageLight/20 p-7 shadow-sm md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark/75">Home visit foot care</p>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">{page.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-charcoal/75 md:text-base">{page.intro}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={bookingHref} variant="solid">Book an appointment</Button>
          <Button href="/services" variant="outline">Back to services</Button>
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">Condition overview</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
              {page.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">Common signs and causes</h2>
            <div className="mt-4 grid gap-4 text-sm leading-relaxed text-brand-charcoal/75 md:grid-cols-2 md:text-base">
              <div><h3 className="font-heading text-lg font-semibold text-brand-sageDark">Common signs or concerns</h3>{page.signs.map((paragraph) => <p className="mt-2" key={paragraph}>{paragraph}</p>)}</div>
              <div><h3 className="font-heading text-lg font-semibold text-brand-sageDark">Common causes</h3>{page.causes.map((paragraph) => <p className="mt-2" key={paragraph}>{paragraph}</p>)}</div>
            </div>
          </section>

          <section className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">How Foot+ can help</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
              {page.help.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <ul className="mt-4 grid gap-3 text-sm text-brand-charcoal/75 sm:grid-cols-2">
              {page.aftercare.map((item) => (
                <li key={item} className="rounded-xl bg-brand-sageLight/15 p-3">{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">What happens during an appointment</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-brand-charcoal/75 md:text-base">{page.appointment.map((item) => <li key={item}>{item}</li>)}</ol>
          </section>

          <section className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">What is outside Foot+ scope?</h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-charcoal/75 md:text-base">{page.scope}</p>
          </section>

          <section className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">When to seek additional medical advice</h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
              Please seek appropriate medical support if you have any concerns such as:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-brand-charcoal/75 md:text-base">
              {safetyItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">FAQs</h2>
            <div className="mt-4 space-y-3">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-brand-sageLight/25 bg-brand-offwhite/60 p-4">
                  <summary className="cursor-pointer font-semibold text-brand-sageDark">{faq.question}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <AuthorCard lastReviewed={page.lastReviewed} />
          <section className="rounded-2xl border border-brand-sageLight/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-brand-sageDark">Home visits and areas covered</h2>
            <p className="mt-3 text-sm text-brand-charcoal/75">Foot+ provides home visits in Bristol and currently focuses on these service areas. See the full coverage page for current local information.</p>
            <ul className="mt-3 space-y-2 text-sm text-brand-charcoal/75">
              {serviceAreas.map((area) => <li key={area.region}><strong className="text-brand-sageDark">{area.region}:</strong> {area.places}</li>)}
            </ul>
            <Link href="/areas-we-cover" className="mt-3 inline-block text-sm font-semibold text-brand-sageDark underline">View areas covered</Link>
          </section>

          <section className="rounded-2xl border border-brand-sageLight/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-brand-sageDark">Pricing</h2>
            <div className="mt-3 space-y-3">
              {prices.map((price) => <div key={price.name} className="rounded-xl bg-brand-sageLight/15 p-3"><div className="flex justify-between gap-3"><span className="font-semibold text-brand-sageDark">{price.name}</span><span className="font-semibold">{price.price}</span></div><p className="mt-1 text-xs text-brand-charcoal/70">{price.description}</p></div>)}
            </div>
            <Link href="/prices" className="mt-3 inline-block text-sm font-semibold text-brand-sageDark underline">View full pricing</Link>
          </section>

          {publishedAdviceLinks.length ? (
          <section className="rounded-2xl border border-brand-sageLight/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-brand-sageDark">Helpful advice guides</h2>
            <div className="mt-3 flex flex-col gap-2">
              {publishedAdviceLinks.map((link) => <Link key={link.href} href={link.href} className="rounded-xl border border-brand-sageLight/25 px-3 py-2 text-sm font-semibold text-brand-sageDark transition hover:bg-brand-sageLight/10">{link.title}</Link>)}
            </div>
          </section>
          ) : null}

          <section className="rounded-2xl border border-brand-sageLight/30 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg font-semibold text-brand-sageDark">Related pages</h2>
            <div className="mt-3 flex flex-col gap-2">
              {page.related.map((link) => <Link key={link.href} href={link.href} className="rounded-xl border border-brand-sageLight/25 px-3 py-2 text-sm font-semibold text-brand-sageDark transition hover:bg-brand-sageLight/10">{link.title}</Link>)}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-8 rounded-2xl border border-brand-sageLight/30 bg-brand-sageDark p-6 text-white shadow-sm md:p-7">
        <h2 className="font-heading text-2xl font-semibold">Book a home foot care appointment</h2>
        <p className="mt-2 text-sm text-white/85 md:text-base">Appointments take place in your home. Book online or contact Foot+ if you would like to ask a question first.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={bookingHref} variant="primary">Book an appointment</Button>
          <a className="inline-flex items-center justify-center rounded-xl border border-white/70 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10" href={phoneHref}>Call {phoneDisplay}</a>
          <a className="inline-flex items-center justify-center rounded-xl border border-white/70 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10" href={emailHref}>Email Foot+</a>
        </div>
      </section>
    </main>
  );
}
