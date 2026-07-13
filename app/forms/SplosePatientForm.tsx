"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./SplosePatientForm.module.css";

const LOAD_TIMEOUT_MS = 12000;

export type SplosePatientFormProps = {
  formUrl: string;
  title: string;
  contactHref: string;
};

type FormStatus = "loading" | "loaded" | "timeout" | "error";

export default function SplosePatientForm({ formUrl, title, contactHref }: SplosePatientFormProps) {
  const [status, setStatus] = useState<FormStatus>("loading");
  const [retryCount, setRetryCount] = useState(0);
  const loadedRef = useRef(false);

  useEffect(() => {
    loadedRef.current = false;

    const timer = window.setTimeout(() => {
      if (!loadedRef.current) {
        setStatus("timeout");
      }
    }, LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timer);
  }, [retryCount]);

  const showOverlay = status !== "loaded";
  const showFallbackActions = status === "timeout" || status === "error";

  return (
    <div className="rounded-[28px] border border-brand-sageLight/35 bg-white p-3 shadow-sm sm:p-4">
      <div className={`${styles.formShell} relative bg-brand-offwhite`}>
        <iframe
          key={retryCount}
          src={formUrl}
          name="embeddableForm"
          title={title}
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          scrolling="auto"
          width="100%"
          height="100%"
          onLoad={() => {
            loadedRef.current = true;
            setStatus("loaded");
          }}
          onError={() => setStatus("error")}
        />

        {showOverlay ? (
          <div className="absolute inset-0 z-10 flex flex-col bg-white p-5 text-brand-charcoal sm:p-6 md:p-8">
            <div className="rounded-2xl border border-brand-sageLight/30 bg-brand-offwhite/80 p-5 sm:p-6">
              <p
                className="text-xs font-bold uppercase tracking-[0.22em] text-brand-sageDark/75"
                role="status"
                aria-live="polite"
              >
                The secure patient form is loading.
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-brand-sageDark sm:text-3xl">
                Loading your secure patient form
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-charcoal/75 sm:text-base">
                This may take a few seconds.
              </p>

              {showFallbackActions ? (
                <div className="mt-5 rounded-2xl border border-brand-sageDark/20 bg-white p-4">
                  <h3 className="font-heading text-lg font-semibold text-brand-sageDark">
                    Still loading?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75">
                    The secure form can occasionally take longer to appear. You can try again, open
                    the Splose form directly in a new tab, or contact Foot+ for help completing it.
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full bg-brand-sageDark px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-sage focus:outline-none focus:ring-2 focus:ring-brand-sageDark focus:ring-offset-2"
                      onClick={() => {
                        setStatus("loading");
                        setRetryCount((count) => count + 1);
                      }}
                    >
                      Try loading again
                    </button>
                    <a
                      className="inline-flex items-center justify-center rounded-full border border-brand-sageDark/30 bg-white px-5 py-3 text-sm font-semibold text-brand-sageDark transition hover:bg-brand-sageLight/15 focus:outline-none focus:ring-2 focus:ring-brand-sageDark focus:ring-offset-2"
                      href={formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open form in a new tab
                    </a>
                    <a
                      className="inline-flex items-center justify-center rounded-full border border-brand-sageDark/30 bg-white px-5 py-3 text-sm font-semibold text-brand-sageDark transition hover:bg-brand-sageLight/15 focus:outline-none focus:ring-2 focus:ring-brand-sageDark focus:ring-offset-2"
                      href={contactHref}
                    >
                      Contact Foot+
                    </a>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-6 space-y-5 rounded-2xl border border-brand-sageLight/25 bg-white p-5 shadow-sm sm:p-6" aria-hidden="true">
              <div className={`${styles.skeletonBlock} h-3 w-2/3 rounded-full sm:w-1/2`} />
              <div className="space-y-4 pt-2">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="space-y-2">
                    <div className={`${styles.skeletonBlock} h-3 w-36 rounded-full`} />
                    <div className={`${styles.skeletonBlock} h-12 w-full rounded-xl`} />
                  </div>
                ))}
                <div className="space-y-2">
                  <div className={`${styles.skeletonBlock} h-3 w-44 rounded-full`} />
                  <div className={`${styles.skeletonBlock} h-28 w-full rounded-xl`} />
                </div>
                <div className={`${styles.skeletonBlock} h-12 w-40 rounded-full`} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
