export default function PractitionerProfile() {
  return (
    <div className="relative rounded-[28px] border border-brand-sageLight/40 bg-white p-6 shadow-[0_18px_50px_-45px_rgba(15,23,42,0.18)] transition-shadow transition-transform duration-300 ease-out focus-within:shadow-[0_22px_60px_-40px_rgba(15,23,42,0.22)] md:sticky md:top-24 md:p-8 md:hover:-translate-y-0.5 md:hover:shadow-[0_22px_60px_-40px_rgba(15,23,42,0.22)] md:focus-within:-translate-y-0.5">
      <div className="pointer-events-none absolute inset-x-6 top-3 hidden h-px bg-gradient-to-r from-transparent via-brand-sageLight/60 to-transparent opacity-20 transition-opacity duration-300 md:block md:hover:opacity-40 md:focus-within:opacity-40" />
      <div className="grid gap-6">
        {/* Portrait */}
        <div
          className="relative aspect-4/5 overflow-hidden rounded-3xl bg-white shadow-[0_16px_40px_-32px_rgba(15,23,42,0.25)]"
          role="img"
          aria-label="Portrait of Adam James, Foot+ foot health practitioner."
          style={{
            backgroundImage: "url('/images/Adam-James.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />

        {/* Header */}
        <div className="space-y-4">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-brand-sageDark">
              Adam James
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {["BA", "Dip FH", "MCFHP", "MAFHP"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-brand-sageLight/40 bg-brand-offwhite/60 px-3 py-1 text-xs font-medium text-brand-charcoal/70"
                >
                  {badge}
                </span>
              ))}
            </div>

            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-charcoal/60">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-sageLight" />
              Foot Health Practitioner
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-4 text-base leading-relaxed text-brand-charcoal/80">
            <p>
              Adam has over six years’ experience working in healthcare and
              rehabilitation, supporting people to regain confidence, mobility, and
              independence. Through this work, he became increasingly aware of how often
              foot health is overlooked - and the difference that proper care and
              education can make.
            </p>

            <p>
              As a fully trained Foot Health Practitioner, Adam offers a friendly,
              relaxed service built on trust, clear communication, and achievable,
              measurable outcomes. He takes time to listen, explain each step, and
              ensure every client feels comfortable and informed throughout their
              appointment.
            </p>

            <p>
              Adam is fully insured and professionally recognised as a member of the
              College of Foot Health Practitioners and the Association of Foot Health
              Practitioners. His priority is simple: that every client feels heard,
              reassured, and confident in their foot health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
