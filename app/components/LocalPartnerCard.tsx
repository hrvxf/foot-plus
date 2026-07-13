import type { LocalPartner } from "../lib/partners";

const relationshipLabels: Record<LocalPartner["relationship"], string> = {
  "referral-partner": "Confirmed referral partner",
  "recommended-service": "Recommended service",
  "community-partner": "Community partner",
};

export default function LocalPartnerCard({ partner }: { partner: LocalPartner }) {
  return (
    <article className="rounded-[24px] border border-brand-sageLight/35 bg-white p-5 shadow-[0_14px_40px_-40px_rgba(15,23,42,0.16)]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark/70">{relationshipLabels[partner.relationship]}</p>
      <h3 className="mt-2 font-heading text-xl font-semibold text-brand-sageDark">{partner.name}</h3>
      <p className="mt-1 text-sm font-semibold text-brand-charcoal/70">{partner.category}</p>
      <p className="mt-3 text-sm leading-relaxed text-brand-charcoal/75">{partner.description}</p>
      <a className="mt-4 inline-flex rounded-full border border-brand-sageDark/25 px-4 py-2 text-sm font-semibold text-brand-sageDark transition hover:bg-brand-sageLight/10" href={partner.website} target="_blank" rel="noopener noreferrer">
        Visit {partner.name}
      </a>
    </article>
  );
}
