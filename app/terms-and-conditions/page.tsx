import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { DEFAULT_SOCIAL_IMAGE, locationEmails, locationPhones, paymentMethods, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/terms-and-conditions` },
  openGraph: { images: [DEFAULT_SOCIAL_IMAGE], url: `${SITE_URL}/terms-and-conditions` },
  title: "Terms & Conditions",
  description:
    "Booking, payment, cancellation and treatment terms for Foot+ Bristol and Foot+ Southampton home visits.",
  robots: { index: true, follow: true },
};

/** Update this when the terms change. */
const LAST_UPDATED = "23 November 2026";

const link =
  "font-medium text-brand-sageDark underline decoration-brand-sageDark/30 underline-offset-4 transition hover:decoration-brand-sageDark";

function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-heading text-xl font-semibold text-brand-sageDark">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-6 text-brand-charcoal/80">{children}</div>
    </section>
  );
}

const A = ({ to }: { to: { display: string; href: string } }) => (
  <a className={link} href={to.href}>
    {to.display}
  </a>
);

const payment = `${paymentMethods.slice(0, -1).join(", ")} or ${paymentMethods.at(-1)}`;

const shortVersion = [
  ["Notice", "Please give at least 24 hours’ notice to cancel or move a visit."],
  ["Missed visits", "Late cancellations and missed visits are charged in full."],
  ["Payment", "Paid at the end of your visit."],
  ["Your health", "Tell us about your health and any changes before each visit."],
];

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
      <h1 className="font-heading text-3xl font-semibold text-brand-sageDark">Terms &amp; Conditions</h1>
      <p className="mt-4 text-sm text-brand-charcoal/80">
        The agreement between you and the Foot+ practitioner who visits you. Last updated {LAST_UPDATED}.
      </p>

      <div className="mt-8 rounded-3xl bg-brand-sageDark px-6 py-7 text-white sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/65">The short version</p>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          {shortVersion.map(([term, detail]) => (
            <div key={term}>
              <dt className="font-heading text-base font-semibold">{term}</dt>
              <dd className="mt-1 text-sm leading-6 text-white/85">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-12 space-y-10">
        <Section title="Who you're booking with">
          <p>
            Foot+ is a home-visit foot care service in Bristol and Southampton. Each location is run by its own
            practitioner, and your agreement is with the practitioner who treats you:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong className="font-semibold text-brand-charcoal">Foot+ Bristol:</strong> Adam James, sole
              trader. <A to={locationPhones.bristol} />, <A to={locationEmails.bristol} />
            </li>
            <li>
              <strong className="font-semibold text-brand-charcoal">Foot+ Southampton:</strong> Katie Preston,
              sole trader. <A to={locationPhones.southampton} />, <A to={locationEmails.southampton} />
            </li>
          </ul>
          <p>
            In these terms, &ldquo;we&rdquo; means that practitioner. A relative or carer can book for someone
            else, but we&rsquo;ll always check the patient is happy to be treated.
          </p>
        </Section>

        <Section title="What we do">
          <p>
            We&rsquo;re qualified, insured and DBS-checked Foot Health Practitioners, not podiatrists, and we
            offer the treatments on our{" "}
            <Link className={link} href="/foot-care-services">
              services page
            </Link>
            . If you need something outside that, we&rsquo;ll suggest who to see.
          </p>
        </Section>


        <Section title="Prices and payment">
          <p>
            Our current prices are on the{" "}
            <Link className={link} href="/prices">
              prices page
            </Link>
            , along with any travel fee. We&rsquo;ll confirm the full price before your visit.
          </p>
          <p>Payment is due at the end of each visit, by {payment}.</p>
          <p>
            Offer codes can be used once per patient, on a first appointment only, unless the offer says
            otherwise. They can&rsquo;t be exchanged for cash or combined with other offers.
          </p>
        </Section>

        <Section id="cancellations" title="Cancelling or moving a visit">
          <p>
            Please give at least 24 hours&rsquo; notice if you need to cancel or move a visit. If you cancel with
            less notice, or we can&rsquo;t get in when we arrive, the full appointment price is charged.
          </p>
          <p>
            If we need to cancel because of illness, bad weather or something else outside our control, we&rsquo;ll
            let you know as soon as we can and offer a new time. There&rsquo;s no charge to you.
          </p>
        </Section>

        <Section title="Your right to cancel">
          <p>
            Because you book with us away from a shop or clinic, the law gives you 14 days from booking to cancel
            without giving a reason. If you ask us to visit within those 14 days, you&rsquo;re asking us to start
            early. You can still cancel, but our usual 24-hour notice and missed-visit charge will apply.
          </p>
        </Section>

        <Section title="Your health information">
          <p>
            Before your first visit, please complete our{" "}
            <Link className={link} href="/forms">
              patient document
            </Link>{" "}
            with your medical history, medication and allergies. Tell us before any visit if something has
            changed, especially diabetes, circulation problems or blood-thinning medication.
          </p>
          <p>
            We rely on this information to treat you safely. We can&rsquo;t be responsible for problems caused by
            information that was missing or wrong. How we look after it is explained in our{" "}
            <Link className={link} href="/privacy">
              privacy notice
            </Link>
            .
          </p>
        </Section>

        <Section title="On the day">
          <p>
            We bring everything we need, including our own seat. Good lighting is always appreciated, and
            please keep pets in another room while we work.
          </p>
          <p>
            We may stop or not start a treatment if it isn&rsquo;t safe, if we think you need to see another
            professional first, or if we&rsquo;re treated with abuse or aggression. If we do, we&rsquo;ll explain
            why.
          </p>
        </Section>

        <Section title="After your treatment">
          <p>
            Treatment is safe and gentle, but occasionally a small nick or minor bleeding can happen, especially
            with very thick or fragile nails.
          </p>
          <p>
            Please follow the aftercare advice we give you. If you notice redness, swelling, heat or anything
            that worries you, contact us, your GP or NHS 111.
          </p>
        </Section>

        <Section title="Children">
          <p>
            We treat under-18s. A parent or guardian must agree to the treatment and be there for the visit.
          </p>
        </Section>

        <Section title="If something isn't right">
          <p>
            Please tell the practitioner who treated you first. Adam handles concerns about Foot+ Bristol and
            Katie handles concerns about Foot+ Southampton, using the contact details above. We&rsquo;ll
            listen, reply promptly and do our best to put it right.
          </p>
        </Section>

        <Section title="Our responsibility to you">
          <p>
            We provide our care with reasonable skill and care, as the law requires. Nothing in these terms
            limits our responsibility for death or personal injury caused by our negligence, or your other
            rights under consumer law.
          </p>
        </Section>

        <Section title="Other things to know">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>We may update these terms. The version on this page when you book is the one that applies.</li>
            <li>These terms are governed by the law of England and Wales.</li>
          </ul>
        </Section>
      </div>
    </section>
  );
}
