"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Cookie consent for the two optional trackers: the Google tag (Analytics) and the Meta Pixel.
 * Nothing optional loads until the visitor accepts. The choice is kept in localStorage;
 * the footer's "Cookie settings" button reopens the banner via the OPEN_EVENT.
 */
const STORAGE_KEY = "fp-cookie-consent";
const GOOGLE_TAG_ID = "GT-NNS2WW3K";
const META_PIXEL_ID = "948452367747908";
export const OPEN_COOKIE_SETTINGS_EVENT = "fp:cookie-settings";

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/** In-memory fallback so the banner still closes when storage is blocked. */
let memoryChoice: Choice | null = null;
const CHANGE_EVENT = "fp:cookie-consent-change";

function saveChoice(choice: Choice) {
  memoryChoice = choice;
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* Storage blocked: the choice lasts for this page view only. */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** "unknown" on the server and during hydration, so nothing optional renders until the browser has checked. */
const getSnapshot = () => readChoice() ?? memoryChoice;
const getServerSnapshot = (): Choice | null | "unknown" => "unknown";

/** Best-effort removal of first-party tracking cookies when someone withdraws consent. */
function clearTrackingCookies() {
  const host = location.hostname.replace(/^www\./, "");
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0]?.trim();
    if (!name || !/^(_ga|_gid|_gat|_gcl|_fbp|_fbc)/.test(name)) continue;
    for (const domain of ["", `; domain=${host}`, `; domain=.${host}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

const focus = "focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark";

export default function CookieConsent() {
  const choice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [reopened, setReopened] = useState(false);
  const open = choice === null || reopened;

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const decide = (next: Choice) => {
    const withdrawing = choice === "granted" && next === "denied";
    saveChoice(next);
    setReopened(false);
    if (withdrawing) {
      // Scripts already running can't be unloaded, so clear their cookies and reload without them.
      clearTrackingCookies();
      location.reload();
    }
  };

  return (
    <>
      {choice === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GOOGLE_TAG_ID}');
            `}
          </Script>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        </>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-brand-line bg-brand-offwhite p-4 text-left text-brand-charcoal shadow-[0_12px_40px_rgba(36,48,40,0.18)] sm:bottom-5 sm:p-5"
        >
          <h2 id="cookie-consent-title" className="sr-only">
            Cookies
          </h2>
          <p className="text-sm leading-6 text-brand-charcoal/85">
            We&rsquo;d like to use analytics cookies to improve the site and our ads.{" "}
            <Link
              href="/privacy#cookies"
              className={`font-medium text-brand-sageDark underline decoration-brand-sageDark/30 underline-offset-4 hover:decoration-brand-sageDark ${focus}`}
            >
              More about cookies
            </Link>
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => decide("granted")}
              className={`min-h-11 flex-1 rounded-full bg-brand-sageDark px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-sageDeep ${focus}`}
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className={`min-h-11 flex-1 rounded-full border border-brand-sageDark px-5 text-sm font-semibold text-brand-sageDark transition-colors hover:bg-brand-sageDark/10 ${focus}`}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </>
  );
}
