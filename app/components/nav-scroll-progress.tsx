"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  /** true = usuario con prefers-reduced-motion (sin barra de progreso) */
  disabled: boolean;
};

/**
 * Barra fina de progreso de scroll bajo el navbar.
 * Actualiza con scroll/resize (sin ScrollTrigger) para no tocar el scroller global del documento.
 */
export function NavScrollProgress({ disabled }: Props) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (disabled) {
      gsap.set(bar, { scaleX: 0, visibility: "hidden" });
      return;
    }

    gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%", visibility: "visible" });

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      gsap.set(bar, { scaleX: p });
    };

    const scheduleUpdate = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    const onLoad = () => update();
    window.addEventListener("load", onLoad);
    void document.fonts?.ready?.then(update).catch(() => update());

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", update);
      window.removeEventListener("load", onLoad);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [disabled]);

  return (
    <div
      ref={barRef}
      className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-indigo-500/80 via-violet-500/60 to-transparent pointer-events-none"
      aria-hidden
    />
  );
}
