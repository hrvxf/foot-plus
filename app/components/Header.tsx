import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/branding/logo.svg"
            alt="Foot+ logo"
            width={40}
            height={40}
            priority
          />
          <span className="font-semibold text-xl tracking-tight">
            Foot+
          </span>
        </Link>

        <div className="flex gap-5 text-sm">
          <Link href="/about">About</Link>
          <Link href="/book">Request an Appointment</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
