import EnquiryForm from "../components/EnquiryForm";

export default function BookPage() {
  return (
    <section className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-3">Request an Appointment</h1>

      <p className="text-gray-600 mb-6">
        As a mobile service, appointments are arranged by location and availability.
        Please submit an enquiry and we will contact you to arrange a suitable time.
      </p>

      <div className="border rounded-2xl p-5 md:p-6">
        <EnquiryForm />
      </div>
    </section>
  );
}
