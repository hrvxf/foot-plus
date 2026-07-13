import Link from "next/link";

export default function AuthorCard({ lastReviewed }: { lastReviewed?: string }) {
  return (
    <aside className="rounded-2xl border border-brand-sageLight/30 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sageDark/70">Content author</p>
      <h2 className="mt-2 font-heading text-lg font-semibold text-brand-sageDark">Written by Adam James, MCFHP, MAFHP</h2>
      <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75">Adam James is the Foot+ Bristol Foot Health Practitioner responsible for this service information.</p>
      {lastReviewed ? <p className="mt-2 text-xs text-brand-charcoal/60">Last reviewed: {lastReviewed}</p> : null}
      <Link href="/about" className="mt-3 inline-block text-sm font-semibold text-brand-sageDark underline">About Adam James</Link>
    </aside>
  );
}
