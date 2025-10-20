"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const ANIMATION_DURATION = 420;
const ANIMATION_EASING = "cubic-bezier(0.24, 0.94, 0.32, 1)";
const BACKDROP_DURATION = 300;

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
    const keyframes = buildModalKeyframes(modalRect, anchorRect, open ? "open" : "close");

    if (animationRef.current) {
      animationRef.current.cancel();
    }

    const animation = modal.animate(keyframes, {
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
      fill: "both",
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

      const backdropAnimation = backdrop.animate(buildBackdropKeyframes(open ? "open" : "close"), {
        duration: BACKDROP_DURATION,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "both",
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
        className="absolute inset-0 bg-white/60 backdrop-blur-[2px] transition-opacity duration-200"
        style={{ opacity: displayState === "open" ? 1 : 0.2 }}
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className="contact-genie relative w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
        data-state={displayState}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900"
          aria-label="Close contact dialog"
        >
          <span className="text-lg leading-none">×</span>
        </button>
        <div className="p-6 sm:p-8">
          <h2 id="contact-modal-title" className="text-2xl font-medium tracking-tight text-neutral-900">
            Let’s build something together
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            If you’re exploring a new product direction or need a partner to ship polished web experiences, I’d love to hear what you’re working on.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={mailtoHref}
              ref={focusRef}
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900"
            >
              Start an email ↗
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900"
            >
              {copied ? "Copied!" : "Copy email"}
            </button>
            <span className="text-xs text-neutral-400">{email}</span>
          </div>
        </div>
      </div>
    </div>,
    portalRef.current,
  );
}

function buildModalKeyframes(
  modalRect: DOMRect,
  anchorRect: AnchorRect | null | undefined,
  mode: "open" | "close",
): Keyframe[] {
  if (!anchorRect) {
    if (mode === "close") {
      return [
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) scale(1)",
          borderRadius: "24px",
          filter: "blur(0)",
        },
        {
          opacity: 0,
          transform: "translate3d(0, 12px, 0) scale(0.94)",
          borderRadius: "28px",
          filter: "blur(8px)",
        },
      ];
    }

    return [
      {
        opacity: 0,
        transform: "translate3d(0, 16px, 0) scale(0.95)",
        borderRadius: "28px",
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        transform: "translate3d(0, 0, 0) scale(1)",
        borderRadius: "24px",
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

  const scaleX = clamp(anchorRect.width / modalRect.width, 0.35, 1.2);
  const scaleY = clamp(anchorRect.height / modalRect.height, 0.35, 1.2);

  const overshootScaleX = Math.max(1, clamp(scaleX * 1.06, 0.72, 1.1));
  const overshootScaleY = Math.max(1, clamp(scaleY * 1.06, 0.72, 1.1));

  const roundedRadius = Math.max(anchorRect.width, anchorRect.height) / 2;

  const baseKeyframes: Keyframe[] = [
    {
      offset: 0,
      opacity: 0,
      transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
      borderRadius: `${roundedRadius}px`,
      filter: "blur(12px)",
      boxShadow: "0 0 0 rgba(15,23,42,0.08)",
    },
    {
      offset: 0.56,
      opacity: 1,
      transform: `translate(${translateX * 0.16}px, ${translateY * 0.18}px) scale(${overshootScaleX}, ${overshootScaleY})`,
      borderRadius: "26px",
      filter: "blur(1.5px)",
      boxShadow: "0 18px 50px -26px rgba(15,23,42,0.18)",
    },
    {
      offset: 1,
      opacity: 1,
      transform: "translate(0, 0) scale(1)",
      borderRadius: "24px",
      filter: "blur(0)",
      boxShadow: "0 24px 60px -28px rgba(15,23,42,0.18)",
    },
  ];

  if (mode === "open") {
    return baseKeyframes;
  }

  const reversed = baseKeyframes
    .map((frame) => ({ ...frame }))
    .reverse()
    .map((frame) => {
      if (typeof frame.offset === "number") {
        return {
          ...frame,
          offset: Number((1 - frame.offset).toFixed(2)),
        } as Keyframe;
      }

      return frame;
    })
    .map((frame, index, array) => {
      if (index === array.length - 1) {
        return {
          ...frame,
          offset: 1,
          opacity: 0,
          boxShadow: "0 0 0 rgba(15,23,42,0)",
          filter: "blur(10px)",
        } as Keyframe;
      }

      if (index === 0) {
        return {
          ...frame,
          offset: 0,
          opacity: 1,
        } as Keyframe;
      }

      return frame;
    });

  return reversed;
}

function buildBackdropKeyframes(mode: "open" | "close"): Keyframe[] {
  if (mode === "close") {
    return [
      {
        opacity: 1,
        backdropFilter: "blur(4px)",
      },
      {
        opacity: 0.2,
        backdropFilter: "blur(0px)",
      },
    ];
  }

  return [
    {
      opacity: 0.2,
      backdropFilter: "blur(0px)",
    },
    {
      opacity: 1,
      backdropFilter: "blur(4px)",
    },
  ];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
