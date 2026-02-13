"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionTemplate } from "framer-motion";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const springProgress = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const widthStyle = useMotionTemplate`${springProgress}%`;

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      const clampedProgress = Math.min(100, Math.max(0, currentProgress));
      setScrollProgress(clampedProgress);
      springProgress.set(clampedProgress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [springProgress]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-neutral-200/50 z-[100]"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <motion.div
        className="h-full bg-[var(--brightbook-blue)]"
        style={{ width: widthStyle }}
      />
    </motion.div>
  );
}
