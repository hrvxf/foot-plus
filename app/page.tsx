import Link from "next/link";

const services = [
  { title: "Routine Nail Care", desc: "Safe, comfortable nail trimming and foot care." },
  { title: "Corn & Callus Reduction", desc: "Relief from pressure and painful hard skin." },
  { title: "Thickened Nails", desc: "Care for difficult or thickened nails with advice." },
  { title: "Foot Health Advice", desc: "Aftercare guidance to keep feet comfortable." },
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
          Foot Health Care in Bristol — Friendly, Professional, Comfortable
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Foot+ provides professional foot care including nail care, corn & callus treatment,
          and routine foot health support.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg"
          >
            Book an Appointment
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center border px-6 py-3 rounded-lg"
          >
            View Services
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Services</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s) => (
            <div key={s.title} className="border rounded-xl p-5">
              <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/about" className="underline">
            See full service details →
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">How it works</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "1) Request a slot", d: "Tell us what you need and when you’re free." },
            { t: "2) Confirm details", d: "We’ll reply to confirm time, location, and cost." },
            { t: "3) Appointment", d: "Professional treatment with aftercare advice." },
          ].map((x) => (
            <div key={x.t} className="border rounded-xl p-5">
              <h3 className="font-semibold mb-1">{x.t}</h3>
              <p className="text-gray-600">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Areas */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3">Areas covered</h2>
        <p className="text-gray-600">
          Bristol and nearby areas. If you’re not sure, send a message and we’ll confirm.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center border rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-2">Ready to book?</h2>
        <p className="text-gray-600 mb-6">
          Use the booking form and we’ll get back to you to confirm a time.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg"
        >
          Book now
        </Link>
      </section>
    </div>
  );
}
