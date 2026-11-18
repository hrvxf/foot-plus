"use client";

import { useEffect, useRef } from "react";

import { christmas, useSeason } from "../../lib/season";

type Flake = { x: number; y: number; r: number; speed: number; drift: number; phase: number; alpha: number };

/**
 * Light, slow snow behind the home hero content. Pale sage rather than white so it
 * shows on the off-white background. Fades out towards the bottom of the hero,
 * never takes clicks, pauses when off screen and is off for reduced motion.
 */
export default function Snowfall() {
  const on = useSeason(christmas.snow);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!on) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    let frame = 0;
    let last = 0;
    let visible = true;

    const make = (anywhere: boolean): Flake => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : -6,
      r: 1.2 + Math.random() * 2.4,
      speed: 12 + Math.random() * 22, // px per second
      drift: 6 + Math.random() * 14,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.35 + Math.random() * 0.4,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Sparse: roughly 30 flakes on a phone, 45 on a wide screen.
      const count = Math.round(Math.min(45, Math.max(24, width / 28)));
      flakes = Array.from({ length: count }, () => make(true));
    };

    const draw = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      ctx.clearRect(0, 0, width, height);

      for (const f of flakes) {
        f.y += f.speed * dt;
        f.phase += dt * 0.6;
        const x = f.x + Math.sin(f.phase) * f.drift;
        if (f.y > height + 6) Object.assign(f, make(false));

        ctx.beginPath();
        ctx.arc(x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(143, 179, 156, ${f.alpha})`; // brand sageLight
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (frame || !visible || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    const onVisibility = () => (document.hidden ? stop() : start());
    const resizeObserver = new ResizeObserver(resize);

    resize();
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [on]);

  if (!on) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
    />
  );
}
