"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const ANIMATION_DURATION = 560;
const ANIMATION_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const BACKDROP_DURATION = 420;

type AnchorRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
  anchorRect?: AnchorRect | null;
  onExited?: () => void;
};

export default function ContactModal({
  open,
  onClose,
  anchorRect,
  onExited,
}: ContactModalProps) {
  const portalRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<Animation | null>(null);
  const backdropAnimationRef = useRef<Animation | null>(null);
  const latestOpenRef = useRef(open);
  const focusRef = useRef<HTMLAnchorElement | null>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const [render, setRender] = useState(open);
  const [displayState, setDisplayState] = useState<"closed" | "open" | "closing">(
    open ? "open" : "closed",
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [copied, setCopied] = useState(false);

  if (typeof document !== "undefined" && portalRef.current === null) {
    portalRef.current = document.createElement("div");
    portalRef.current.setAttribute("id", "contact-modal-root");
  }

  useEffect(() => {
    latestOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);

    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (open) {
      setRender(true);
      setDisplayState("open");
      return;
    }

    if (prefersReducedMotion) {
      setDisplayState("closed");
      setRender(false);
      onExited?.();
      return;
    }

    if (render) {
      setDisplayState("closing");
    }
  }, [open, render, prefersReducedMotion, onExited]);

  useEffect(() => {
    if (!open) return;

    const id = window.requestAnimationFrame(() => {
      focusRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!mounted || !portalRef.current) return;

    document.body.appendChild(portalRef.current);

    return () => {
      portalRef.current?.remove();
    };
  }, [mounted]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = null;
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (!render || !mounted) {
      return;
    }

    if (prefersReducedMotion) {
      if (!open) {
        setRender(false);
        setDisplayState("closed");
        onExited?.();
      }
      return;
    }

    const modal = modalRef.current;
    if (!modal) return;

    const modalRect = modal.getBoundingClientRect();
    const keyframes = buildModalKeyframes(modalRect, anchorRect);

    if (animationRef.current) {
      animationRef.current.cancel();
    }

    const animation = modal.animate(keyframes, {
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
      fill: "both",
      direction: open ? "normal" : "reverse",
    });

    animationRef.current = animation;

    animation.finished
      .then(() => {
        if (!latestOpenRef.current) {
          setRender(false);
          setDisplayState("closed");
          onExited?.();
        } else {
          setDisplayState("open");
        }
      })
      .catch(() => {})
      .finally(() => {
        animationRef.current = null;
      });

    const backdrop = backdropRef.current;
    if (backdrop) {
      if (backdropAnimationRef.current) {
        backdropAnimationRef.current.cancel();
      }

      const backdropAnimation = backdrop.animate(buildBackdropKeyframes(), {
        duration: BACKDROP_DURATION,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "both",
        direction: open ? "normal" : "reverse",
      });

      backdropAnimationRef.current = backdropAnimation;

      backdropAnimation.finished
        .catch(() => {})
        .finally(() => {
          backdropAnimationRef.current = null;
        });
    }

    return () => {
      animation.cancel();
      if (backdropAnimationRef.current) {
        backdropAnimationRef.current.cancel();
        backdropAnimationRef.current = null;
      }
    };
  }, [open, render, mounted, anchorRect, prefersReducedMotion, onExited]);

  const email = useMemo(() => {
    const user = process.env.NEXT_PUBLIC_EMAIL_USER || "hello";
    const domain = process.env.NEXT_PUBLIC_EMAIL_DOMAIN || "tomross.dev";
    return `${user}@${domain}`;
  }, []);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Let's collaborate");
    return `mailto:${email}?subject=${subject}`;
  }, [email]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
        copyTimeoutRef.current = null;
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!mounted || !portalRef.current || !render) {
    return null;
  }

  const pointerClass = displayState === "closed" ? "pointer-events-none" : "pointer-events-auto";

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center px-4 pb-6 sm:items-center sm:pb-0 ${pointerClass}`}
      role="presentation"
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: displayState === "open" ? 1 : 0 }}
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className="contact-genie relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-neutral-200 dark:bg-neutral-950 dark:ring-neutral-800"
        data-state={displayState}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400" />
        <button
          type="button"
          onClick={onClose}
          className="group absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/80 text-neutral-500 transition hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-400 dark:hover:text-neutral-50"
          aria-label="Close contact dialog"
        >
          <span className="text-lg leading-none">×</span>
        </button>
        <div className="relative z-10 p-6 sm:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-sky-500">Let’s build together</p>
          <h2 id="contact-modal-title" className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Looking to chat or collaborate?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            I partner with teams to ship thoughtful products, design crisp UI, and build reliable systems. Tell me what you’re exploring—we’ll make it real.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200/80 bg-white/80 p-4 text-sm shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60">
              <p className="font-medium text-neutral-900 dark:text-neutral-100">Product strategy</p>
              <p className="mt-1 text-neutral-500 dark:text-neutral-400">Rapid discovery, scoped experiments, and pragmatic roadmaps.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200/80 bg-white/80 p-4 text-sm shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60">
              <p className="font-medium text-neutral-900 dark:text-neutral-100">Web experiences</p>
              <p className="mt-1 text-neutral-500 dark:text-neutral-400">Reactive UIs, performant apps, and polished design systems.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200/80 bg-white/80 p-4 text-sm shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60">
              <p className="font-medium text-neutral-900 dark:text-neutral-100">Team enablement</p>
              <p className="mt-1 text-neutral-500 dark:text-neutral-400">Pairing, code reviews, and coaching to level up your team.</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={mailtoHref}
              ref={focusRef}
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-500/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
            >
              Start an email ↗
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-neutral-100"
            >
              {copied ? "Copied!" : "Copy email"}
            </button>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">{email}</span>
          </div>
        </div>
      </div>
    </div>,
    portalRef.current,
  );
}

function buildModalKeyframes(modalRect: DOMRect, anchorRect?: AnchorRect | null): Keyframe[] {
  if (!anchorRect) {
    return [
      {
        opacity: 0,
        transform: "translate3d(0, 16px, 0) scale(0.94)",
        borderRadius: "40px",
        filter: "blur(18px)",
      },
      {
        opacity: 1,
        transform: "translate3d(0, 0, 0) scale(1)",
        borderRadius: "32px",
        filter: "blur(0)",
      },
    ];
  }

  const anchorCenterX = anchorRect.left + anchorRect.width / 2;
  const anchorCenterY = anchorRect.top + anchorRect.height / 2;
  const modalCenterX = modalRect.left + modalRect.width / 2;
  const modalCenterY = modalRect.top + modalRect.height / 2;

  const translateX = anchorCenterX - modalCenterX;
  const translateY = anchorCenterY - modalCenterY;

  const scaleX = clamp(anchorRect.width / modalRect.width, 0.35, 1.25);
  const scaleY = clamp(anchorRect.height / modalRect.height, 0.35, 1.25);

  const overshootScaleX = Math.max(1, clamp(scaleX * 1.08, 0.7, 1.12));
  const overshootScaleY = Math.max(1, clamp(scaleY * 1.08, 0.7, 1.12));

  const roundedRadius = Math.max(anchorRect.width, anchorRect.height) / 2;

  return [
    {
      offset: 0,
      opacity: 0,
      transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
      borderRadius: `${roundedRadius}px`,
      filter: "blur(28px)",
      boxShadow: "0 0 0 rgba(56,189,248,0.35)",
    },
    {
      offset: 0.68,
      opacity: 1,
      transform: `translate(${translateX * 0.12}px, ${translateY * 0.2}px) scale(${overshootScaleX}, ${overshootScaleY})`,
      borderRadius: "40px",
      filter: "blur(0)",
      boxShadow: "0 28px 84px -24px rgba(56,189,248,0.45)",
    },
    {
      offset: 1,
      opacity: 1,
      transform: "translate(0, 0) scale(1)",
      borderRadius: "32px",
      filter: "blur(0)",
      boxShadow: "0 32px 96px -28px rgba(56,189,248,0.5)",
    },
  ];
}

function buildBackdropKeyframes(): Keyframe[] {
  return [
    {
      opacity: 0,
      backdropFilter: "blur(0px)",
    },
    {
      opacity: 1,
      backdropFilter: "blur(12px)",
    },
  ];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
