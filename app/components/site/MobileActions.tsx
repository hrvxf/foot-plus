import Link from "next/link";
import { Phone } from "lucide-react";

import { phoneHref } from "../../lib/site";
import { btnGhost, btnPrimary } from "./ui";

/** Sticky Book / Call bar on small screens. Pair with bottom padding on the page. */
export default function MobileActions({ analyticsId }: { analyticsId: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-line bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <Link href="/book" className={`${btnPrimary} flex-1`} data-analytics-id={`${analyticsId}-mobile-book`}>
          Book a visit
        </Link>
        <a href={phoneHref} className={`${btnGhost} flex-1`} data-analytics-id={`${analyticsId}-mobile-phone`}>
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call
        </a>
      </div>
    </div>
  );
}
