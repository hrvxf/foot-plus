import Image from "next/image";

const trustChips = ["Premium care", "Home visits", "Bristol based"];

export default function HeroImageCard() {
  return (
    <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_32px_90px_-35px_rgba(0,0,0,0.6)] ring-1 ring-white/10 backdrop-blur-2xl md:p-8">
      <div className="absolute inset-0 opacity-60">
        <svg
          className="h-full w-full"
          viewBox="0 0 400 400"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="hero-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M0 48L48 0" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
              <circle cx="36" cy="12" r="2" fill="white" fillOpacity="0.12" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#hero-pattern)" />
        </svg>
      </div>
      <div className="absolute -left-12 top-8 h-40 w-40 rounded-full bg-white/25 blur-[80px]" />
      <div className="absolute -right-14 bottom-4 h-44 w-44 rounded-full bg-brand-sageLight/25 blur-[90px]" />
      <div className="absolute right-10 top-20 h-20 w-20 rounded-full bg-brand-sage/30 blur-[60px]" />

      <div className="relative flex min-h-[420px] flex-col justify-between gap-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
              Hero Image
            </p>
            <p className="text-sm font-medium text-white/90">Coming soon</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/10 shadow-[0_12px_30px_-18px_rgba(255,255,255,0.8)] backdrop-blur-xl">
            <Image
              src="/images/footplus-illustration.svg"
              alt=""
              aria-hidden="true"
              width={32}
              height={32}
              className="opacity-90"
            />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg font-semibold text-white/90">
            A premium photography space is reserved here for our upcoming hero image.
          </p>
          <p className="text-sm text-white/70">
            This card mirrors the final hero dimensions so we can swap the imagery
            without shifting layout or visual balance.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {trustChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/75"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
