import Link from "next/link";
import { Phone } from "lucide-react";

import { phoneHref } from "../../lib/site";
import { focusRing } from "./ui";

const action = `inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-base font-semibold transition-colors duration-150 ${focusRing}`;

/** Sticky Request / Call bar on small screens. Pair with bottom padding on the page. */
export default function MobileActions({ analyticsId, bookingHref = "/book" }: { analyticsId: string; bookingHref?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-charcoal/15 bg-white px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <Link href={bookingHref} className={`${action} bg-brand-sageDark text-white hover:bg-brand-sageDeep`} data-analytics-id={`${analyticsId}-mobile-book`}>
          Request a visit
        </Link>
        <a href={phoneHref} className={`${action} border-[1.5px] border-brand-sageDark bg-white text-brand-sageDeep hover:bg-brand-offwhite`} data-analytics-id={`${analyticsId}-mobile-phone`}>
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call
        </a>
      </div>
    </div>
  );
}
