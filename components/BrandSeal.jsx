const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function BrandSeal({ className, alt = "" }) {
  const isDecorative = alt.length === 0;

  return (
    <div className={cx("flex justify-center", className)}>
      <div className="relative flex h-14 w-14 items-center justify-center overflow-visible rounded-2xl bg-white/12 ring-1 ring-white/20 shadow-[0_14px_40px_-26px_rgba(0,0,0,0.75)] backdrop-blur-md">
        {/* soft rim + highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/18 via-transparent to-black/10" />

        {/* inner depth */}
        <div className="pointer-events-none absolute inset-[2px] rounded-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-10px_16px_rgba(0,0,0,0.14)]" />

        {/* restrained glow */}
        <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-white/8 blur-2xl" />

        <img
          src="/images/foot.svg"
          alt={alt}
          aria-hidden={isDecorative ? "true" : undefined}
          className="relative h-20 w-20 opacity-95 drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)]"
        />
      </div>
    </div>
  );
}
