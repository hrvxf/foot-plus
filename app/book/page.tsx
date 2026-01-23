import CalendlyEmbed from "../components/CalendlyEmbed";

export default function BookPage() {
  const calendlyUrl = "https://calendly.com/YOUR-LINK-HERE"; // <- replace

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-2">Book an Appointment</h1>
      <p className="text-gray-600 mb-6">
        Choose a time that suits you using the booking calendar below.
      </p>

      <div className="border rounded-2xl p-4 md:p-6">
        <CalendlyEmbed url={calendlyUrl} />
      </div>
    </section>
  );
}
