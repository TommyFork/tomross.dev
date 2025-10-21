"use client";

import { useEffect, useState, type MouseEvent } from "react";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useContactModal } from "@/components/ContactModalContext";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  // { href: "/writing", label: "Writing" },
];

export default function Nav() {
  const pathname = usePathname();
  const { openModal } = useContactModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setIsMenuOpen(false);
    const trigger = event.currentTarget;
    openModal({ triggerRect: trigger.getBoundingClientRect(), trigger });
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const headerClassName = [
    "relative isolate z-50 mt-6 w-full rounded-3xl border px-5 py-5 transition-[background-color,border-color,box-shadow,padding] duration-500 backdrop-blur-xl",
    isScrolled
      ? "sticky top-4 border-white/60 bg-white/70 px-4 py-3 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.45)] backdrop-saturate-150 sm:px-6 sm:py-4"
      : "border-white/30 bg-white/40 shadow-[0_28px_68px_-48px_rgba(15,23,42,0.35)] sm:px-8",
  ].join(" ");

  const brandClassName = isScrolled
    ? "text-base font-semibold tracking-tight text-slate-900 transition-all duration-300 sm:text-lg"
    : "text-lg font-semibold tracking-tight text-slate-900 transition-all duration-300 sm:text-xl";

  const menuButtonClassName = [
    "relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border text-slate-900 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 active:scale-95",
    isScrolled
      ? "border-white/60 bg-white/70 shadow-[0_16px_30px_-20px_rgba(15,23,42,0.4)] hover:-translate-y-[1px] hover:border-white/80 hover:bg-white"
      : "border-white/40 bg-white/55 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.45)] hover:-translate-y-[1px] hover:border-white/60 hover:bg-white/80",
  ].join(" ");

  const navLinkBaseClassName =
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:ring-offset-0";

  const navLinkClassName = (active: boolean) =>
    isScrolled
      ? `${navLinkBaseClassName} ${
          active
            ? "text-slate-900"
            : "text-slate-600 hover:text-slate-900 visited:text-slate-600"
        }`
      : `${navLinkBaseClassName} ${
          active
            ? "text-slate-950"
            : "text-slate-700/80 hover:text-slate-950 visited:text-slate-700/80"
        }`;

  const contactButtonClassName = [
    "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 sm:w-auto",
    isScrolled
      ? "border border-white/60 bg-white/70 text-slate-900 shadow-[0_16px_30px_-18px_rgba(15,23,42,0.45)] hover:-translate-y-[2px] hover:border-white/80 hover:bg-white"
      : "border border-white/40 bg-white/55 text-slate-900 shadow-[0_24px_50px_-28px_rgba(15,23,42,0.5)] hover:-translate-y-[2px] hover:border-white/60 hover:bg-white/80",
  ].join(" ");

  return (
    <header className={`transition-all duration-300 ${headerClassName}`}>
      <nav className="flex flex-col gap-4 sm:gap-5">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          <Link href="/" className={`${brandClassName} whitespace-nowrap`}>
            Tommy Ross
          </Link>
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden sm:flex sm:items-center sm:gap-5">
              <ul className="flex items-center gap-5 text-sm">
                {links.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={navLinkClassName(active)}
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
                className={contactButtonClassName}
              >
                Let’s chat
              </button>
            </div>
            <button
              type="button"
              className={`${menuButtonClassName} sm:hidden`}
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="primary-navigation"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            >
              <span aria-hidden className="relative block h-5 w-5">
                <span
                  className={`absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 transform rounded-full bg-current transition-[transform,opacity] duration-300 ease-in-out ${
                    isMenuOpen
                      ? "translate-y-0 rotate-45"
                      : "-translate-y-[6px]"
                  }`}
                />
                <span
                  className={`absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 transform rounded-full bg-current transition-[transform,opacity] duration-300 ease-in-out ${
                    isMenuOpen ? "scale-x-0 opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 transform rounded-full bg-current transition-[transform,opacity] duration-300 ease-in-out ${
                    isMenuOpen
                      ? "translate-y-0 -rotate-45"
                      : "translate-y-[6px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              id="primary-navigation"
              initial={{ opacity: 0, height: 0, y: -12 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
              className="overflow-hidden sm:hidden"
            >
              <div className="grid gap-4 border-t border-white/50 pt-4">
                <ul className="flex flex-col gap-3 text-sm">
                  {links.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={`${item.href}-mobile`}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={navLinkClassName(active)}
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
                  className={contactButtonClassName}
                >
                  Let’s chat
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}


