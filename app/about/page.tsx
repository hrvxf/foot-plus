export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
      <h1 className="font-heading text-3xl font-semibold text-brand-sageDark">
        About Foot+
      </h1>
      <p className="mt-4 text-sm text-brand-charcoal/80">
        Foot+ provides professional foot health services in Bristol. Our focus is
        comfort, safety, and helping you stay active.
      </p>

      <h2 className="font-heading mt-10 text-xl font-semibold text-brand-sageDark">
        Services
      </h2>
      <ul className="mt-4 space-y-2 text-sm text-brand-charcoal/80">
        <li>Routine nail care</li>
        <li>Corn and callus reduction</li>
        <li>Thickened nail management</li>
        <li>Foot health advice and aftercare</li>
      </ul>
    </section>
  );
}
