import EnquiryForm from "../components/EnquiryForm";

export default function BookPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
      <h1 className="font-heading text-3xl font-semibold text-brand-sageDark">
        Request an Appointment
      </h1>

      <p className="mt-4 text-sm text-brand-charcoal/70">
        As a mobile service, appointments are arranged by location and availability.
        Please submit an enquiry and we will contact you to arrange a suitable time.
      </p>

      <div className="mt-8 rounded-2xl border border-brand-sageLight/30 bg-white p-5 shadow-sm md:p-6">
        <EnquiryForm />
      </div>
    </section>
  );
}
