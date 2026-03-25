"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const x = useSpring(rawX, { stiffness: 200, damping: 22 });
  const y = useSpring(rawY, { stiffness: 200, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovered(!!target.closest("a, button, [data-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [rawX, rawY, visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Punto central */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x, y }}
      >
        <motion.div
          animate={{
            width: hovered ? 8 : 6,
            height: hovered ? 8 : 6,
            x: hovered ? -4 : -3,
            y: hovered ? -4 : -3,
            backgroundColor: hovered ? "#a78bfa" : "#ffffff",
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full"
        />
      </motion.div>

      {/* Anillo exterior */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: useSpring(rawX, { stiffness: 80, damping: 18 }),
          y: useSpring(rawY, { stiffness: 80, damping: 18 }),
        }}
      >
        <motion.div
          animate={{
            width: hovered ? 40 : 28,
            height: hovered ? 40 : 28,
            x: hovered ? -20 : -14,
            y: hovered ? -20 : -14,
            borderColor: hovered ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.2)",
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border"
        />
      </motion.div>
    </>
  );
}
