import Button from "./Button";
import PractitionerProfile from "./PractitionerProfile";
import type { Practitioner } from "../lib/locations";

type LocationHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
  practitioner: Practitioner;
};

const trustItems = [
  { title: "Home visits", text: "Care in familiar surroundings" },
  { title: "Qualified practitioner", text: "Professional, insured care" },
  { title: "Clear guidance", text: "Honest advice and next steps" },
  { title: "Local service", text: "Coverage confirmed by postcode" },
];

export default function LocationHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  practitioner,
}: LocationHeroProps) {
  return (
    <section className="border-b border-brand-sageLight/30 bg-linear-to-br from-brand-offwhite via-white to-brand-sageLight/10">
      <div className="mx-auto max-w-[1360px] px-6 pb-0 pt-10 md:px-10 md:pt-14 xl:px-14">
        <div className="grid items-center gap-12 pb-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] lg:gap-16 lg:pb-0">
          <div className="pb-0 lg:pb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sageDark/75">
              {eyebrow}
            </p>
            <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] tracking-[-0.025em] text-brand-sageDark sm:text-5xl lg:text-6xl xl:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-charcoal/75 md:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={primaryAction.href} variant="solid">{primaryAction.label}</Button>
              <Button href={secondaryAction.href} variant="outline">{secondaryAction.label}</Button>
            </div>
          </div>

          <PractitionerProfile practitioner={practitioner} />
        </div>
      </div>

      <div className="border-t border-brand-sageLight/30 bg-white/75">
        <div className="mx-auto grid max-w-[1360px] divide-y divide-brand-sageLight/30 px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:px-10 lg:grid-cols-4 xl:px-14">
          {trustItems.map((item) => (
            <div key={item.title} className="py-5 sm:px-6 first:sm:pl-0 last:sm:pr-0">
              <p className="font-heading text-base font-semibold text-brand-sageDark">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-brand-charcoal/60">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
