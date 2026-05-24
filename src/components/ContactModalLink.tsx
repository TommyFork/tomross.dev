"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

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

    const trigger = event.currentTarget;
    openModal({ triggerRect: trigger.getBoundingClientRect(), trigger });
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
