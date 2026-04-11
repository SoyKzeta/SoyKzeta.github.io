"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/** Cubic-bezier alineado con ease-out refinado (Framer / CSS). */
export const easeOutRefined: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Fade + slide up al entrar en viewport
export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const visible = prefersReducedMotion || inView;

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.6, delay, ease: easeOutRefined }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger: anima hijos uno por uno
export function StaggerContainer({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const visible = prefersReducedMotion || inView;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={visible ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : 0.1,
            delayChildren: prefersReducedMotion ? 0 : delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Item hijo para StaggerContainer
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: easeOutRefined,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Badge con pop al aparecer
export function PopIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const visible = prefersReducedMotion || inView;

  return (
    <motion.span
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.75 }}
      animate={visible ? { opacity: 1, scale: 1 } : {}}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.35, delay, ease: easeOutRefined }
      }
      className={className}
    >
      {children}
    </motion.span>
  );
}

// Línea divisora que se expande
export function AnimatedDivider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const visible = prefersReducedMotion || inView;

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
      animate={visible ? { scaleX: 1 } : {}}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.8, ease: easeOutRefined }
      }
      style={{ originX: 0 }}
      className="section-divider"
    />
  );
}
