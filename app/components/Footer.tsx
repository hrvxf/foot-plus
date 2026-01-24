export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 text-white">
      {/* Background texture */}
      <div className="absolute inset-0 bg-brand-sage bg-[url('/images/footplus-texture.svg')] bg-cover bg-center bg-no-repeat" />
      {/* Tint overlay for readability */}
      <div className="absolute inset-0 bg-brand-sage/65" />

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <img
              src="/images/footplus-illustration.svg"
              alt=""
              aria-hidden
              className="h-16 w-16 opacity-80"
            />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 font-heading text-2xl font-semibold tracking-tight">
                <img
                  src="/images/footplus-logo-white.svg"
                  alt="Foot+ logo"
                  className="h-7 w-auto"
                />
                <span>Bristol</span>
              </div>
              <div className="mt-1 text-base text-white/80">
                Calm, professional foot care at home.
              </div>
            </div>
          </div>

          {/* Contact + CTA */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/85">
              <a
                className="hover:text-white hover:underline underline-offset-4"
                href="tel:+447000000000"
              >
                Call
              </a>
              <a
                className="hover:text-white hover:underline underline-offset-4"
                href="https://wa.me/447000000000"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a
                className="hover:text-white hover:underline underline-offset-4"
                href="mailto:hello@footplusbristol.co.uk"
              >
                Email
              </a>
            </div>

            <a
              href="/book"
              className="inline-flex w-fit rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium border border-white/20 hover:bg-white/20 transition"
            >
              Book an appointment
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/15 pt-4">
          <div className="flex flex-col gap-2 text-xs text-white/70 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Foot+ • Bristol</div>
            <div className="flex gap-4">
              <a className="hover:text-white hover:underline underline-offset-4" href="/privacy">
                Privacy
              </a>
              <a className="hover:text-white hover:underline underline-offset-4" href="/terms">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
