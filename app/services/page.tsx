import Link from "next/link";

export const metadata = {
  title: "Foot Care Services in Bristol | Home Visits",
  description:
    "Explore Foot+ home-visit foot health services in Bristol, including assessments, routine care, and personalised treatment plans.",
};

const services = [
  {
    title: "New patient assessments",
    description:
      "Comprehensive first appointments including medical history, neurovascular checks, and a tailored treatment plan.",
  },
  {
    title: "Routine foot care",
    description:
      "Ongoing nail and skin care, callus management, and practical guidance to keep feet comfortable between visits.",
  },
  {
    title: "Support for comfort and mobility",
    description:
      "Treatment focused on reducing discomfort, improving confidence on your feet, and supporting day-to-day movement.",
  },
  {
    title: "Home-visit convenience",
    description:
      "Professional care delivered in your home across Bristol, with appointments planned to be calm, unhurried, and personal.",
  },
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-12">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sageDark">Services</p>
      <h1 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark">
        Home-visit foot care services in Bristol
      </h1>
      <p className="mt-4 max-w-3xl text-sm text-brand-charcoal/80">
        Foot+ provides gentle, professional foot health care with clear advice and personalised
        treatment. If you would like full pricing details, see our{" "}
        <Link href="/prices" className="font-semibold text-brand-sageDark underline">
          Bristol foot health prices
        </Link>{" "}
        page.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm"
          >
            <h2 className="font-heading text-lg font-semibold text-brand-sageDark">{service.title}</h2>
            <p className="mt-2 text-sm text-brand-charcoal/70">{service.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          className="inline-flex items-center justify-center rounded-full bg-brand-sageDark px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-sageDark/90"
          href="/book"
        >
          Book an appointment
        </Link>
        <Link
          className="inline-flex items-center justify-center rounded-full border border-brand-sageDark/30 px-6 py-3 text-sm font-semibold text-brand-sageDark transition hover:border-brand-sageDark"
          href="/about"
        >
          Meet your practitioner
        </Link>
      </div>
    </section>
  );
}
