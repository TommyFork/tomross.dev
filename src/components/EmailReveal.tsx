"use client";

import { useEffect, useState } from "react";

type Props = { label?: string };

export default function EmailReveal({ label = "Email me" }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const user = process.env.NEXT_PUBLIC_EMAIL_USER || "tommy";
    const domain = process.env.NEXT_PUBLIC_EMAIL_DOMAIN || "tomross.dev";
    setEmail(`${user}@${domain}`);
  }, []);

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className="group relative overflow-hidden rounded-full border border-neutral-300 px-4 py-2 text-sm bg-white transition-all hover:shadow-sm active:translate-y-[1px] active:shadow-none cursor-pointer"
      >
        <span className="relative z-10">{label}</span>
        <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-neutral-50 transition-transform"></span>
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


