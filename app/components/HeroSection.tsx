import type { ReactNode } from "react";

type HeroSectionProps = {
  children: ReactNode;
  className?: string;
};

export default function HeroSection({ children, className }: HeroSectionProps) {
  return (
    <section
      className={`relative isolate -mt-12 pt-6 pb-4 md:-mt-20 md:pt-20 md:pb-20 ${className ?? ""}`}
    >
      {children}
    </section>
  );
}
