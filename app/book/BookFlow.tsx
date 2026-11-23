"use client";

import { Suspense } from "react";
import StepsEnquiry from "./StepsEnquiry";

export default function BookFlow() {
  return (
    <div className="mx-auto w-full max-w-md px-6 pb-16 pt-6 md:pb-24 md:pt-14">
      <Suspense fallback={<p className="text-sm text-brand-muted">Loading…</p>}>
        <StepsEnquiry />
      </Suspense>
    </div>
  );
}
