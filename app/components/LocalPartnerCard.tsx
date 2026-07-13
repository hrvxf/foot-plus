import Image from "next/image";
import type { LocalPartner } from "../lib/partners";

const relationshipLabels: Record<LocalPartner["relationship"], string> = {
  "referral-partner": "Confirmed referral partner",
  "recommended-service": "Recommended service",
  "community-partner": "Community partner",
};

export default function LocalPartnerCard({ partner }: { partner: LocalPartner }) {
  const compactAreaLabel = partner.areasCovered?.join(" • ");

  return (
    <article className="overflow-hidden rounded-3xl border border-brand-sageLight/35 bg-white shadow-[0_14px_40px_-40px_rgba(15,23,42,0.16)]">
      {/* Use a shallow header band so the logo leads the card without consuming a full column. */}
      <div className="flex flex-col">
        {partner.logo ? (
          <div className="flex min-h-28 items-center justify-center border-b border-brand-sageLight/25 bg-linear-to-br from-brand-sageLight/12 via-white to-brand-offwhite px-5 py-4">
            <Image
              className="h-auto w-full max-w-[170px] object-contain"
              src={partner.logo.src}
              alt={partner.logo.alt}
              width={336}
              height={176}
            />
          </div>
        ) : null}
        <div className="min-w-0 p-5 md:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-sageDark/70">
            {relationshipLabels[partner.relationship]}
          </p>
          <h3 className="mt-1.5 font-heading text-2xl font-semibold leading-tight text-brand-sageDark">
            {partner.name}
          </h3>
          <p className="mt-1 text-sm font-semibold leading-snug text-brand-charcoal/70">
            {partner.category}
          </p>
          {compactAreaLabel ? (
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-sageDark/75">
              {compactAreaLabel}
            </p>
          ) : null}
          {/* Keep the summary to a short value statement so the card stays compact and scannable. */}
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-charcoal/75">
            {partner.description}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center text-sm font-semibold">
            <a
              className="inline-flex items-center justify-center rounded-full bg-brand-sageDark px-4 py-2 text-white shadow-sm shadow-black/10 transition hover:bg-brand-sage"
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit website
            </a>
            {partner.phone ? (
              <a
                className="inline-flex items-center justify-center rounded-full border border-brand-sageDark/15 px-4 py-2 text-brand-charcoal/75 transition hover:border-brand-sageDark/30 hover:bg-brand-sageLight/10"
                href={`tel:${partner.phone.replace(/\s/g, "")}`}
              >
                Call {partner.phone}
              </a>
            ) : null}
            {partner.email ? (
              <a
                className="inline-flex items-center justify-center rounded-full border border-brand-sageDark/15 px-4 py-2 text-brand-charcoal/75 transition hover:border-brand-sageDark/30 hover:bg-brand-sageLight/10"
                href={`mailto:${partner.email}`}
              >
                Email
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
