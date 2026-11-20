import Image from "next/image";

import type { LocalPartner } from "../../lib/partners";

/** A partner's logo on a soft tile, or their initial if there's no logo yet. */
export default function PartnerLogo({
  partner,
  className = "",
  decorative = false,
}: {
  partner: LocalPartner;
  className?: string;
  /** Leave the alt text empty when the name is printed next to it. */
  decorative?: boolean;
}) {
  return (
    <div className={`flex items-center justify-center rounded-2xl ${className}`}>
      {partner.logo ? (
        <Image
          src={partner.logo.src}
          alt={decorative ? "" : partner.logo.alt}
          width={322}
          height={194}
          className="h-auto max-h-[78%] w-auto max-w-[82%] object-contain"
        />
      ) : (
        <span
          aria-hidden={decorative || undefined}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-sageLight font-heading text-lg font-semibold text-white"
        >
          {partner.name.charAt(0)}
          {!decorative && <span className="sr-only">{partner.name}</span>}
        </span>
      )}
    </div>
  );
}
