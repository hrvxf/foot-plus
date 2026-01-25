const sizeStyles = {
  sm: {
    badge: "h-32 w-32",
    icon: "h-[72px] w-[72px]",
  },
  md: {
    badge: "h-40 w-40 md:h-44 md:w-44",
    icon: "h-[92px] w-[92px] md:h-[104px] md:w-[104px]",
  },
  lg: {
    badge: "h-48 w-48 md:h-52 md:w-52",
    icon: "h-[112px] w-[112px] md:h-[124px] md:w-[124px]",
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function BrandSeal({ className, size = "md", alt = "" }) {
  const resolvedSize = sizeStyles[size] ?? sizeStyles.md;
  const isDecorative = alt.length === 0;

  return (
    <div className={cx("flex justify-center", className)}>
      <div
        className={cx(
          "relative flex items-center justify-center rounded-full border border-white/30 bg-white/15 shadow-[0_28px_70px_-35px_rgba(0,0,0,0.55)] ring-1 ring-white/20 backdrop-blur-2xl",
          resolvedSize.badge
        )}
      >
        <div className="pointer-events-none absolute inset-0 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -left-6 -top-5 h-20 w-20 rounded-full bg-white/60 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-brand-sageLight/45 blur-3xl" />
        <img
          src="/images/foot.svg"
          alt={alt}
          aria-hidden={isDecorative ? "true" : undefined}
          className={cx(
            "relative opacity-95 drop-shadow-md",
            resolvedSize.icon
          )}
        />
      </div>
    </div>
  );
}
