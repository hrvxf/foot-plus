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
    <article className="grid gap-7 py-8 sm:grid-cols-[190px_1fr] sm:items-center md:gap-10">
      {partner.logo ? (
        <div className="flex min-h-28 items-center justify-start bg-white/50 px-4 py-5 sm:justify-center">
          <Image
            className="h-auto w-full max-w-[165px] object-contain"
            src={partner.logo.src}
            alt={partner.logo.alt}
            width={336}
            height={176}
          />
        </div>
      ) : null}

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-sageDark/70">
          {relationshipLabels[partner.relationship]}
        </p>
        <h3 className="mt-2 font-heading text-2xl font-semibold leading-tight text-brand-sageDark">{partner.name}</h3>
        <p className="mt-1 text-sm font-semibold leading-snug text-brand-charcoal/70">{partner.category}</p>
        {compactAreaLabel ? (
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-sageDark/70">{compactAreaLabel}</p>
        ) : null}
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-charcoal/75">{partner.description}</p>
        <div className="mt-5 flex flex-col gap-3 text-sm font-semibold sm:flex-row sm:flex-wrap sm:items-center">
          <a className="text-brand-sageDark underline decoration-brand-sageLight underline-offset-4 transition hover:decoration-brand-sageDark" href={partner.website} target="_blank" rel="noopener noreferrer">
            Visit website
          </a>
          {partner.phone ? (
            <a className="text-brand-charcoal/70 transition hover:text-brand-sageDark" href={`tel:${partner.phone.replace(/\s/g, "")}`}>Call {partner.phone}</a>
          ) : null}
          {partner.email ? (
            <a className="text-brand-charcoal/70 transition hover:text-brand-sageDark" href={`mailto:${partner.email}`}>Email</a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
