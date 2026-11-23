"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Phone, X } from "lucide-react";

import { focusRing } from "../components/site/ui";
import SplosePatientForm from "./SplosePatientForm";

/**
 * "Start my patient form" opens the Splose form over the whole screen, with the page
 * locked behind it, so there is only one thing to scroll (no form-inside-a-page).
 *
 * - Once opened, the form stays loaded while hidden, so closing by mistake keeps what's typed.
 * - The phone's back button closes it rather than leaving the page.
 */
export default function PatientFormLauncher({
  formUrl,
  title,
  contactHref,
  callHref,
  callLabel,
  analyticsId,
}: {
  formUrl: string;
  title: string;
  contactHref: string;
  callHref: string;
  /** e.g. "Call Adam" */
  callLabel: string;
  analyticsId: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const pushedState = useRef(false);

  const openForm = () => {
    setMounted(true);
    // Two frames: the first paints the sheet below the screen, so it slides up rather than popping in.
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
    // A history entry, so the back button closes the form instead of leaving the page.
    window.history.pushState({ footplusForm: true }, "");
    pushedState.current = true;
  };

  const closeForm = useCallback(() => {
    if (pushedState.current) {
      // Popping our entry closes the form via the popstate handler below.
      window.history.back();
    } else {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    const onPop = () => {
      pushedState.current = false;
      setOpen(false);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeForm();
    };
    window.addEventListener("keydown", onKey);
    const launcherButton = launcher.current;
    return () => {
      html.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      launcherButton?.focus({ preventScroll: true });
    };
  }, [open, closeForm]);

  const round = `inline-flex h-11 items-center justify-center gap-2 rounded-full text-[0.9375rem] font-semibold transition-colors ${focusRing}`;

  return (
    <>
      <button
        ref={launcher}
        type="button"
        onClick={openForm}
        aria-haspopup="dialog"
        data-analytics-id={analyticsId}
        className={`flex h-[60px] w-full items-center justify-center rounded-full bg-brand-sageDark px-7 text-lg font-semibold text-white shadow-[0_16px_34px_-22px_rgba(24,55,45,0.9)] transition-colors hover:bg-brand-sageDeep ${focusRing}`}
      >
        {mounted ? "Carry on with my form" : "Start my patient form"}
      </button>

      {mounted ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          aria-hidden={!open}
          inert={!open}
          className={`patient-form-sheet fixed inset-0 z-50 flex flex-col bg-brand-offwhite ${open ? "is-open" : ""}`}
        >
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-brand-line bg-white px-3 pb-2.5 pt-[calc(env(safe-area-inset-top)+10px)]">
            <button
              ref={closeButton}
              type="button"
              onClick={closeForm}
              className={`${round} bg-brand-wash px-4 text-brand-sageDeep hover:bg-brand-line`}
            >
              <X className="h-5 w-5" aria-hidden="true" />
              Close
            </button>
            <p className="truncate font-heading text-base font-semibold text-brand-charcoal">Patient form</p>
            <a href={callHref} className={`${round} bg-brand-sageDark px-4 text-white hover:bg-brand-sageDeep`}>
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              {callLabel}
            </a>
          </div>
          <div className="min-h-0 flex-1">
            <SplosePatientForm formUrl={formUrl} title={title} contactHref={contactHref} fill />
          </div>
        </div>
      ) : null}
    </>
  );
}
