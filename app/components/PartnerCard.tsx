import Image from "next/image";

const partnerActions = [
  {
    href: "https://www.severnphysiotherapy.co.uk/",
    label: "Visit website",
    isExternal: true,
    variant: "primary",
  },
  {
    href: "tel:01275400466",
    label: "01275 400466",
    variant: "secondary",
  },
  {
    href: "mailto:hello@severnphysiotherapy.co.uk",
    label: "Email",
    variant: "secondary",
  },
];

export default function PartnerCard() {
  return (
    <section className="rounded-[28px] border border-brand-sageLight/35 bg-brand-offwhite p-6 shadow-[0_18px_50px_-45px_rgba(15,23,42,0.18)] md:p-8">
      <div className="max-w-2xl">
        <h2 className="font-heading text-lg font-semibold text-brand-sageDark">Local partner</h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/70">
          A trusted local service Foot+ may signpost to when wider mobility or rehabilitation
          support could be helpful.
        </p>
      </div>

      <article className="mt-5 overflow-hidden rounded-[24px] border border-brand-sageLight/35 bg-white shadow-[0_14px_40px_-40px_rgba(15,23,42,0.16)]">
        <div className="grid gap-0 md:grid-cols-[216px_minmax(0,1fr)]">
          {/* Keep the logo in a dedicated panel so the card stays compact even with a wide mark. */}
          <div className="flex items-center justify-center border-b border-brand-sageLight/25 bg-linear-to-br from-brand-sageLight/12 via-white to-brand-offwhite px-5 py-5 md:border-b-0 md:border-r">
            <Image
              className="h-auto w-full max-w-[168px] object-contain"
              src="/images/SevernPhysiotherapy.png"
              alt="Severn Physiotherapy logo"
              width={336}
              height={176}
              priority={false}
            />
          </div>

          <div className="p-5 md:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-sageDark/70">
              Confirmed referral partner
            </p>
            <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <h3 className="font-heading text-xl font-semibold text-brand-sageDark">
                  Severn Physiotherapy
                </h3>
                <p className="mt-1 text-sm font-semibold text-brand-charcoal/72">
                  Home physiotherapy and occupational therapy
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Bristol home visits", "Older adult rehab"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-brand-sageLight/35 bg-brand-sageLight/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-sageDark/80"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-charcoal/75">
              Home-visit physiotherapy and occupational therapy for older adults across Bristol
              and nearby areas, with support for independence, mobility, falls prevention,
              neurological rehabilitation, and recovery after illness or injury.
            </p>

            {/* Short, pill-based actions reduce height while keeping the main paths obvious. */}
            <div className="mt-4 flex flex-wrap gap-2.5 text-sm font-semibold">
              {partnerActions.map((action) => (
                <a
                  key={action.label}
                  className={[
                    "inline-flex items-center rounded-full px-4 py-2 transition",
                    action.variant === "primary"
                      ? "bg-brand-sageDark text-white shadow-sm shadow-black/10 hover:bg-brand-sage"
                      : "border border-brand-sageDark/15 text-brand-charcoal/80 hover:border-brand-sageDark/30 hover:bg-brand-sageLight/10",
                  ].join(" ")}
                  href={action.href}
                  target={action.isExternal ? "_blank" : undefined}
                  rel={action.isExternal ? "noopener noreferrer" : undefined}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
