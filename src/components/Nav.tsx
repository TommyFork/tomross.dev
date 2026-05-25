"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useContactModal } from "@/components/ContactModalContext";
import { useTheme } from "@/components/ThemeContext";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  // { href: "/writing", label: "Writing" },
];

const hamburgerTransition = { duration: 0.24, ease: [0.22, 0.61, 0.36, 1] } as const;

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const { openModal } = useContactModal();
  const { theme, toggle } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(null);
  const [menuOffset, setMenuOffset] = useState(0);
  const bodyOverflowRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const activateThreshold = 64;
    const deactivateThreshold = 24;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled((previous) => {
        if (currentScrollY > activateThreshold) {
          return true;
        }

        if (currentScrollY < deactivateThreshold) {
          return false;
        }

        return previous;
      });
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

  useEffect(() => {
    setMenuPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      if (bodyOverflowRef.current !== undefined) {
        document.body.style.overflow = bodyOverflowRef.current;
      }
      return;
    }

    bodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = bodyOverflowRef.current ?? "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const updateOffset = () => {
      const rect = headerRef.current?.getBoundingClientRect();
      const nextOffset = (rect?.bottom ?? 0) + 8;
      setMenuOffset((previous) => (Math.abs(previous - nextOffset) < 0.5 ? previous : nextOffset));
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    window.addEventListener("scroll", updateOffset, { passive: true });

    return () => {
      window.removeEventListener("resize", updateOffset);
      window.removeEventListener("scroll", updateOffset);
    };
  }, [isMenuOpen]);

  const headerClassName = isScrolled
    ? "mt-6 sticky top-4 z-50 w-full rounded-3xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-neutral-900/40 px-5 py-3 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] backdrop-blur-[20px] backdrop-saturate-[180%] before:absolute before:inset-0 before:rounded-3xl before:border before:border-white/40 dark:before:border-white/5 before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.5)] dark:before:shadow-none before:pointer-events-none sm:px-6 sm:py-4"
    : "mt-6 w-full border border-transparent px-0 py-6";

  const brandClassName = isScrolled
    ? "text-base font-semibold tracking-tight text-slate-900 dark:text-white transition-all duration-300"
    : "text-xl font-semibold tracking-tight text-slate-900 dark:text-white transition-all duration-300";

  const iconButtonClassName = isScrolled
    ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/45 dark:border-white/10 bg-white/70 dark:bg-neutral-800/70 text-slate-900 dark:text-neutral-200 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-white/70 dark:hover:border-white/20 hover:bg-white dark:hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 active:scale-95"
    : "inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-white dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-slate-200/80 dark:hover:border-neutral-600 hover:bg-white dark:hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-95";

  const themeSwitchClassName = isScrolled
    ? "group relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border border-white/45 dark:border-white/10 bg-white/70 dark:bg-neutral-800/70 p-1 text-slate-900 dark:text-neutral-200 shadow-sm transition-colors duration-200 hover:border-white/70 dark:hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 active:scale-95"
    : "group relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-white dark:bg-neutral-800 p-1 text-slate-600 dark:text-neutral-300 shadow-sm transition-colors duration-200 hover:border-slate-200/80 dark:hover:border-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-95";

  const navLinkBaseClassName = "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200";

  const navLinkClassName = (active: boolean) =>
    isScrolled
      ? `${navLinkBaseClassName} ${
          active
            ? "text-slate-900 dark:text-white"
            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
        }`
      : `${navLinkBaseClassName} focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950 ${
          active
            ? "text-neutral-900 dark:text-white visited:text-neutral-900 dark:visited:text-white"
            : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 visited:text-neutral-500 dark:visited:text-neutral-400"
        }`;

  const mobileNavLinkClassName = (active: boolean) =>
    `group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-100 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 ${
      active
        ? "bg-neutral-900/5 dark:bg-white/10 text-neutral-900 dark:text-white"
        : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-900/5 dark:hover:bg-white/5 hover:text-neutral-900 dark:hover:text-white"
    }`;

  const mobileContactButtonClassName =
    "inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-5 py-2.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 hover:-translate-y-[0.5px] hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white";

  const contactButtonClassName = isScrolled
    ? "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/45 dark:border-white/10 bg-white/70 dark:bg-neutral-800/70 px-4 py-2 text-sm font-semibold text-slate-900 dark:text-neutral-200 shadow-sm transition-all duration-200 sm:w-auto hover:-translate-y-[0.5px] hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 active:scale-95"
    : "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent bg-white dark:bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 shadow-sm transition-all duration-200 sm:w-auto hover:-translate-y-[0.5px] hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-95";

  const mobileMenu =
    menuPortalTarget && typeof window !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="mobile-menu"
                className="fixed inset-0 z-[80] sm:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  type="button"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="absolute inset-0 h-full w-full bg-white/60 dark:bg-black/60 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsMenuOpen(false)}
                />
                <motion.div
                  key="mobile-menu-panel"
                  id="mobile-navigation"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                  className="absolute inset-x-3 flex justify-end"
                  style={{ top: menuOffset }}
                >
                  <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl dark:shadow-2xl">
                    <ul className="flex flex-col gap-1.5 px-3 py-3">
                      {links.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <li key={`${item.href}-mobile`}>
                            <Link
                              href={item.href}
                              aria-current={active ? "page" : undefined}
                              onClick={() => setIsMenuOpen(false)}
                              className={mobileNavLinkClassName(active)}
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                      <li className="pt-1.5">
                        <motion.button
                          type="button"
                          onClick={handleOpenModal}
                          whileTap={{ scale: 0.97 }}
                          className={mobileContactButtonClassName}
                          >
                          Let&apos;s chat
                        </motion.button>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          menuPortalTarget,
        )
      : null;

  return (
    <header ref={headerRef} className={`relative transition-all duration-300 ${headerClassName}`}>
      <nav className="relative z-10 flex items-center justify-between gap-4 sm:gap-6">
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
            <button type="button" onClick={handleOpenModal} className={contactButtonClassName}>
              Let&apos;s chat
            </button>
          </div>
          <button
            type="button"
            onClick={toggle}
            role="switch"
            aria-checked={theme === "dark"}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className={themeSwitchClassName}
          >
            <span className="sr-only">{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</span>
            <span
              aria-hidden="true"
              className="absolute left-2 text-[10px] text-amber-400 opacity-100 drop-shadow-[0_0_5px_rgba(251,191,36,0.65)] transition-opacity duration-200 dark:text-amber-300 dark:opacity-100"
            >
              <SunIcon />
            </span>
            <span
              aria-hidden="true"
              className="absolute right-2 text-[10px] text-neutral-500 opacity-35 transition-opacity duration-200 dark:text-neutral-200 dark:opacity-100"
            >
              <MoonIcon />
            </span>
            <span
              aria-hidden="true"
              className="relative z-10 inline-flex h-6 w-6 translate-x-0 items-center justify-center rounded-full bg-white text-amber-400 shadow-sm ring-1 ring-black/5 transition-transform duration-200 ease-out dark:translate-x-6 dark:bg-neutral-950 dark:text-neutral-200 dark:ring-white/10"
            >
              {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </span>
          </button>
          <button
            type="button"
            className={`${iconButtonClassName} relative z-[120] sm:hidden`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          >
            <span className="relative block h-5 w-5 text-current">
              <motion.span
                aria-hidden
                initial={false}
                animate={isMenuOpen ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={hamburgerTransition}
                className="absolute left-0 top-1 block h-0.5 w-5 origin-center rounded-full bg-current"
              />
              <motion.span
                aria-hidden
                initial={false}
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
                className="absolute left-0 top-[10px] block h-0.5 w-5 rounded-full bg-current"
              />
              <motion.span
                aria-hidden
                initial={false}
                animate={isMenuOpen ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={hamburgerTransition}
                className="absolute left-0 top-[16px] block h-0.5 w-5 origin-center rounded-full bg-current"
              />
            </span>
          </button>
        </div>
      </nav>
      {mobileMenu}
    </header>
  );
}
