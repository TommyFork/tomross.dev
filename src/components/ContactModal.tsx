"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const CLOSE_DELAY = 420;

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [render, setRender] = useState(open);
  const [displayState, setDisplayState] = useState<"open" | "closed">(
    open ? "open" : "closed",
  );
  const focusRef = useRef<HTMLAnchorElement | null>(null);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (typeof document !== "undefined" && portalRef.current === null) {
    portalRef.current = document.createElement("div");
    portalRef.current.setAttribute("id", "contact-modal-root");
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    let rafId: number | undefined;

    if (open) {
      setRender(true);
      rafId = requestAnimationFrame(() => setDisplayState("open"));
    } else {
      setDisplayState("closed");
      timeoutId = setTimeout(() => setRender(false), CLOSE_DELAY);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const id = requestAnimationFrame(() => {
      focusRef.current?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!mounted || !portalRef.current) return;

    document.body.appendChild(portalRef.current);

    return () => {
      portalRef.current?.remove();
    };
  }, [mounted]);

  useEffect(() => () => {
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = null;
    }
  }, []);

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

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center px-4 pb-6 sm:items-center sm:pb-0 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      role="presentation"
    >
      <div
        className={`absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-300 ${displayState === "open" ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className={`contact-genie relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-neutral-200 transition-[clip-path,transform,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-neutral-950 dark:ring-neutral-800 ${displayState === "open" ? "opacity-100" : "opacity-0"}`}
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
            I partner with teams to ship thoughtful products, design crisp UI, and build reliable systems. Tell me what you’re
            exploring—we’ll make it real.
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
