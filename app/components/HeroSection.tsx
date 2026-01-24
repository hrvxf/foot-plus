import type { ReactNode } from "react";

type HeroSectionProps = {
  children: ReactNode;
  className?: string;
};

export default function HeroSection({ children, className }: HeroSectionProps) {
  return (
    <section className={`relative isolate -mt-20 pt-20 ${className ?? ""}`}>
      {children}
    </section>
  );
}
