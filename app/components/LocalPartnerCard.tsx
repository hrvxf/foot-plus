import Image from "next/image";
import type { LocalPartner } from "../lib/partners";

const relationshipLabels: Record<LocalPartner["relationship"], string> = {
  "referral-partner": "Confirmed referral partner",
  "recommended-service": "Recommended service",
  "community-partner": "Community partner",
};

export default function LocalPartnerCard({ partner }: { partner: LocalPartner }) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-brand-sageLight/35 bg-white shadow-[0_14px_40px_-40px_rgba(15,23,42,0.16)]">
      {/* Stack the logo above the copy so the partner brand reads first and the card feels less split. */}
      <div className="flex flex-col">
        {partner.logo ? (
          <div className="flex items-center justify-center border-b border-brand-sageLight/25 bg-linear-to-br from-brand-sageLight/12 via-white to-brand-offwhite px-5 py-5">
            <Image
              className="h-auto w-full max-w-[188px] object-contain"
              src={partner.logo.src}
              alt={partner.logo.alt}
              width={336}
              height={176}
            />
          </div>
        ) : null}
        <div className="min-w-0 p-5 md:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-sageDark/70">
            {relationshipLabels[partner.relationship]}
          </p>
          <h3 className="mt-2 font-heading text-xl font-semibold text-brand-sageDark">
            {partner.name}
          </h3>
          <p className="mt-1 text-sm font-semibold text-brand-charcoal/70">{partner.category}</p>
          {partner.areasCovered?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {partner.areasCovered.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-brand-sageLight/35 bg-brand-sageLight/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-sageDark/80"
                >
                  {area}
                </span>
              ))}
            </div>
          ) : null}
          {/* Keep the summary compact so the partner card stays scannable and does not dominate the page. */}
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-charcoal/75">
            {partner.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
            <a
              className="inline-flex rounded-full bg-brand-sageDark px-4 py-2 text-white shadow-sm shadow-black/10 transition hover:bg-brand-sage"
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit website
            </a>
            {partner.phone ? (
              <a
                className="inline-flex rounded-full border border-brand-sageDark/15 px-4 py-2 text-brand-charcoal/75 transition hover:border-brand-sageDark/30 hover:bg-brand-sageLight/10"
                href={`tel:${partner.phone.replace(/\s/g, "")}`}
              >
                {partner.phone}
              </a>
            ) : null}
            {partner.email ? (
              <a
                className="inline-flex rounded-full border border-brand-sageDark/15 px-4 py-2 text-brand-charcoal/75 transition hover:border-brand-sageDark/30 hover:bg-brand-sageLight/10"
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
