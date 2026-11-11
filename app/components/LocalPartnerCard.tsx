import Image from "next/image";
import type { LocalPartner } from "../lib/partners";

const relationshipLabels: Record<LocalPartner["relationship"], string> = {
  "referral-partner": "Confirmed referral partner",
  "recommended-service": "Recommended service",
  "community-partner": "Community partner",
};

export default function LocalPartnerCard({ partner }: { partner: LocalPartner }) {
  const compactAreaLabel = partner.areasCovered?.join(", ");

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
        <p className="text-base font-semibold text-brand-sageDeep">
          {relationshipLabels[partner.relationship]}
        </p>
        <h3 className="mt-1 font-heading text-2xl font-semibold leading-8 text-brand-sageDeep">{partner.name}</h3>
        <p className="mt-1 text-base leading-6 text-brand-charcoal">{partner.category}</p>
        {compactAreaLabel ? (
          <p className="mt-1 text-base leading-6 text-brand-muted">{compactAreaLabel}</p>
        ) : null}
        <p className="mt-3 max-w-2xl text-base leading-6 text-brand-muted">{partner.description}</p>
        <div className="mt-2 flex flex-col gap-x-6 text-base font-semibold sm:flex-row sm:flex-wrap sm:items-center">
          <a className="inline-flex min-h-11 items-center text-brand-sageDeep underline decoration-brand-sage underline-offset-4" href={partner.website} target="_blank" rel="noopener noreferrer">
            Visit website
          </a>
          {partner.phone ? (
            <a className="inline-flex min-h-11 items-center text-brand-sageDeep underline decoration-brand-sage underline-offset-4" href={`tel:${partner.phone.replace(/\s/g, "")}`}>Call {partner.phone}</a>
          ) : null}
          {partner.email ? (
            <a className="inline-flex min-h-11 items-center text-brand-sageDeep underline decoration-brand-sage underline-offset-4" href={`mailto:${partner.email}`}>Email</a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
