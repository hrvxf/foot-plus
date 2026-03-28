import Link from "next/link";

const SITE_URL = "https://foot-plus.co.uk";
const BUSINESS_ID = `${SITE_URL}/#medicalbusiness`;

const serviceSections = [
  {
    title: "Corn & Callus Removal",
    symptom: "Hard skin, pressure pain, or tenderness when walking.",
    treatment: "Careful reduction of corns/callus and aftercare to reduce fast build-up.",
    forWho: "People with recurring pressure points or painful hard skin.",
  },
  {
    title: "Nail Care",
    symptom: "Thick, curved, painful, or difficult-to-trim nails.",
    treatment: "Professional trimming and reduction to improve comfort in footwear.",
    forWho: "Adults needing regular, safe nail maintenance at home.",
  },
  {
    title: "Diabetic Foot Care",
    symptom: "Reduced sensation, fragile skin, or concern about risk changes.",
    treatment: "Structured skin/nail review with circulation and sensation guidance.",
    forWho: "People with diabetes wanting routine prevention-focused home care.",
  },
  {
    title: "Verruca Treatment",
    symptom: "Tender lesions, pressure discomfort, or persistent verrucas.",
    treatment: "Assessment and tissue reduction with a clear management plan.",
    forWho: "Adults with painful or long-standing verruca concerns.",
  },
  {
    title: "Ingrown Toenails",
    symptom: "Nail-edge tenderness, swelling, redness, or shoe pain.",
    treatment: "Pressure-relief treatment and practical prevention advice.",
    forWho: "Anyone with early or recurring ingrown toenail discomfort.",
  },
];

const servicesSchema = serviceSections.map((section) => ({
  "@type": "Service",
  "@id": `${SITE_URL}/services#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  name: section.title,
  serviceType: section.title,
  areaServed: {
    "@type": "City",
    name: "Bristol",
  },
  provider: {
    "@id": BUSINESS_ID,
  },
  url: `${SITE_URL}/services`,
}));

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": BUSINESS_ID,
      name: "Foot+",
      url: SITE_URL,
      areaServed: {
        "@type": "City",
        name: "Bristol",
      },
      makesOffer: servicesSchema.map((service) => ({ "@id": service["@id"] })),
    },
    ...servicesSchema,
  ],
};

export const metadata = {
  title: "Foot Care Services in Bristol | Home Visits",
  description:
    "Foot Care Services in Bristol from Foot+, including corn and callus removal, nail care, diabetic foot care, verruca treatment, and ingrown toenail care through home visits.",
  alternates: {
    canonical: "/services",
  },
};

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-brand-sageLight/25 bg-brand-sageLight/10 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-sageDark/70">
        {label}
      </p>
      <p className="mt-1 text-sm text-brand-charcoal/75">{value}</p>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="overflow-hidden rounded-3xl border border-brand-sageLight/35 bg-linear-to-br from-white via-white to-brand-sageLight/20 p-7 shadow-sm md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark/75">
          Services
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">
          Foot Care Services in Bristol
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
          Home-visit foot care for adults who need safe, practical treatment in Bristol.
          We help with painful skin and nail conditions, diabetic foot care support,
          and ongoing maintenance, with clear advice you can follow between visits.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "Home visits in Bristol",
            "Qualified practitioner",
            "DBS checked",
            "Sterile instruments",
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-brand-sageLight/50 bg-white px-3 py-1 text-xs text-brand-charcoal/70"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {serviceSections.map((section) => (
          <article
            key={section.title}
            className="rounded-2xl border border-brand-sageLight/30 bg-white p-5 shadow-sm md:p-6"
          >
            <h2 className="font-heading text-xl font-semibold text-brand-sageDark">{section.title}</h2>
            <div className="mt-4 space-y-3">
              <DetailRow label="Symptoms" value={section.symptom} />
              <DetailRow label="Treatment" value={section.treatment} />
              <DetailRow label="Who It Is For" value={section.forWho} />
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
        <p className="text-sm text-brand-charcoal/80 md:text-base">
          Ready to book? Arrange your home-visit appointment now, or check pricing first.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-brand-sageDark px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-sageDark/90"
            href="/book"
          >
            Book appointment
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-brand-sageDark/30 px-6 py-3 text-sm font-semibold text-brand-sageDark transition hover:border-brand-sageDark"
            href="/prices"
          >
            View prices
          </Link>
        </div>
      </div>
    </section>
  );
}
