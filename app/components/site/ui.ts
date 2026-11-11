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
// type, hairline rules and one 8px-radius button. 16px minimum text size.
// Three text levels: deep green for headings and figures, charcoal for body,
// muted for supporting detail.
export const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";
export const rule = "border-brand-charcoal/15";
export const focusRing =
  "focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark";
export const displayH1 =
  "font-heading text-[2.125rem] font-semibold leading-[1.15] tracking-[-0.015em] text-brand-sageDeep md:text-[2.75rem] md:leading-[1.1] lg:text-[3.25rem]";
export const displayH2 =
  "font-heading text-[1.625rem] font-semibold leading-[1.2] tracking-[-0.01em] text-brand-sageDeep md:text-[2.125rem] md:leading-[1.15]";
export const displayH3 = "font-heading text-xl font-semibold leading-7 text-brand-sageDeep";
/** Large numerals: prices, the rating, step numbers. */
export const figure = "font-heading font-semibold leading-none tracking-[-0.02em] tabular-nums";
export const supporting = "text-base leading-6 text-brand-muted";
/** Dark green surface with a hint of the brand paper grain. White text stays above 4.5:1. */
export const texturedGreen =
  "relative isolate overflow-hidden bg-[url('/images/footplus-texture.png')] bg-size-[600px_600px] text-white before:absolute before:inset-0 before:-z-10 before:bg-brand-sageDark/85";
export const lead = "text-lg leading-7 text-brand-charcoal md:text-xl md:leading-[1.5]";
export const body = "text-[1.0625rem] leading-[1.55] text-brand-charcoal md:text-lg md:leading-7";
export const small = "text-base leading-6 text-brand-charcoal";
export const btnSolid = `inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-brand-sageDark px-6 text-lg font-semibold text-white transition-colors duration-150 hover:bg-brand-sageDeep ${focusRing}`;
export const linkQuiet = `inline-flex min-h-12 items-center gap-2 font-semibold text-brand-sageDeep underline decoration-brand-sage decoration-[1.5px] underline-offset-4 transition-colors duration-150 hover:text-brand-charcoal ${focusRing}`;
