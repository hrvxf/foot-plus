import Link from "next/link";

import type { Practitioner } from "../../lib/locations";
import { body, displayH2, linkQuiet, shell } from "./ui";

/**
 * "Meet Adam" / "Meet Katie" band on the location pages. Renders nothing until the
 * practitioner has a bio in app/lib/locations.ts, so a new location can go live
 * before its bio is written.
 */
export default function MeetPractitioner({
  practitioner,
  aboutHref,
  className = "",
}: {
  practitioner: Practitioner;
  /** Their section on the About page, e.g. "/about#adam-james". */
  aboutHref: string;
  className?: string;
}) {
  const [first, second] = practitioner.bio;
  if (!first) return null;

  const firstName = practitioner.name.split(" ")[0];
  const slug = firstName.toLowerCase();

  return (
    <section id={`meet-${slug}`} className={`scroll-mt-24 ${className}`} aria-labelledby={`meet-${slug}-heading`}>
      <div className={`${shell} grid gap-6 lg:grid-cols-12 lg:gap-12`}>
        <h2 id={`meet-${slug}-heading`} className={`${displayH2} lg:col-span-4`}>
          Meet {firstName}
        </h2>
        <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:col-span-8">
          <p className={body}>{first}</p>
          <div>
            {second ? <p className={body}>{second}</p> : null}
            <Link href={aboutHref} className={`${linkQuiet} mt-2`}>
              {firstName}’s qualifications and approach
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
