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
          {/* RIGHT COLUMN (mobile first): Practitioner profile */}
          <div className="order-1 md:order-2">
            <PractitionerProfile />
          </div>

          {/* LEFT COLUMN: Intro + continuing sections */}
          <div className="order-2 space-y-10 md:order-1">
            {/* About Foot+ */}
            <div className="space-y-6">
              <h1 className="font-heading text-4xl font-semibold tracking-tight text-brand-sageDark md:text-5xl">
                About Foot+ Bristol
              </h1>

              <p className="max-w-prose text-lg leading-relaxed text-brand-charcoal/80">
                Foot+ is a professional, home-visit foot health service across
                Bristol, led by Adam James. Appointments are designed to feel reassuring - 
                with clear explanations and care tailored to you.
              </p>

              <p className="max-w-prose text-sm leading-relaxed text-brand-charcoal/70">
                Foot+ is 
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
                
              </div>

              <div className="mt-6 grid gap-4">
                {[
                  {
                    title: "A relaxed, human approach",
                    body:
                      "Appointments are calm, friendly, and always patient led. You’ll be listened to, treated with respect, and supported at every step.",
                  },
                  {
                    title: "Clear explanations & education",
                    body:
                      "Understanding your foot health matters. Everything is explained clearly so you can make informed decisions with confidence.",
                  },
                  {
                    title: "Focused on achievable outcomes",
                    body:
                      "Care is realistic, tailored, and outcome-focused - helping you stay comfortable, mobile, and confident between visits.",
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


          </div>
        </div>

      </section>
    </main>
  );
}
