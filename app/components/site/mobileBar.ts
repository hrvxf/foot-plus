import { focusRing } from "./ui";

/**
 * Shared look for the phone sticky action bars (HomeMobileBar on the home page,
 * MobileActions everywhere else), so both stay the same: a soft fade instead of
 * a sheet, a Sage Dark pill for the main action and a round white call button.
 */

/** The fixed wrapper. Clicks pass through the fade; add `pointer-events-auto` to the row to turn them back on. */
export const mobileBarShell =
  "pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3.5 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-10 [background:linear-gradient(transparent,rgba(247,246,242,0.95)_55%)] md:hidden";

export const mobileBarRow = "mx-auto flex max-w-md items-center gap-2.5";

export const mobileBarPrimary = `flex h-[54px] flex-1 items-center justify-center rounded-full bg-brand-sageDark font-heading text-base font-semibold text-white shadow-[0_16px_30px_-16px_rgba(36,48,40,0.6)] transition-colors hover:bg-brand-sageDeep ${focusRing}`;

export const mobileBarCall = `flex h-[54px] w-[54px] flex-none items-center justify-center rounded-full border border-brand-line bg-white text-brand-sageDark shadow-[0_10px_24px_-14px_rgba(36,48,40,0.5)] transition-colors hover:bg-brand-wash ${focusRing}`;
