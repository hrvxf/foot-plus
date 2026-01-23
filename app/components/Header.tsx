import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold text-xl">
          FOOT+
        </Link>

        <div className="flex gap-4 text-sm">
          <Link href="/about">About</Link>
          <Link href="/book">Book</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
