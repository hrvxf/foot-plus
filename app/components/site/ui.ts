// Shared class names for the redesigned marketing pages (home, services).
export const container = "mx-auto w-full max-w-6xl px-5 sm:px-6";
export const eyebrow = "text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-sageDark";
export const h2 =
  "mt-2 font-heading text-[1.9rem] font-semibold leading-tight text-brand-sageDeep sm:text-4xl md:text-[2.6rem]";
const btnBase =
  "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-base font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2";
export const btnPrimary = `${btnBase} bg-brand-sageDark text-white hover:bg-brand-sageDeep focus-visible:outline-brand-sageDark`;
export const btnGhost = `${btnBase} border-[1.5px] border-brand-sageLight bg-white text-brand-sageDeep hover:bg-brand-offwhite focus-visible:outline-brand-sageDark`;
export const btnWhite = `${btnBase} bg-white text-brand-sageDeep hover:bg-brand-offwhite focus-visible:outline-white`;
export const btnOutlineWhite = `${btnBase} border-[1.5px] border-white/60 text-white hover:bg-white/10 focus-visible:outline-white`;
export const textLink = "inline-flex items-center gap-2 font-semibold text-brand-sageDeep underline-offset-4 hover:underline";

// Editorial system used by the home page, header and footer (Nov 2026 redesign):
// type, hairline rules and one 8px-radius button. Six text sizes, 16px minimum.
export const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";
export const rule = "border-brand-charcoal/15";
export const focusRing =
  "focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark";
export const displayH1 =
  "font-heading text-[1.875rem] font-semibold leading-[1.2] tracking-[-0.01em] text-brand-charcoal md:text-[2.5rem] md:leading-[1.15]";
export const displayH2 =
  "font-heading text-2xl font-semibold leading-[1.25] text-brand-charcoal md:text-[1.75rem] md:leading-[1.2]";
export const displayH3 = "font-heading text-xl font-semibold leading-7 text-brand-charcoal";
export const lead = "text-lg leading-7 text-brand-charcoal md:text-xl md:leading-[1.5]";
export const body = "text-[1.0625rem] leading-[1.55] text-brand-charcoal md:text-lg md:leading-7";
export const small = "text-base leading-6 text-brand-charcoal";
export const btnSolid = `inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-brand-sageDark px-6 text-lg font-semibold text-white transition-colors duration-150 hover:bg-brand-sageDeep ${focusRing}`;
export const linkQuiet = `inline-flex min-h-12 items-center gap-2 font-semibold text-brand-sageDeep underline decoration-brand-sage decoration-[1.5px] underline-offset-4 transition-colors duration-150 hover:text-brand-charcoal ${focusRing}`;
