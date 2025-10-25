"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useContactModal } from "@/components/ContactModalContext";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  // { href: "/writing", label: "Writing" },
];

const hamburgerTransition = { duration: 0.24, ease: [0.22, 0.61, 0.36, 1] } as const;

export default function Nav() {
  const pathname = usePathname();
  const { openModal } = useContactModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(null);
  const [menuOffset, setMenuOffset] = useState(0);
  const bodyOverflowRef = useRef<string | undefined>(undefined);

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
    ? "mt-6 sticky top-4 z-50 w-full rounded-3xl border border-white/45 bg-white/60 px-5 py-3 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.3)] backdrop-blur-2xl backdrop-saturate-150 sm:px-6 sm:py-4"
    : "mt-6 w-full border border-transparent px-0 py-6";

  const brandClassName = isScrolled
    ? "text-base font-semibold tracking-tight text-slate-900 transition-all duration-300"
    : "text-xl font-semibold tracking-tight text-slate-900 transition-all duration-300";

  const menuButtonClassName = isScrolled
    ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-white/70 text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-white/70 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 active:scale-95"
    : "inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-white text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-slate-200/80 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-95";

  const navLinkBaseClassName = "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200";

  const navLinkClassName = (active: boolean) =>
    isScrolled
      ? `${navLinkBaseClassName} ${
          active
            ? "text-slate-900"
            : "text-slate-600 hover:text-slate-900"
        }`
      : `${navLinkBaseClassName} focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
          active
            ? "text-neutral-900 visited:text-neutral-900"
            : "text-neutral-500 hover:text-neutral-700 visited:text-neutral-500"
        }`;

  const mobileNavLinkClassName = (active: boolean) =>
    `group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
      active
        ? "bg-neutral-900/5 text-neutral-900"
        : "text-neutral-500 hover:bg-neutral-900/5 hover:text-neutral-900"
    }`;

  const mobileContactButtonClassName = isScrolled
    ? "inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-white/45 bg-white/75 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 hover:-translate-y-[2px] hover:border-white/70 hover:bg-white"
    : "inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-transparent bg-white px-5 py-2.5 text-sm font-medium text-neutral-600 shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 hover:-translate-y-[1px] hover:border-neutral-200/80 hover:shadow-md";

  const contactButtonClassName = isScrolled
    ? "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/45 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 sm:w-auto hover:-translate-y-[2px] hover:border-white/70 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 active:scale-95"
    : "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent bg-white px-4 py-2 text-sm font-medium text-neutral-600 shadow-sm transition-all duration-200 sm:w-auto hover:-translate-y-[1px] hover:border-neutral-200/80 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-95";

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
                  className="absolute inset-0 h-full w-full bg-white/60 backdrop-blur-[2px]"
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
                  <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
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
                          Let’s chat
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
    <header ref={headerRef} className={`transition-all duration-300 ${headerClassName}`}>
      <nav className="flex items-center justify-between gap-4 sm:gap-6">
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
              Let’s chat
            </button>
          </div>
          <button
            type="button"
            className={`${menuButtonClassName} relative z-[120] sm:hidden`}
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


