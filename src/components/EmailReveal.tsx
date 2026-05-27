"use client";

import { useEffect, useState } from "react";
import { getEmailAddress } from "@/lib/email";

type Props = { label?: string };

export default function EmailReveal({ label = "Email me" }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(getEmailAddress());
  }, []);

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className="group relative overflow-hidden rounded-full border border-neutral-300 dark:border-neutral-600 px-4 py-2 text-sm bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-all hover:shadow-sm active:translate-y-[1px] active:shadow-none cursor-pointer"
      >
        <span className="relative z-10">{label}</span>
        <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-neutral-50 dark:bg-neutral-700 transition-transform"></span>
      </button>
    );
  }

  return (
    <a
      href={email ? `mailto:${email}` : undefined}
      className="inline-flex items-center gap-2 underline underline-offset-4"
    >
      {email}
      <span aria-hidden>↗</span>
    </a>
  );
}


