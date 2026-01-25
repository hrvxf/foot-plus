const cx = (...classes) => classes.filter(Boolean).join(" ");

/**
 * @typedef {Object} BrandSealProps
 * @property {string} [className]
 * @property {"footer" | "hero"} [variant]
 * @property {string} [alt]
 */

/**
 * @param {BrandSealProps} props
 */
export default function BrandSeal({
  className = "",
  variant = "footer",
  alt = "",
}) {
  const isDecorative = alt.length === 0;
  const isHero = variant === "hero";

  return (
    <div
      className={cx(
        "relative flex h-14 w-14 items-center justify-center overflow-visible rounded-2xl bg-white/12 ring-1 ring-white/20 shadow-[0_14px_40px_-26px_rgba(0,0,0,0.75)]",
        isHero && "h-24 w-24",
        className
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
          "relative opacity-95",
          isHero ? "h-28 w-28" : "h-20 w-20"
        )}
      />
    </div>
  );
}
