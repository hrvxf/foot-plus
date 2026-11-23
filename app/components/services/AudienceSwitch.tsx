"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Two-way switch between /services (families and individuals) and the care settings page,
// /supported-living-foot-care. Each side is a real link, so both pages keep their own
// URL, title and search listing. The thumb slides before the page changes, and
// the colours follow each page's palette (sage for services, slate for care).
const options = [
  { href: "/services", label: "For individuals" },
  { href: "/supported-living-foot-care", label: "For care settings" },
] as const;

export default function AudienceSwitch() {
  const pathname = usePathname();
  const current = pathname === options[1].href ? 1 : 0;
  const [selected, setSelected] = useState<0 | 1>(current);
  const care = current === 1;

  return (
    <nav aria-label="Who the services are for" className="mx-auto w-full max-w-md px-4 pt-5 md:pt-8">
      <div className={`relative grid grid-cols-2 rounded-full p-[5px] ${care ? "bg-care-mist" : "bg-brand-wash"}`}>
        <span
          aria-hidden="true"
          className={`absolute bottom-[5px] left-[5px] top-[5px] w-[calc(50%-5px)] rounded-full shadow-[0_2px_8px_rgba(31,44,53,0.16)] transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none ${
            care ? "bg-care-deep" : "bg-brand-sageDeep"
          } ${selected === 1 ? "translate-x-full" : "translate-x-0"}`}
        />
        {options.map((option, index) => {
          const active = selected === index;
          const idle = care ? "text-care-muted hover:text-care-ink" : "text-brand-muted hover:text-brand-charcoal";
          const ring = care ? "focus-visible:outline-care-deep" : "focus-visible:outline-brand-sageDark";
          return (
            <Link
              key={option.href}
              href={option.href}
              aria-current={index === current ? "page" : undefined}
              onClick={() => setSelected(index as 0 | 1)}
              data-analytics-id={`audience-switch-${index === 1 ? "care" : "individuals"}`}
              className={`relative flex min-h-11 items-center justify-center rounded-full text-[0.9375rem] font-semibold transition-colors duration-300 focus-visible:outline-[3px] focus-visible:outline-offset-2 ${ring} ${
                active ? "text-white" : idle
              }`}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
