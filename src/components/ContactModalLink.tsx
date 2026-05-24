"use client";

import type { AnchorHTMLAttributes, KeyboardEvent, MouseEvent } from "react";

import { useContactModal } from "@/components/ContactModalContext";

type ContactModalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

export default function ContactModalLink({
  href = "#contact",
  onClick,
  children,
  ...props
}: ContactModalLinkProps) {
  const { openModal } = useContactModal();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    window.history.replaceState(window.history.state, "", href ?? "#contact");

    const trigger = event.currentTarget;
    openModal({ triggerRect: trigger.getBoundingClientRect(), trigger });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onKeyDown={(e: KeyboardEvent<HTMLAnchorElement>) => {
        if (e.key === " ") {
          e.preventDefault();
          const trigger = e.currentTarget;
          window.history.replaceState(window.history.state, "", href ?? "#contact");
          openModal({ triggerRect: trigger.getBoundingClientRect(), trigger });
        }
      }}
      aria-haspopup="dialog"
      {...props}
    >
      {children}
    </a>
  );
}
