"use client";

import { useEffect, useState, type MouseEvent } from "react";

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
    const trigger = event.currentTarget;
    openModal({ triggerRect: trigger.getBoundingClientRect(), trigger });
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const headerClassName = isScrolled
    ? "sticky top-4 z-50 rounded-3xl border border-white/45 bg-white/55 px-4 py-3 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.3)] backdrop-blur-2xl backdrop-saturate-150 sm:px-6 sm:py-4"
    : "border border-transparent px-4 py-4 sm:px-0 sm:py-6";

  const brandClassName = isScrolled
    ? "text-base font-semibold tracking-tight text-slate-900 transition-all duration-300 sm:text-lg"
    : "text-lg font-semibold tracking-tight transition-all duration-300 sm:text-xl";

  const menuButtonClassName = isScrolled
    ? "inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/60 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-white/70 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 active:scale-95"
    : "inline-flex items-center gap-2 rounded-full border border-transparent bg-white px-3 py-2 text-sm font-medium text-neutral-600 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-neutral-200/80 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-95";

  return (
    <header className={`transition-all duration-300 ${headerClassName}`}>
      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          <Link href="/" className={`${brandClassName} whitespace-nowrap`}>
            Tommy Ross
          </Link>
          <button
            type="button"
            className={`${menuButtonClassName} sm:hidden`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
          >
            <span className="font-semibold">Menu</span>
            <svg
              className={`h-4 w-4 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 6H16M4 10H16M4 14H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div
          id="primary-navigation"
          className={`${
            isMenuOpen ? "grid grid-cols-1 gap-3 border-t border-slate-200/60 pt-3" : "hidden"
          } sm:flex sm:items-center sm:gap-5 sm:border-0 sm:pt-0`}
        >
          <ul className="flex flex-col items-start gap-3 text-sm sm:flex-row sm:items-center sm:gap-5">
            {links.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      isScrolled
                        ? `transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:ring-offset-0 text-slate-600 hover:text-slate-900 ${
                            active
                              ? "text-slate-900"
                              : ""
                          }`
                        : `transition-colors hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                            active
                              ? "text-neutral-900 visited:text-neutral-900"
                              : "text-neutral-500 visited:text-neutral-500"
                          }`
                    }
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
            className={`${
              isScrolled
                ? "inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/45 bg-white/60 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 backdrop-blur-sm hover:-translate-y-[2px] hover:border-white/70 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 active:scale-95"
                : "inline-flex w-full items-center justify-center gap-2 rounded-full border border-transparent bg-white px-4 py-2 text-sm font-medium text-neutral-600 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-neutral-200/80 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-95"
            } whitespace-nowrap cursor-pointer sm:w-auto`}
          >
            Let’s chat
          </button>
        </div>
      </nav>
    </header>
  );
}


