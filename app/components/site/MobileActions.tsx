import Link from "next/link";
import { Phone } from "lucide-react";

import { phoneHref } from "../../lib/site";
import { mobileBarCall, mobileBarPrimary, mobileBarRow, mobileBarShell } from "./mobileBar";

/** Sticky Request / Call bar on small screens, styled like the home page bar. The footer makes room for it (see globals.css). */
export default function MobileActions({
  analyticsId,
  bookingHref = "/book",
  callHref = phoneHref,
}: {
  analyticsId: string;
  bookingHref?: string;
  /** Defaults to the general Foot+ number; Southampton pages pass theirs. */
  callHref?: string;
}) {
  return (
    <div data-mobile-actions className={mobileBarShell}>
      <div className={`${mobileBarRow} pointer-events-auto`}>
        <Link href={bookingHref} className={mobileBarPrimary} data-analytics-id={`${analyticsId}-mobile-book`}>
          Request a visit
        </Link>
        <a href={callHref} className={mobileBarCall} aria-label="Call Foot+" data-analytics-id={`${analyticsId}-mobile-phone`}>
          <Phone className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
