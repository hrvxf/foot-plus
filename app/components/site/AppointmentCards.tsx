import Link from "next/link";
import { Check } from "lucide-react";

import { figure, focusRing } from "./ui";

type Appointment = {
  tag: string;
  title: string;
  price: string;
  duration: string;
  points: string[];
  href: string;
  cta: string;
  featured?: boolean;
};

/**
 * Prices page: the appointment types as side-by-side cards (stacked on phones).
 * The featured one (new patients) is solid sage with a "Start here" label; the
 * rest are white. Buttons sit at the bottom so they line up across cards.
 */
export default function AppointmentCards({ appointments }: { appointments: Appointment[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
      {appointments.map((appointment) => {
        const featured = Boolean(appointment.featured);
        return (
          <li
            key={appointment.title}
            className={`flex flex-col gap-5 rounded-2xl p-6 md:p-8 ${
              featured ? "bg-brand-sageDark text-white" : "border border-brand-line bg-white text-brand-charcoal"
            }`}
          >
            <span
              className={`self-start rounded-full px-3 py-1 text-sm font-semibold ${
                featured ? "bg-white/15 text-white" : "bg-brand-wash text-brand-sageDeep"
              }`}
            >
              {featured ? "Start here" : appointment.tag}
            </span>

            <div>
              <h3 className={`font-heading text-2xl font-semibold leading-tight ${featured ? "text-white" : "text-brand-sageDeep"}`}>
                {appointment.title}
              </h3>
              <p className={`mt-1 text-base leading-6 ${featured ? "text-white/85" : "text-brand-muted"}`}>
                {featured ? `${appointment.tag}. ` : ""}
                {appointment.duration}.
              </p>
            </div>

            <p className={`${figure} text-5xl md:text-6xl ${featured ? "text-white" : "text-brand-sageDeep"}`}>{appointment.price}</p>

            <ul className={`grid gap-2.5 border-t pt-5 ${featured ? "border-white/20" : "border-brand-line"}`}>
              {appointment.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-base leading-6">
                  <Check
                    className={`mt-0.5 h-5 w-5 shrink-0 ${featured ? "text-[#A8E6B8]" : "text-brand-sageDark"}`}
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <Link
              href={appointment.href}
              className={`mt-auto inline-flex min-h-14 items-center justify-center rounded-lg px-6 text-center text-lg font-semibold transition-colors duration-150 ${focusRing} ${
                featured
                  ? "bg-white text-brand-sageDeep hover:bg-brand-offwhite focus-visible:outline-white"
                  : "border-[1.5px] border-brand-sageLight bg-white text-brand-sageDeep hover:bg-brand-wash"
              }`}
            >
              {appointment.cta}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
