import Link from "next/link";

const badges = [
  "Qualified FHP",
  "Sterile instruments",
  "Home visits",
  "Calm appointments",
];

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 md:pt-20">
        {/* Page header */}
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-brand-sageDark md:text-5xl">
              About Foot+ Bristol
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-brand-charcoal/80">
              We provide calm, professional foot health care in the comfort of your home.
              Our approach is gentle, unhurried, and focused on long-term comfort — with
              clear explanations and care tailored to you.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-brand-sageLight/40 bg-white px-3 py-1 text-xs text-brand-charcoal/70"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Book an appointment
              </Link>
              <a
                href="https://wa.me/447000000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-brand-sageLight/40 bg-white px-6 py-3 text-sm font-medium text-brand-charcoal transition hover:bg-brand-offwhite"
              >
                WhatsApp a question
              </a>
            </div>
          </div>

          {/* Editorial image frame placeholder */}
          <div className="md:justify-self-end">
            <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-brand-sageLight/40 bg-white shadow-[0_28px_80px_-60px_rgba(15,23,42,0.25)]">
              <div className="absolute -left-20 top-0 h-full w-[70%] rotate-12 bg-white blur-2xl opacity-70" />

              <div className="relative aspect-[4/5] p-6">
                <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-brand-sageLight/40 bg-white/80 px-3 py-1 text-xs text-brand-charcoal/70">
                  <span className="h-2 w-2 rounded-full bg-brand-sageLight" />
                  Photo coming soon
                </div>

                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-brand-sageLight/40 bg-white/90 p-4 shadow-sm">
                  <p className="text-sm font-medium text-brand-sageDark">
                    Calm, respectful care
                  </p>
                  <p className="mt-1 text-xs text-brand-charcoal/60">
                    Home visits across Bristol & nearby areas
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-brand-sageLight/50" />
            </div>
          </div>
        </div>

        {/* Glass content card */}
        <div className="mt-14 rounded-[28px] border border-brand-sageLight/40 bg-white p-8 shadow-[0_18px_50px_-45px_rgba(15,23,42,0.18)] md:p-10">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h2 className="font-heading text-lg font-semibold text-brand-sageDark">
                What we help with
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/70">
                Common foot and nail concerns treated with gentle, professional care.
              </p>
            </div>

            <div className="md:col-span-2">
              <ul className="grid gap-3 text-sm text-brand-charcoal/70 md:grid-cols-2">
                {[
                  "Nail care & thickened/problem nails",
                  "Ingrowing toenail relief",
                  "Corns & callus reduction",
                  "Verrucas & hard skin care",
                  "Dry, cracked heel care",
                  "Foot health assessment",
                  "Circulation & sensation checks",
                  "Diabetic foot care guidance",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-brand-sageLight" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Appointment expectations */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "A calm first visit",
              body:
                "We’ll talk through your concerns, check your feet and nails, and agree a plan. We’ll explain what we’re doing as we go.",
            },
            {
              title: "Hygiene & safety",
              body:
                "Clean, professional practice with sterile instruments and careful infection control standards throughout.",
            },
            {
              title: "Aftercare you can follow",
              body:
                "Simple, realistic advice to keep you comfortable between appointments — including footwear and skin care tips.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-[22px] border border-brand-sageLight/40 bg-white p-6 shadow-[0_14px_40px_-40px_rgba(15,23,42,0.16)]"
            >
              <h3 className="font-heading text-base font-semibold text-brand-sageDark">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/70">
                {c.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-[26px] border border-brand-sageLight/40 bg-white p-7 shadow-[0_18px_45px_-40px_rgba(15,23,42,0.18)] md:flex-row md:items-center">
          <div>
            <h2 className="font-heading text-lg font-semibold text-brand-sageDark">
              Ready to book?
            </h2>
            <p className="mt-1 text-sm text-brand-charcoal/70">
              If you’re not sure what you need, message us and we’ll point you in the right direction.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Book an appointment
            </Link>
            <a
              href="mailto:hello@footplusbristol.co.uk"
              className="inline-flex items-center justify-center rounded-full border border-brand-sageLight/40 bg-white px-6 py-3 text-sm font-medium text-brand-charcoal transition hover:bg-brand-offwhite"
            >
              Email
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
