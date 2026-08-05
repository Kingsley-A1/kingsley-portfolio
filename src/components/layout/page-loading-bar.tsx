"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, useAnimation } from "motion/react";

export function PageLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const controls = useAnimation();
  const [visible, setVisible] = useState(false);

  const start = useCallback(() => {
    setVisible(true);
    controls.start({
      scaleX: [0, 0.3, 0.6, 0.85],
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    });
  }, [controls]);

  const complete = useCallback(() => {
    controls.start({
      scaleX: 1,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    });
    setTimeout(() => setVisible(false), 300);
  }, [controls]);

  useEffect(() => {
    start();
    // Complete after a short delay to simulate page transition
    const timer = setTimeout(complete, 600);
    return () => clearTimeout(timer);
  }, [pathname, searchParams, start, complete]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-[9999] h-[3px] overflow-hidden pointer-events-none">
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-brand-blue via-brand-teal to-brand-amber"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={controls}
      />
    </div>
  );
}
