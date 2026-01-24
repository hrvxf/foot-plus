import Image from "next/image";

const trustChips = ["Premium finish", "Calm experience", "Trusted care"];

export default function HeroImageCard() {
  return (
    <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.7)] ring-1 ring-white/15 backdrop-blur-2xl md:min-h-[420px] md:p-8">
      <div className="absolute inset-0">
        <svg
          className="h-full w-full opacity-20"
          viewBox="0 0 400 400"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="hero-diagonal"
              patternUnits="userSpaceOnUse"
              width="20"
              height="20"
              patternTransform="rotate(35)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="20"
                stroke="white"
                strokeOpacity="0.25"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#hero-diagonal)" />
        </svg>
      </div>
      <div className="absolute -left-16 top-10 h-44 w-44 rounded-full bg-white/30 blur-[90px]" />
      <div className="absolute -right-16 bottom-6 h-48 w-48 rounded-full bg-brand-sageLight/35 blur-[110px]" />
      <div className="relative flex h-full flex-col justify-between gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">
              HERO IMAGE
            </span>
            <p className="text-xs text-white/75">Coming soon</p>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/10 p-3 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <Image
              src="/images/footplus-illustration.svg"
              alt=""
              aria-hidden="true"
              width={40}
              height={40}
              className="opacity-90"
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-lg font-semibold text-white">
            A premium hero image will live here soon.
          </p>
          <p className="text-sm text-white/80">
            The final artwork will highlight our calm, clinical environment and the
            comfort-first approach to foot health care.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {trustChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/80"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
