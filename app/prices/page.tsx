export default function PricesPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
      <h1 className="font-heading text-3xl font-semibold text-brand-sageDark">
        Prices
      </h1>
      <p className="mt-4 text-sm text-brand-charcoal/80">
        Transparent pricing for thorough, home-visit foot health appointments.
      </p>

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
        </div>

        <div className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-semibold text-brand-sageDark">
            Travel &amp; Coverage
          </h2>
          <p className="mt-3">
            Foot+ is based in central Bristol (BS2). Travel within central Bristol is
            included in the appointment price.
          </p>
          <p className="mt-3">
            A small travel supplement may apply for appointments further afield,
            depending on distance. This will always be confirmed at the time of
            booking.
          </p>
        </div>
      </div>
    </section>
  );
}
