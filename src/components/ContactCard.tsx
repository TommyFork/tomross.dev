"use client";

import type { MouseEvent } from "react";

import EmailReveal from "@/components/EmailReveal";
import { useContactModal } from "@/components/ContactModalContext";

export default function ContactCard() {
  const { openModal } = useContactModal();

  const handleOpenModal = (event: MouseEvent<HTMLButtonElement>) => {
    const trigger = event.currentTarget;
    openModal({ triggerRect: trigger.getBoundingClientRect(), trigger });
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-medium tracking-tight text-neutral-900">Let’s build something together</h2>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
        Whether you’re refining a product direction, polishing UI, or need a partner to keep momentum, I’d love to hear what you’re working on.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="button"
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900"
        >
          Let’s chat ↗
        </button>
        <span className="text-xs uppercase tracking-[0.18em] text-neutral-300">or</span>
        <EmailReveal label="Reveal email" />
      </div>
    </div>
  );
}



