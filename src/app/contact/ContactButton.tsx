"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactButton() {
  const honeypotRef = useRef<HTMLInputElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setEnabled(true), 600);
    return () => clearTimeout(id);
  }, []);

  const handleClick = () => {
    if (honeypotRef.current && honeypotRef.current.value) return;
    const u = ["hello", "tomross.dev"].join("@");
    const subject = encodeURIComponent("Hello");
    window.location.href = `mailto:${u}?subject=${subject}`;
  };

  return (
    <div className="space-y-4">
      <p>Prefer email. Click to reveal the address.</p>
      <div className="sr-only" aria-hidden>
        <label>
          Leave this field empty
          <input ref={honeypotRef} type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        type="button"
        onClick={handleClick}
        disabled={!enabled}
        className="rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 disabled:opacity-50"
      >
        Email me
      </button>
      <noscript>
        JavaScript is required to reveal the email. Please enable it to contact me.
      </noscript>
    </div>
  );
}


