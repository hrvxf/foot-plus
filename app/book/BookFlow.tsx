"use client";

import { Suspense } from "react";
import StepsEnquiry from "./StepsEnquiry";

export default function BookFlow() {
  return (
    <div className="mx-auto w-full max-w-md px-6 pb-16 pt-6 md:pb-24 md:pt-14 lg:max-w-[1200px] lg:px-8 lg:pb-28 lg:pt-16">
      {/* Outside Suspense so it's in the server HTML; the form itself renders in the browser. */}
      <h1 className="sr-only">Request a home visit</h1>
      <Suspense fallback={<p className="text-sm text-brand-muted">Loading…</p>}>
        <StepsEnquiry />
      </Suspense>
    </div>
  );
}
