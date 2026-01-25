export default function BristolMapCard() {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-brand-sageLight/40 bg-white shadow-[0_28px_80px_-60px_rgba(15,23,42,0.25)]">
      <div className="absolute inset-0 bg-[url('/images/footplus-texture.svg')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-linear-to-br from-white/80 via-white/70 to-brand-offwhite/80" />

      <div className="relative aspect-[4/5] min-h-[360px] p-6">
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
            <linearGradient id="river" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#9CC7B0" stopOpacity="0.6" />
              <stop offset="1" stopColor="#7FA89C" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="streets" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#D8E3DC" stopOpacity="0.9" />
              <stop offset="1" stopColor="#C7D7CF" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <rect width="400" height="500" fill="transparent" />

          <path
            d="M40 130 C120 90, 220 120, 310 80 C340 70, 360 80, 380 110"
            fill="none"
            stroke="url(#streets)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M30 220 C120 210, 200 240, 280 210 C330 190, 360 210, 380 240"
            fill="none"
            stroke="url(#streets)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M60 320 C140 300, 220 330, 290 320 C330 315, 360 330, 380 360"
            fill="none"
            stroke="url(#streets)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M90 70 C100 140, 120 210, 140 280 C160 350, 210 400, 260 440"
            fill="none"
            stroke="url(#streets)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M180 60 C200 140, 230 210, 260 260 C300 320, 320 360, 330 430"
            fill="none"
            stroke="url(#streets)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M20 260 C80 240, 140 260, 190 290 C240 320, 310 330, 380 300"
            fill="none"
            stroke="url(#river)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />

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

      <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-brand-sageLight/50" />
    </div>
  );
}
