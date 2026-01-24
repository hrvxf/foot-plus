export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-16 pt-24">
      <h1 className="font-heading text-3xl font-semibold text-brand-sageDark">
        Contact
      </h1>
      <p className="mt-4 text-sm text-brand-charcoal/80">
        Drop a message and we’ll get back to you.
      </p>

      <div className="mt-6 space-y-3 text-sm text-brand-charcoal/80">
        <div>
          <strong>Email:</strong> hello@footplusbristol.co.uk
        </div>
        <div>
          <strong>Call/WhatsApp:</strong> 07XXX XXXXXX
        </div>
        <div>
          <strong>Location:</strong> Bristol
        </div>
      </div>
    </section>
  );
}
