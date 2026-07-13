import Button from "../components/Button";
import PractitionerProfile from "../components/PractitionerProfile";
import LocalPartnerCard from "../components/LocalPartnerCard";
import Link from "next/link";
import type { Metadata } from "next";
import type { SVGProps } from "react";

import { SITE_URL } from "../lib/site";
import { publishedLocalPartners } from "../lib/partners";

export const metadata: Metadata = {
  title: "Qualified Foot Health Practitioner in Bristol",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: { url: `${SITE_URL}/about` },
  description:
    "Meet Foot+ Bristol, a qualified foot health practitioner offering insured, DBS-checked home visits across Bristol.",
};

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.15 1.6 5.97L0 24l6.3-1.73a11.86 11.86 0 0 0 5.77 1.47h.01c6.57 0 11.9-5.33 11.9-11.9 0-3.18-1.24-6.17-3.46-8.36Zm-8.45 18.2h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74 1.03 1-3.65-.24-.38a9.9 9.9 0 1 1 8.38 4.59Zm5.74-7.86c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.7.15-.2.31-.8 1-.98 1.2-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.48-1.52-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.54.15-.18.2-.31.31-.52.1-.2.05-.38-.03-.54-.08-.15-.7-1.68-.96-2.3-.25-.6-.5-.51-.7-.52h-.6c-.2 0-.54.08-.82.38-.28.31-1.08 1.05-1.08 2.56 0 1.5 1.1 2.95 1.25 3.16.15.2 2.17 3.31 5.25 4.64.73.31 1.3.5 1.74.64.73.23 1.4.2 1.92.12.59-.09 1.82-.74 2.08-1.45.26-.71.26-1.33.18-1.45-.08-.12-.28-.2-.59-.36Z" />
    </svg>
  );
}

const badges = [
  "Qualified Foot Health Practitioner",
  "Fully insured",
  "DBS checked",
  "Sterile instruments",
  "Home visits in Bristol",
];

export default function AboutPage() {
  const message = encodeURIComponent(
    "Hi Adam, I’d like to enquire about an appointment with Foot+ Bristol."
  );
  const whatsappHref = `https://wa.me/447380301555?text=${message}`;

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-15 pt-10 md:pt-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* RIGHT COLUMN (mobile first): Practitioner profile */}
          <div className="order-1 md:order-2">
            <PractitionerProfile />
          </div>

          {/* LEFT COLUMN: Intro + continuing sections */}
          <div className="order-2 space-y-10 md:order-1">
            {/* About Foot+ Bristol */}
            <div className="space-y-6">
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-brand-sageDark md:text-4xl">
                Purposeful Foot Care, Delivered with Precision
              </h1>

              <p className="max-w-prose text-lg leading-relaxed text-brand-charcoal/80">
                Foot+ Bristol was founded to improve access to quality foot care and empower people
                through education. Behind it is Adam James, a fully qualified Foot Health
                Practitioner with a strong background in healthcare and rehabilitation.
              </p>

              <p className="max-w-prose text-lg leading-relaxed text-brand-charcoal/80">
                With over six years of clinical experience, Adam has helped individuals regain
                their confidence and independence through hands-on, compassionate rehabilitation.
                His approach blends practical foot health knowledge with a calm, person-centred focus - delivering
                the highest standards of care right to your doorstep. Explore{" "}
                <Link className="font-semibold text-brand-sageDark underline" href="/services">
                  foot health services in Bristol
                </Link>{" "}
                to see what is available for your needs.
              </p>

              <p className="max-w-prose text-sm italic leading-relaxed text-brand-charcoal/60">
                At Foot+ Bristol, every treatment is more than just a procedure - it’s a step toward better
                mobility, comfort, and wellbeing.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-brand-sageLight/40 bg-white px-3 py-1 text-xs text-brand-charcoal/70"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
                <Button href="/book" variant="solid">
                  Book an appointment
                </Button>
                <Button href="/services" variant="outline">
                  View services
                </Button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ask Foot+ Bristol a question on WhatsApp"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-md shadow-black/10 transition hover:bg-[#1EBE5D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageLight"
                  data-analytics-id="about-whatsapp"
                >
                  <WhatsAppIcon className="h-[1.55rem] w-[1.55rem]" />
                </a>
              </div>
            </div>

            {/* Why patients choose Foot+ Bristol (kept in left column to fill the “dead zone”) */}
            <div className="rounded-[28px] border border-brand-sageLight/40 bg-white p-7 shadow-[0_18px_50px_-45px_rgba(15,23,42,0.18)] md:p-8">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-brand-sageDark">
                    Why patients choose Foot+ Bristol
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-brand-charcoal/70">
                    A friendly service built around trust, clarity, dignity, and appropriate onward referral.
                  </p>
                </div>

              </div>

              <div className="mt-6 grid gap-4">
                {[
                  {
                    title: "A relaxed, human approach",
                    body:
                    "Appointments are friendly, patient-led, and always focused on your needs. You’ll be listened to, treated with respect, and supported at every step.",
                  },

                  {
                    title: "Clear explanations & education",
                    body:
                      "Understanding your foot health matters. Everything is explained clearly so you can make informed decisions with confidence.",
                  },
                  {
                    title: "Focused on achievable outcomes",
                    body:
                      "Care is realistic, tailored, and outcome-focused - helping you stay comfortable, mobile, and confident between visits.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-brand-sageLight/40 bg-white p-5 shadow-[0_14px_40px_-40px_rgba(15,23,42,0.16)]"
                  >
                    <h3 className="font-heading text-base font-semibold text-brand-sageDark">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/70">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-brand-sageLight/40 bg-brand-offwhite p-7 shadow-[0_18px_50px_-45px_rgba(15,23,42,0.18)] md:p-8">
              <h2 className="font-heading text-lg font-semibold text-brand-sageDark">Local partner</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/70">A trusted local service Foot+ may signpost to when wider mobility or rehabilitation support could be helpful.</p>
              <div className="mt-5 grid gap-4">
                {publishedLocalPartners.map((partner) => <LocalPartnerCard key={partner.website} partner={partner} />)}
              </div>
            </div>


          </div>
        </div>

      </section>
    </main>
  );
}
