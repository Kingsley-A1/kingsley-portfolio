"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useAnimation } from "motion/react";

const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const controls = useAnimation();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (inView) {
      if (reduced) {
        controls.start({ opacity: 1 });
      } else {
        controls.start({ opacity: 1, y: 0 });
      }
    }
  }, [inView, controls, reduced]);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={controls}
      transition={{
        duration: reduced ? 0.15 : 0.5,
        delay: reduced ? 0 : delay,
        ease: reduced ? "easeOut" : [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
