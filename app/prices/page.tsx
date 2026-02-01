export default function PricesPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
      <h1 className="font-heading text-3xl font-semibold text-brand-sageDark">
        Prices
      </h1>
      <div className="mt-4 space-y-3 text-sm text-brand-charcoal/80">
        <p>
          Calm, expert foot care in the comfort of your home. Every appointment
          includes unhurried time, clear explanations, and treatment tailored to
          your goals.
        </p>
        <p>
          Transparent pricing with travel included across central Bristol, so you
          can book with confidence.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-sm text-brand-charcoal/80">
        <div className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-heading text-lg font-semibold text-brand-sageDark">
              New Patient Appointment
            </h2>
            <span className="text-base font-semibold text-brand-sageDark">£60</span>
          </div>
          <p className="mt-3">
            A comprehensive initial appointment including a full neurovascular
            assessment and treatment. This allows time to understand your medical
            history, assess foot health, and provide tailored care.
          </p>
          <div className="mt-4 rounded-xl bg-brand-sageLight/20 p-4">
            <p className="font-semibold text-brand-sageDark">What’s included</p>
            <ul className="mt-3 space-y-2">
              <li>Detailed medical history and foot health review.</li>
              <li>Full neurovascular assessment.</li>
              <li>Tailored treatment and care plan advice.</li>
              <li>Time to discuss concerns and next steps.</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-heading text-lg font-semibold text-brand-sageDark">
              Routine Appointment (45 minutes)
            </h2>
            <span className="text-base font-semibold text-brand-sageDark">£55</span>
          </div>
          <p className="mt-3">
            An ongoing treatment appointment focused on maintaining foot health,
            comfort, and mobility.
          </p>
          <div className="mt-4 rounded-xl bg-brand-sageLight/20 p-4">
            <p className="font-semibold text-brand-sageDark">What’s included</p>
            <ul className="mt-3 space-y-2">
              <li>45-minute focused treatment session.</li>
              <li>Skin and nail care, including callus and hard skin management.</li>
              <li>Ongoing assessment of comfort and mobility.</li>
              <li>Advice to support healthy feet between visits.</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-semibold text-brand-sageDark">
            Travel &amp; Coverage
          </h2>
          <p className="mt-3">
            Foot+ is based in central Bristol (BS2). Travel across inner Bristol is included in the appointment price.
          </p>
          <p className="mt-3">
            A small travel supplement may apply for appointments further afield.
            If you’re just outside these areas, please get in touch and we’ll
            confirm any additional travel costs before you book.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          className="inline-flex items-center justify-center rounded-full bg-brand-sageDark px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-sageDark/90"
          href="/contact"
        >
          Book an appointment
        </a>
        <a
          className="inline-flex items-center justify-center rounded-full border border-brand-sageDark/40 px-6 py-3 text-sm font-semibold text-brand-sageDark transition hover:border-brand-sageDark"
          href="/contact"
        >
          Contact us
        </a>
      </div>
    </section>
  );
}
