"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Phone, X } from "lucide-react";

import { locationPhones, phoneLocationForPath, type PhoneLocation } from "../../lib/site";
import { focusRing } from "./ui";

const choices: { slug: PhoneLocation; name: string }[] = [
  { slug: "bristol", name: "Foot+ Bristol" },
  { slug: "southampton", name: "Foot+ Southampton" },
];

/**
 * A call button that always rings the right location. On a page that belongs to
 * one location it dials that number straight away. On shared pages (home,
 * services, prices…) it asks which area first, so nobody rings the wrong
 * practitioner.
 */
export default function CallButton({
  className,
  children,
  analyticsId,
  label,
}: {
  className: string;
  /** Button content. Receives the number when one location applies, else null. */
  children: (number: string | null) => ReactNode;
  analyticsId: string;
  /** Accessible name prefix, e.g. "Call Foot+". */
  label?: string;
}) {
  const pathname = usePathname();
  const location = phoneLocationForPath(pathname);
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (location) {
    const phone = locationPhones[location];
    return (
      <a href={phone.href} className={className} data-analytics-id={analyticsId} aria-label={label ? `${label} on ${phone.display}` : undefined}>
        {children(phone.display)}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        className={className}
        data-analytics-id={analyticsId}
        aria-haspopup="dialog"
        aria-label={label}
        onClick={() => dialogRef.current?.showModal()}
      >
        {children(null)}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={`${analyticsId}-title`}
        className="fixed inset-x-0 bottom-0 top-auto m-0 w-full max-w-none rounded-t-2xl bg-white p-0 text-brand-charcoal shadow-2xl backdrop:bg-brand-charcoal/45 sm:inset-0 sm:m-auto sm:max-w-sm sm:rounded-2xl"
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-5 sm:pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={`${analyticsId}-title`} className="font-heading text-xl font-semibold leading-7 text-brand-sageDeep">
                Which area are you in?
              </h2>
              <p className="mt-1 text-base leading-6 text-brand-muted">Each area has its own practitioner.</p>
            </div>
            <button
              type="button"
              aria-label="Close"
              className={`-mr-2 -mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-sageDeep hover:bg-brand-sageDark/10 ${focusRing}`}
              onClick={() => dialogRef.current?.close()}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <ul className="mt-4 grid gap-3">
            {choices.map(({ slug, name }) => (
              <li key={slug}>
                <a
                  href={locationPhones[slug].href}
                  data-analytics-id={`${analyticsId}-${slug}`}
                  onClick={() => dialogRef.current?.close()}
                  className={`flex min-h-16 items-center gap-4 rounded-xl border-[1.5px] border-brand-sageLight/70 px-4 py-3 transition-colors duration-150 hover:border-brand-sageDark hover:bg-brand-offwhite ${focusRing}`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-sageDark text-white">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-base font-medium leading-6 text-brand-muted">{name}</span>
                    <span className="font-heading text-lg font-semibold leading-6 text-brand-sageDeep">{locationPhones[slug].display}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
