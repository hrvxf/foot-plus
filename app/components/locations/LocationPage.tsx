import Link from "next/link";
import Button from "../Button";
import type { LocationPage as LocationPageData } from "../../lib/location-pages";
import {
  bookingHref,
  emailHref,
  phoneDisplay,
  phoneHref,
  prices,
} from "../../lib/site";

const services = [
  "New patient appointments",
  "Routine foot care",
  "Toenail and thickened nail care",
  "Hard skin and callus reduction",
  "Corn care where suitable",
  "Cracked heel care",
  "Diabetic foot checks",
];

const benefitItems = [
  "Older adults and people with reduced mobility",
  "People who find reaching their feet difficult",
  "Patients who prefer care at home",
  "Relatives, carers or support workers arranging care",
];

const appointmentSteps = [
  {
    title: "Initial discussion",
    text: "Foot+ reviews relevant health information, current concerns and the care requested.",
  },
  {
    title: "Routine foot care",
    text: "Appropriate nail or skin care is provided where suitable and within Foot+ scope.",
  },
  {
    title: "Aftercare and onward advice",
    text: "Foot+ explains suitable aftercare and advises when medical or podiatry support may be more appropriate.",
  },
];

function CardSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
      <h2 className="font-heading text-2xl font-semibold text-brand-sageDark">
        {title}
      </h2>
      <div className="mt-4 text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
        {children}
      </div>
    </section>
  );
}

export default function LocalServicePage({ page }: { page: LocationPageData }) {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-16 pt-8 md:pt-12">
      <nav
        aria-label="Breadcrumb"
        className="mb-5 text-sm text-brand-charcoal/65"
      >
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link
              className="font-semibold text-brand-sageDark underline underline-offset-4"
              href="/"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              className="font-semibold text-brand-sageDark underline underline-offset-4"
              href="/areas-we-cover"
            >
              Areas We Cover
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{page.area}</li>
        </ol>
      </nav>

      <section className="overflow-hidden rounded-3xl border border-brand-sageLight/35 bg-linear-to-br from-white via-white to-brand-sageLight/20 p-7 shadow-sm md:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-sageDark/75">
          Home visit foot care
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-brand-sageDark md:text-4xl">
          {page.title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
          {page.intro}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={bookingHref} variant="solid">
            Book an appointment
          </Button>
          <Button href="/services" variant="outline">
            View services
          </Button>
        </div>
      </section>

      <div className="mt-8 space-y-6">
        <CardSection title={`Foot care services available in ${page.area}`}>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-xl border border-brand-sageLight/25 bg-brand-offwhite/60 p-3 font-semibold text-brand-sageDark"
              >
                {service}
              </div>
            ))}
          </div>
          <Link
            href="/services"
            className="mt-4 inline-block font-semibold text-brand-sageDark underline underline-offset-4"
          >
            View all services
          </Link>
        </CardSection>

        <CardSection title={`Home foot-care coverage in ${page.area}`}>
          <p>{page.localCoverage}</p>
        </CardSection>

        <CardSection title="Planning your home visit">
          <p>{page.accessInformation ?? page.localAccessNote}</p>
        </CardSection>

        <CardSection title="Who home visits may help">
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {(page.suitableFor ?? benefitItems).map((item) => (
              <li className="rounded-xl bg-brand-sageLight/15 p-3" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </CardSection>

        <CardSection title="What happens during an appointment?">
          <ol className="grid gap-3 md:grid-cols-3">
            {appointmentSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl bg-brand-sageLight/15 p-4"
              >
                <span className="text-sm font-semibold text-brand-sageDark">
                  {index + 1}. {step.title}
                </span>
                <p className="mt-2 text-sm">{step.text}</p>
              </li>
            ))}
          </ol>
        </CardSection>

        <CardSection title="Pricing">
          <div className="grid gap-3 sm:grid-cols-2">
            {prices.map((price) => (
              <div
                key={price.name}
                className="rounded-xl bg-brand-sageLight/15 p-4"
              >
                <div className="flex justify-between gap-3">
                  <span className="font-semibold text-brand-sageDark">
                    {price.name}
                  </span>
                  <span className="font-semibold text-brand-sageDark">
                    {price.price}
                  </span>
                </div>
                <p className="mt-1 text-sm text-brand-charcoal/70">
                  {price.description}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/prices"
            className="mt-4 inline-block font-semibold text-brand-sageDark underline underline-offset-4"
          >
            View full pricing
          </Link>
        </CardSection>

        {page.nearby.length ? (
          <CardSection title="Nearby areas">
            <div className="flex flex-wrap gap-3">
              {page.nearby.map((nearby) => (
                <Link
                  key={nearby.href}
                  href={nearby.href}
                  className="rounded-full border border-brand-sageLight/30 bg-brand-offwhite/70 px-4 py-2 font-semibold text-brand-sageDark underline underline-offset-4"
                >
                  {nearby.title}
                </Link>
              ))}
            </div>
          </CardSection>
        ) : null}

        <CardSection title="FAQs">
          <div className="space-y-3">
            {page.faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-xl border border-brand-sageLight/25 bg-brand-offwhite/60 p-4"
              >
                <summary className="cursor-pointer font-semibold text-brand-sageDark">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </CardSection>

        <CardSection title="When additional medical support may be needed">
          <p>
            Foot+ does not provide emergency medical care. Seek appropriate
            medical advice for open wounds, spreading redness, signs of
            infection, sudden swelling, severe unexplained pain, significant
            loss of sensation or urgent diabetes-related foot concerns.
          </p>
        </CardSection>
      </div>

      <section className="mt-8 rounded-2xl border border-brand-sageLight/30 bg-brand-sageDark p-6 text-white shadow-sm md:p-7">
        <h2 className="font-heading text-2xl font-semibold">
          Book a home foot care appointment in {page.area}
        </h2>
        <p className="mt-2 text-sm text-white/85 md:text-base">
          Appointments take place at home. Please provide your postcode so Foot+
          can confirm current availability.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={bookingHref} variant="primary">
            Book an appointment
          </Button>
          <a
            className="inline-flex items-center justify-center rounded-xl border border-white/70 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            href={phoneHref}
          >
            Call {phoneDisplay}
          </a>
          <a
            className="inline-flex items-center justify-center rounded-xl border border-white/70 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            href={emailHref}
          >
            Email Foot+
          </a>
        </div>
      </section>
    </main>
  );
}
