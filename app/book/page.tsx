import EnquiryForm from "../components/EnquiryForm";

export const metadata = {
  title: "Book a Foot Health Practitioner in Bristol | Foot+",
  description:
    "Request a Bristol home-visit appointment with Foot+. Calm, professional foot health care from a qualified practitioner.",
};

export default function BookPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
      <h1 className="font-heading text-3xl font-semibold text-brand-sageDark">
        Request a Bristol home-visit appointment
      </h1>

      <p className="mt-4 text-sm text-brand-charcoal/70">
        As a mobile service, appointments are arranged by location and availability
        across Bristol. Please submit an enquiry and we will contact you to arrange
        a suitable time with a qualified Foot Health Practitioner.
      </p>
      <p className="mt-3 text-sm text-brand-charcoal/70">
        Not sure what to book? Review{" "}
        <a className="font-semibold text-brand-sageDark underline" href="/prices">
          prices
        </a>{" "}
        or learn more{" "}
        <a className="font-semibold text-brand-sageDark underline" href="/about">
          about Foot+ Bristol
        </a>
        .
      </p>

      <div className="mt-8 grid gap-4 rounded-2xl border border-brand-sageLight/30 bg-white p-5 text-sm text-brand-charcoal/75 shadow-sm md:grid-cols-3 md:p-6">
        {[
          {
            title: "1) Send your request",
            body: "Share the basics, your preferred days, and any concerns.",
          },
          {
            title: "2) We confirm details",
            body: "We’ll contact you to confirm availability, location, and pricing.",
          },
          {
            title: "3) Treatment visit",
            body: "Calm, professional care with clear aftercare guidance.",
          },
        ].map((step) => (
          <div key={step.title} className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
              {step.title}
            </p>
            <p>{step.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-brand-sageLight/30 bg-white p-5 shadow-sm md:p-6">
        <EnquiryForm />
      </div>
    </section>
  );
}
