import Link from "next/link";
import { Phone } from "lucide-react";

import { phoneHref } from "../../lib/site";
import { focusRing } from "./ui";

const action = `inline-flex h-[54px] items-center justify-center gap-2 rounded-full px-4 font-heading text-[17px] font-semibold transition-colors duration-150 ${focusRing}`;

/** Sticky Request / Call bar on small screens. The footer makes room for it (see globals.css). */
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
    <div data-mobile-actions className="fixed inset-x-0 bottom-0 z-40 rounded-t-[28px] border-t border-brand-line bg-brand-offwhite px-4 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-4 shadow-[0_-8px_28px_rgba(36,48,40,0.08)] md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <Link href={bookingHref} className={`${action} flex-[1.5] bg-brand-sageDark text-white hover:bg-brand-sageDeep`} data-analytics-id={`${analyticsId}-mobile-book`}>
          Request a visit
        </Link>
        <a href={callHref} className={`${action} flex-1 bg-brand-wash text-brand-sageDeep hover:bg-brand-line`} data-analytics-id={`${analyticsId}-mobile-phone`}>
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call
        </a>
      </div>
    </div>
  );
}
