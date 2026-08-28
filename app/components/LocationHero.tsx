import Button from "./Button";
import PractitionerProfile from "./PractitionerProfile";
import type { Practitioner } from "../lib/locations";

type LocationHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
  contactActions?: { label: string; href: string; icon: "whatsapp" | "email"; external?: boolean }[];
  practitioner: Practitioner;
};

const trustItems = [
  { title: "Home visits", text: "Care in familiar surroundings" },
  { title: "Qualified practitioner", text: "Professional, insured care" },
  { title: "Clear guidance", text: "Honest advice and next steps" },
  { title: "Local service", text: "Coverage confirmed by postcode" },
];

function ContactIcon({ icon }: { icon: "whatsapp" | "email" }) {
  if (icon === "email") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M3.75 6.75h16.5v10.5H3.75V6.75Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m4.5 7.5 7.5 5.75 7.5-5.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.22-1.58A9.94 9.94 0 1 0 12.04 2Zm0 17.98a8.03 8.03 0 0 1-4.1-1.12l-.3-.18-3.1.94 1-3.02-.2-.31a7.94 7.94 0 1 1 6.7 3.69Zm4.4-5.96c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.19a7.25 7.25 0 0 1-1.34-1.66c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export default function LocationHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  contactActions,
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
            {contactActions?.length ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {contactActions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-sageLight/45 bg-white/70 text-brand-sageDark transition hover:-translate-y-0.5 hover:border-brand-sageDark/35 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    aria-label={action.label}
                    title={action.label}
                  >
                    <ContactIcon icon={action.icon} />
                  </a>
                ))}
              </div>
            ) : null}
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
