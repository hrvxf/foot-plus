export default function BristolMapCard() {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-4xl border border-brand-sageLight/40 bg-white shadow-[0_28px_80px_-60px_rgba(15,23,42,0.25)]">
      <div className="absolute inset-0 bg-[url('/images/footplus-texture.svg')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-linear-to-br from-white/80 via-white/70 to-brand-offwhite/80" />

      <div className="relative aspect-4/5 min-h-90 p-6">
        <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-brand-sageLight/40 bg-white/80 px-3 py-1 text-xs text-brand-charcoal/70 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-brand-sageLight" />
          Based in Bristol
        </div>

        <svg
          viewBox="0 0 400 500"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Stylised map of Bristol"
        >
          <defs>
            {/* River gradient */}
            <linearGradient id="river" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#9CC7B0" stopOpacity="0.55" />
              <stop offset="1" stopColor="#7FA89C" stopOpacity="0.85" />
            </linearGradient>

            {/* Road gradients */}
            <linearGradient id="roadsPrimary" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#D8E3DC" stopOpacity="0.95" />
              <stop offset="1" stopColor="#C7D7CF" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="roadsSecondary" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#E5EDE8" stopOpacity="0.9" />
              <stop offset="1" stopColor="#D6E3DD" stopOpacity="0.9" />
            </linearGradient>

            {/* Soft glow for river */}
            <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="
                  0 0 0 0 0.48
                  0 0 0 0 0.66
                  0 0 0 0 0.58
                  0 0 0 0.25 0"
                result="tint"
              />
              <feMerge>
                <feMergeNode in="tint" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Tiny sparkle (very subtle) */}
            <radialGradient id="spark" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="400" height="500" fill="transparent" />

          {/* SECONDARY STREETS (thin, more “map-like”) */}
          <g opacity="0.95">
            <path
              d="M40 155 C95 130, 150 150, 215 135 C280 120, 330 130, 370 160"
              fill="none"
              stroke="url(#roadsSecondary)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M55 245 C120 230, 170 250, 240 245 C310 240, 340 250, 375 275"
              fill="none"
              stroke="url(#roadsSecondary)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M70 355 C140 340, 210 360, 275 350 C330 342, 350 352, 378 380"
              fill="none"
              stroke="url(#roadsSecondary)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M120 85 C130 150, 150 215, 175 290 C200 360, 245 410, 295 452"
              fill="none"
              stroke="url(#roadsSecondary)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M210 78 C225 145, 250 215, 282 272 C318 335, 335 378, 346 445"
              fill="none"
              stroke="url(#roadsSecondary)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* PRIMARY ROADS (slightly thicker) */}
          <g opacity="1">
            <path
              d="M35 125 C120 88, 220 118, 312 80 C342 68, 362 78, 382 108"
              fill="none"
              stroke="url(#roadsPrimary)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M28 220 C120 208, 205 242, 285 210 C332 190, 360 210, 382 238"
              fill="none"
              stroke="url(#roadsPrimary)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M62 318 C140 298, 222 332, 292 320 C332 315, 360 330, 382 358"
              fill="none"
              stroke="url(#roadsPrimary)"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>

          {/* RIVER AVON (glowing, more “Bristol-ish”) */}
          <path
            d="M18 276
               C70 246, 120 260, 165 292
               C208 322, 262 338, 318 328
               C350 322, 372 310, 388 300"
            fill="none"
            stroke="url(#river)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
            filter="url(#softGlow)"
          />

          {/* Clifton Suspension Bridge glyph (top-left) */}
          <g opacity="0.6">
            <path
              d="M62 112 C78 98, 98 98, 114 112"
              fill="none"
              stroke="#7C8F7A"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M70 112 L70 90"
              stroke="#7C8F7A"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M106 112 L106 90"
              stroke="#7C8F7A"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M70 98 C82 92, 94 92, 106 98"
              fill="none"
              stroke="#7C8F7A"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>

          {/* Cabot Tower glyph (upper-right) */}
          <g opacity="0.55">
            <path
              d="M310 120 L318 86 L326 120 Z"
              fill="#7C8F7A"
              opacity="0.55"
            />
            <rect x="312" y="120" width="12" height="24" rx="2" fill="#7C8F7A" opacity="0.5" />
            <rect x="314" y="126" width="8" height="3" rx="1.5" fill="#F8FAF9" opacity="0.6" />
          </g>

          {/* Subtle landmark sparkles */}
          <g opacity="0.35">
            <circle cx="132" cy="208" r="7" fill="url(#spark)" />
            <circle cx="260" cy="240" r="6" fill="url(#spark)" />
            <circle cx="300" cy="312" r="7" fill="url(#spark)" />
          </g>

          {/* “You are here” marker (centre-ish) */}
          <circle cx="210" cy="260" r="12" fill="#FFFFFF" opacity="0.9" />
          <circle cx="210" cy="260" r="7" fill="#6FA18E" />
          <path
            d="M210 236 C203 248, 196 261, 210 280 C224 261, 217 248, 210 236 Z"
            fill="#6FA18E"
          />
        </svg>

        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-brand-sageLight/40 bg-white/90 p-4 shadow-sm">
          <p className="text-sm font-medium text-brand-sageDark">Based in Bristol</p>
          <p className="mt-1 text-xs text-brand-charcoal/60">
            Serving Bristol & nearby areas
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-brand-sageLight/50" />
    </div>
  );
}