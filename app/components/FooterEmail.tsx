"use client";

import { usePathname } from "next/navigation";

import { emailForPath } from "../lib/site";

/** Footer inbox: the location's own on its pages, otherwise the general one. */
export default function FooterEmail({ headingClass, linkClass }: { headingClass: string; linkClass: string }) {
  const email = emailForPath(usePathname());
  return (
    <>
      <h2 className={headingClass}>{email.heading}</h2>
      <a href={email.href} className={linkClass} data-analytics-id="footer-general-email">
        {email.display}
      </a>
    </>
  );
}
