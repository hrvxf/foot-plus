"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "./CookieConsent";

/** Reopens the cookie banner so visitors can change or withdraw their choice. */
export default function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      Cookies
    </button>
  );
}
