"use client";

import EmailReveal from "@/components/EmailReveal";
import { useContactModal } from "@/components/ContactModalContext";

export default function ContactCard({ title = "Contact" }: { title?: string }) {
  const { openModal } = useContactModal();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-sky-100/70 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 rounded-full bg-emerald-100/70 blur-3xl" aria-hidden />
      <div className="relative z-10">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">{title}</div>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Let’s build something ambitious together
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          If you’re exploring a new idea, need a partner to refine product direction, or want a steady hand to ship delightful
          experiences, I’d love to chat.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-sky-500/30 transition hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
          >
            Open contact modal ↗
          </button>
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-300 dark:text-neutral-600">or</div>
          <EmailReveal label="Reveal email" />
        </div>
      </div>
    </div>
  );
}



