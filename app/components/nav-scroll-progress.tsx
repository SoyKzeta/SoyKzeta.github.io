"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  /** true = usuario con prefers-reduced-motion (no ScrollTrigger) */
  disabled: boolean;
};

/**
 * Barra fina de progreso de scroll bajo el navbar.
 */
export function NavScrollProgress({ disabled }: Props) {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const bar = barRef.current;
      if (!bar) return;

      if (disabled) {
        gsap.set(bar, { scaleX: 0, visibility: "hidden" });
        return;
      }

      gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%", visibility: "visible" });

      const tween = gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "max max",
          scrub: 0.25,
          invalidateOnRefresh: true,
        },
      });

      const refresh = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", refresh);
      const onLoad = () => refresh();
      window.addEventListener("load", onLoad);
      void document.fonts?.ready?.then(refresh).catch(() => refresh());

      return () => {
        window.removeEventListener("resize", refresh);
        window.removeEventListener("load", onLoad);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: barRef, dependencies: [disabled] }
  );

  return (
    <div
      ref={barRef}
      className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-indigo-500/80 via-violet-500/60 to-transparent pointer-events-none"
      aria-hidden
    />
  );
}
