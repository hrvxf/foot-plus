"use client";

import { useEffect, useState } from "react";

type Props = {
  /** ISO date-time of the launch, e.g. "2026-11-07T09:00:00+00:00". */
  launchAt: string;
};

function remaining(target: number) {
  const ms = Math.max(0, target - Date.now());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  return { days, hours, done: ms === 0 };
}

/**
 * Renders nothing on the server and until mounted, so the static page never
 * shows a stale count and there is no hydration mismatch.
 */
export default function LaunchCountdown({ launchAt }: Props) {
  const [left, setLeft] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    const target = new Date(launchAt).getTime();
    const tick = () => setLeft(remaining(target));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [launchAt]);

  if (!left || left.done) return null;

  const cells = [
    { value: left.days, label: left.days === 1 ? "day" : "days" },
    { value: left.hours, label: left.hours === 1 ? "hour" : "hours" },
  ];

  return (
    <div className="flex gap-2">
      <p className="sr-only">{`${left.days} days and ${left.hours} hours until launch`}</p>
      {cells.map((cell) => (
        <div key={cell.label} className="min-w-16 rounded-xl bg-brand-offwhite px-3 py-2 text-center" aria-hidden="true">
          <span className="block font-heading text-2xl font-semibold leading-tight text-brand-sageDeep">{cell.value}</span>
          <span className="text-xs text-brand-muted">{cell.label}</span>
        </div>
      ))}
    </div>
  );
}
