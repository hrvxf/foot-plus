export default function Footer() {
  return (
    <footer className="mt-20 relative overflow-hidden text-white">
      {/* Background texture */}
      <div className="absolute inset-0 bg-brand-sage bg-[url('/images/footplus-texture.svg')] bg-cover bg-center bg-no-repeat" />
      {/* Tint overlay for readability */}
      <div className="absolute inset-0 bg-brand-sage/70" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-4">
            <img
              src="/images/footplus-illustration.svg"
              alt=""
              aria-hidden
              className="h-12 w-12 opacity-80"
            />
            <h3 className="font-heading text-lg font-semibold tracking-tight">
              Foot+ Bristol
            </h3>
          </div>

          <p className="mt-4 text-sm text-white/85 leading-relaxed">
            Professional foot health services delivered with care, comfort, and
            clinical precision.
          </p>

          {/* Trust chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {["Qualified FHP", "Sterile instruments", "Home visits"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/85 border border-white/15"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-white/80">
            Contact
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/90">
            <li>
              <a
                className="hover:text-white underline-offset-4 hover:underline"
                href="tel:+447000000000"
              >
                Call: 07XXX XXXXXX
              </a>
              <span className="text-white/60"> • </span>
              <a
                className="hover:text-white underline-offset-4 hover:underline"
                href="https://wa.me/447000000000"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                className="hover:text-white underline-offset-4 hover:underline"
                href="mailto:hello@footplusbristol.co.uk"
              >
                hello@footplusbristol.co.uk
              </a>
            </li>
            <li className="text-white/80">
              Serving Bristol & nearby areas
            </li>
          </ul>
        </div>

        {/* Why Foot+ */}
        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-white/80">
            Why Foot+
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/90 leading-relaxed">
            <li>Calm, unhurried appointments in your own home</li>
            <li>Clear explanations and gentle, professional care</li>
            <li>Focused on comfort, dignity, and long-term foot health</li>
          </ul>

          <a
            href="/book"
            className="inline-flex mt-6 rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium border border-white/20 hover:bg-white/20 transition"
          >
            Book an appointment
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-white/70 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} Foot+ • Bristol
          </div>
          <div className="flex gap-4">
            <a
              className="hover:text-white hover:underline underline-offset-4"
              href="/privacy"
            >
              Privacy
            </a>
            <a
              className="hover:text-white hover:underline underline-offset-4"
              href="/terms"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
