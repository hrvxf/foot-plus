import Button from "../components/Button";

export const metadata = {
  title: "Qualified Foot Health Practitioner in Bristol | About Foot+",
  description:
    "Meet Foot+ Bristol, a qualified foot health practitioner offering calm, insured, DBS-checked home visits across Bristol.",
};

const badges = [
  "Qualified Foot Health Practitioner",
  "Fully insured",
  "DBS checked",
  "Sterile instruments",
  "Home visits in Bristol",
];

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 md:pt-20">
        {/* Page header */}
        <div className="space-y-10">
          <div>
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-brand-sageDark md:text-5xl">
              About Foot+ Bristol
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-brand-charcoal/80">
              We provide calm, professional foot health care in the comfort of your home
              across Bristol. Our approach is gentle, unhurried, and focused on long-term
              comfort — with clear explanations and care tailored to you.
            </p>
            <p className="mt-4 max-w-prose text-sm text-brand-charcoal/70">
              Foot+ is led by a qualified Foot Health Practitioner (FHP), trained through
              an accredited foot health programme. We are fully insured, DBS checked, and
              follow strict hygiene and infection control standards for every home visit.
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
              <Button href="/book" variant="solid">
                Book an appointment
              </Button>
              <Button
                href="https://wa.me/447000000000"
                variant="outline"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp a question
              </Button>
            </div>
          </div>
        </div>

        {/* Practitioner introduction */}
        <div className="mt-12 rounded-[28px] border border-brand-sageLight/40 bg-white p-6 shadow-[0_18px_50px_-45px_rgba(15,23,42,0.18)] md:p-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-brand-offwhite shadow-[0_16px_40px_-32px_rgba(15,23,42,0.25)]"
              role="img"
              aria-label="Portrait of Adam James, Foot+ foot health practitioner."
              style={{ backgroundImage: "url('/image/adam-james.png')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10" />
            </div>
            <div className="space-y-4 md:pr-2">
              <div className="space-y-2">
                <h2 className="font-heading text-3xl font-semibold text-brand-sageDark">
                  About Adam James
                </h2>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-charcoal/60">
                  Foot Health Practitioner
                </p>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-brand-charcoal/80">
                <p>
                  Adam is a qualified Foot Health Practitioner with specialist training in
                  clinical foot care and home-visit practice. He combines evidence-based
                  techniques with modern, comfort-first methods to keep feet healthy,
                  supported, and pain free.
                </p>
                <p>
                  His approach is calm, patient-focused, and respectful, taking time to listen
                  and explain each step so you feel at ease. Every appointment is designed to
                  feel unhurried and reassuring, with care tailored to your goals and daily
                  comfort.
                </p>
                <p>
                  Foot+ was created to deliver high-quality foot health care in Bristol with a
                  premium, welcoming feel. Adam’s mission is to make professional foot care
                  accessible, consistent, and gentle—so you can move with confidence.
                </p>
              </div>
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
                Common foot and nail concerns treated with gentle, professional care in
                Bristol.
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
              You can also review{" "}
              <a className="font-semibold text-brand-sageDark underline" href="/prices">
                prices in Bristol
              </a>{" "}
              before booking.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href="/book" variant="solid">
              Book an appointment
            </Button>
            <Button href="mailto:hello@footplusbristol.co.uk" variant="outline">
              Email
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
