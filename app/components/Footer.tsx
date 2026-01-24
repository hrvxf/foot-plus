export default function Footer() {
  return (
    <footer className="mt-20 bg-brand-sage bg-[url('/images/footplus-texture.svg')] bg-cover bg-center bg-no-repeat text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <h3 className="font-heading text-lg font-semibold">Foot+ Bristol</h3>
          <p className="mt-2 text-sm text-white/80">
            Professional foot health services delivered with care, comfort, and clinical
            precision.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-white/80">
            Contact
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Call/WhatsApp: 07XXX XXXXXX</li>
            <li>Email: hello@footplusbristol.co.uk</li>
            <li>Serving: Bristol & nearby areas</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-white/80">
            Services
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Nail care & problem nails</li>
            <li>Fungal nail treatment</li>
            <li>Corns, hard skin & verrucas</li>
            <li>Diabetic foot care</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-xs text-white/70">
        © {new Date().getFullYear()} Foot+ • Bristol
      </div>
    </footer>
  );
}
