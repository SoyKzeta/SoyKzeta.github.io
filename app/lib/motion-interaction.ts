import type { HTMLMotionProps } from "framer-motion";

type Reduce = boolean | null | undefined;

function isReduced(r: Reduce): boolean {
  return r === true;
}

/** Cards tipo FlowsFy / ViveStone (sombra índigo). */
export function cardLiftIndigoProps(
  prefersReduced: Reduce
): Pick<HTMLMotionProps<"div">, "whileHover" | "whileTap" | "transition"> {
  if (isReduced(prefersReduced)) {
    return { transition: { duration: 0 } };
  }
  return {
    whileHover: {
      y: -3,
      boxShadow: "0 8px 32px rgba(99,102,241,0.12)",
    },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  };
}

/** Cards académicas con borde índigo al hover. */
export function cardLiftAcademicProps(prefersReduced: Reduce) {
  if (isReduced(prefersReduced)) {
    return { transition: { duration: 0 } };
  }
  return {
    whileHover: {
      y: -3,
      boxShadow: "0 8px 32px rgba(99,102,241,0.1)",
      borderColor: "rgba(99,102,241,0.3)",
    },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.25 },
  };
}

export function cardLiftEmeraldProps(prefersReduced: Reduce) {
  if (isReduced(prefersReduced)) {
    return { transition: { duration: 0 } };
  }
  return {
    whileHover: {
      y: -3,
      boxShadow: "0 8px 32px rgba(16,185,129,0.08)",
      borderColor: "rgba(16,185,129,0.25)",
    },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.25 },
  };
}

export function tagPopProps(prefersReduced: Reduce) {
  if (isReduced(prefersReduced)) {
    return { transition: { duration: 0 } };
  }
  return {
    whileHover: { scale: 1.08, y: -1 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.15 },
  };
}

export function contactCardLiftProps(prefersReduced: Reduce) {
  if (isReduced(prefersReduced)) {
    return { transition: { duration: 0 } };
  }
  return {
    whileHover: { y: -3 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  };
}

export function linkTapProps(prefersReduced: Reduce) {
  if (isReduced(prefersReduced)) {
    return { transition: { duration: 0 } };
  }
  return {
    whileTap: { scale: 0.97 },
    transition: { duration: 0.12 },
  };
}
