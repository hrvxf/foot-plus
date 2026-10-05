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
