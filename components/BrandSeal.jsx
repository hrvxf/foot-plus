const variantStyles = {
  footer: {
    badge: "h-14 w-14",
    icon: "h-20 w-20",
  },
  hero: {
    badge: "h-28 w-28 md:h-32 md:w-32",
    icon: "h-[84px] w-[84px] md:h-[96px] md:w-[96px]",
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function BrandSeal({
  className,
  variant = "footer",
  alt = "",
}) {
  const resolvedVariant = variantStyles[variant] ?? variantStyles.footer;
  const isDecorative = alt.length === 0;

  return (
    <div className={cx("flex justify-center", className)}>
      <div
        className={cx(
          "relative flex items-center justify-center overflow-visible rounded-2xl bg-white/12 ring-1 ring-white/15 backdrop-blur-sm shadow-[0_20px_50px_-30px_rgba(0,0,0,0.55)]",
          resolvedVariant.badge
        )}
      >
        <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-white/20 blur-2xl" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/35 via-white/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_2px_8px_rgba(255,255,255,0.25),inset_0_-6px_12px_rgba(0,0,0,0.2)]" />
        <img
          src="/images/foot.svg"
          alt={alt}
          aria-hidden={isDecorative ? "true" : undefined}
          className={cx(
            "relative opacity-95 drop-shadow-md",
            resolvedVariant.icon
          )}
        />
      </div>
    </div>
  );
}
