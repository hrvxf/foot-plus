import Button from "../components/Button";
import PractitionerProfile from "../components/PractitionerProfile";

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
      <section className="mx-auto max-w-6xl px-6 pb-15 pt-10 md:pt-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* LEFT COLUMN: Intro + continuing sections */}
          <div className="space-y-10">
            {/* About Foot+ */}
            <div className="space-y-6">
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-brand-sageDark md:text-5xl">
                About Foot+ Bristol
              </h1>

              <p className="max-w-prose text-lg leading-relaxed text-brand-charcoal/80">
                Foot+ is a calm, professional home-visit foot health service across
                Bristol, led by Adam James. Appointments are designed to feel reassuring
                and unhurried — with clear explanations and care tailored to you.
              </p>

              <p className="max-w-prose text-sm leading-relaxed text-brand-charcoal/70">
                After six years working in healthcare and rehabilitation, Adam saw how
                often foot health is overlooked — and how much of a difference the right
                care and simple education can make. Foot+ was created around three
                things: trust, clarity, and achievable outcomes you can actually feel
                day to day.
              </p>

              <p className="max-w-prose text-sm italic leading-relaxed text-brand-charcoal/60">
                You should leave feeling listened to, reassured, and confident about what
                happens next.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-brand-sageLight/40 bg-white px-3 py-1 text-xs text-brand-charcoal/70"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
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

            {/* Why patients choose Foot+ (kept in left column to fill the “dead zone”) */}
            <div className="rounded-[28px] border border-brand-sageLight/40 bg-white p-7 shadow-[0_18px_50px_-45px_rgba(15,23,42,0.18)] md:p-8">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-brand-sageDark">
                    Why patients choose Foot+
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-brand-charcoal/70">
                    A friendly service built around trust, clarity, and outcomes.
                  </p>
                </div>
                <div className="hidden text-xs font-semibold text-brand-charcoal/40 md:block">
                  Home visits • Bristol
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {[
                  {
                    title: "A relaxed, human approach",
                    body:
                      "Appointments are calm, friendly, and never rushed. You’ll be listened to, treated with respect, and supported at every step.",
                  },
                  {
                    title: "Clear explanations & education",
                    body:
                      "Understanding your foot health matters. Everything is explained clearly so you can make informed decisions with confidence.",
                  },
                  {
                    title: "Focused on achievable outcomes",
                    body:
                      "Care is realistic, tailored, and outcome-focused — helping you stay comfortable, mobile, and confident between visits.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-brand-sageLight/40 bg-white p-5 shadow-[0_14px_40px_-40px_rgba(15,23,42,0.16)]"
                  >
                    <h3 className="font-heading text-base font-semibold text-brand-sageDark">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/70">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Appointment expectations (also left column) */}
            <div className="rounded-[28px] border border-brand-sageLight/40 bg-white p-7 shadow-[0_18px_50px_-45px_rgba(15,23,42,0.18)] md:p-8">
              <h2 className="font-heading text-lg font-semibold text-brand-sageDark">
                What to expect
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-brand-charcoal/70">
                Simple, reassuring care — with hygiene, comfort, and aftercare at the
                centre.
              </p>

              <div className="mt-6 grid gap-4">
                {[
                  {
                    title: "A calm first visit",
                    body:
                      "We’ll talk through your concerns, check your feet and nails, and agree a plan. You’ll always know what’s happening and why.",
                  },
                  {
                    title: "Hygiene & safety",
                    body:
                      "Professional infection control, sterile instruments, and careful hygiene standards are followed at every visit.",
                  },
                  {
                    title: "Aftercare you can follow",
                    body:
                      "Clear, realistic advice to help you stay comfortable between appointments — including footwear and skin care guidance.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="rounded-[22px] border border-brand-sageLight/40 bg-white p-5 shadow-[0_14px_40px_-40px_rgba(15,23,42,0.16)]"
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
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky practitioner card */}
          <PractitionerProfile />
        </div>

        {/* CTA (full width) */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-[26px] border border-brand-sageLight/40 bg-white p-7 shadow-[0_18px_45px_-40px_rgba(15,23,42,0.18)] md:flex-row md:items-center">
          <div>
            <h2 className="font-heading text-lg font-semibold text-brand-sageDark">
              Ready to book?
            </h2>
            <p className="mt-1 text-sm text-brand-charcoal/70">
              If you’re not sure what you need, message us and we’ll point you in the
              right direction. You can also review{" "}
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