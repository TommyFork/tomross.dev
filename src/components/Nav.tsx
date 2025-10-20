"use client";

import { useEffect, useState, type MouseEvent } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useContactModal } from "@/components/ContactModalContext";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
];

export default function Nav() {
  const pathname = usePathname();
  const { openModal } = useContactModal();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenModal = (event: MouseEvent<HTMLButtonElement>) => {
    const trigger = event.currentTarget;
    openModal({ triggerRect: trigger.getBoundingClientRect(), trigger });
  };

  return (
    <header
      className={`sticky top-4 z-50 rounded-3xl border transition-all duration-300 ${
        isScrolled
          ? "py-3 border-white/60 bg-white/70 shadow-lg shadow-neutral-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/70"
          : "py-6 border-transparent bg-white/50 backdrop-blur-sm dark:bg-neutral-950/40"
      }`}
    >
      <nav className="flex items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-neutral-900 transition-transform duration-300 hover:scale-[1.02] md:text-2xl dark:text-neutral-100"
        >
          Tom Ross
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <ul className="flex items-center gap-2 md:gap-4">
            {links.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-sky-400 dark:focus-visible:ring-offset-neutral-900 ${
                      active
                        ? "bg-white/90 text-neutral-900 shadow-sm dark:bg-white/10 dark:text-white"
                        : "text-neutral-600 hover:bg-white/70 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={handleOpenModal}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-md shadow-neutral-950/5 transition-all duration-200 hover:-translate-y-[2px] hover:border-white/80 hover:bg-white/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-black/20 dark:hover:border-white/20 dark:hover:bg-white/15 dark:focus-visible:ring-offset-neutral-900"
          >
            Let’s chat
          </button>
        </div>
      </nav>
    </header>
  );
}


