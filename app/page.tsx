import Link from "next/link";

export default function Home() {
  return (
    <section className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-semibold mb-4">
        Professional Foot Health Care in Bristol
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Friendly, professional foot care services including nail care, corn and
        callus treatment, and routine foot health.
      </p>

      <div className="flex gap-3 justify-center">
        <Link
          href="/book"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg"
        >
          Book an Appointment
        </Link>
        <Link
          href="/about"
          className="inline-block border px-6 py-3 rounded-lg"
        >
          View Services
        </Link>
      </div>
    </section>
  );
}
