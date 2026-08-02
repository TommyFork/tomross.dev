"use client";

import { useEffect, useRef } from "react";

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const DURATION = 1400;

/** Counts up to `value` the first time it scrolls into view. */
export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const format = (latest: number) => {
      node.textContent = prefix + Math.round(latest).toLocaleString() + suffix;
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      format(value);
      return;
    }

    format(0);

    let frameId = 0;
    let startTime = 0;
    const step = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      format(value * eased);
      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frameId = window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [value, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {/* Server render + no-JS fallback. */}
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
